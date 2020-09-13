import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

// Home

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// Search

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Upload

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  console.log(req.file);
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    if (req.user) {
      const loggedUserComments = await video.comments.filter(
        function loadUserComments(comment) {
          return comment.creator.toString() === req.user.id;
        }
      );
      const otherUserComments = await video.comments.filter(
        function loadAnotherComments(comment) {
          return comment.creator.toString() !== req.user.id;
        }
      );
      res.render("videoDetail", {
        pageTitle: video.title,
        video,
        loggedUserComments,
        otherUserComments,
      });
    } else {
      res.render("videoDetail", {
        pageTitle: video.title,
        video,
      });
    }
  } catch (error) {
    res.redirect(routes.home);
    console.log(error);
  }
};

// Edit Video

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== `${req.user.id}`) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== `${req.user.id}`) {
      throw Error();
    } else {
      await Video.findOneAndDelete({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete Comment

export const postDelComment = async (req, res) => {
  const {
    params: { id },
    body: { commentText },
  } = req;
  try {
    const video = await Video.findById(id).populate("comments");
    const comment = await video.comments;
    const deleteText = await comment.filter(function (comment) {
      return comment.text === commentText;
    });
    const deleteTextId = deleteText[0].id;
    await Comment.findByIdAndDelete(deleteTextId);
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
