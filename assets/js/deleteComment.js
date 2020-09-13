import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const deleteButton = document.querySelectorAll("#jsDeleteButton");
const commentNumber = document.getElementById("jsCommentNumber");

function minusCommentNumber() {
  commentNumber.innerHTML -= 1;
}

async function handleClick(event) {
  const videoId = window.location.href.split("videos/")[1];
  const button = event.target;
  const li = button.parentNode;
  const commentText = li.firstChild.innerHTML;
  commentList.removeChild(li);
  await axios({
    url: `/api/${videoId}/delete`,
    method: "post",
    data: {
      commentText,
    },
  });
  minusCommentNumber();
}

function init() {
  deleteButton.forEach(function (button) {
    button.addEventListener("click", handleClick);
  });
}

if (commentList) {
  init();
}
