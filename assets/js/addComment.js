import axios from "axios";

const addCommentForm = document.getElementById("jsAddCommentForm");

async function addComment(comment) {
  const videoId = window.location.href.split("videos/")[1];
  await axios({
    method: "post",
    url: `/api/${videoId}/comment`,
    data: {
      comment,
    },
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const input = addCommentForm.querySelector("input");
  const comment = input.value;
  addComment(comment);
  input.value = "";
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
