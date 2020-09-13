import axios from "axios";

const addCommentForm = document.getElementById("jsAddCommentForm");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

function addCommentNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

function paintComment(comment) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerHTML = comment;
  li.appendChild(span);
  button.innerHTML = "❌";
  li.appendChild(button);
  commentList.prepend(li);
  addCommentNumber();
}

async function addComment(comment) {
  const videoId = window.location.href.split("videos/")[1];
  const response = await axios({
    method: "post",
    url: `/api/${videoId}/comment`,
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    paintComment(comment);
  }
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
