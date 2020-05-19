import express from "express";
import routes from "../routes";
import {
  videos,
  editVideo,
  deleteVideo,
  videoDetail,
  getUpload,
  postUpload,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
