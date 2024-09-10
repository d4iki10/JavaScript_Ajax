let number = 0;
let data = [];
const button = document.getElementById("btn");
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");

function getData() {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      data = request.response;
      if (Array.isArray(data)) {
        displayData();
      } else {
        console.error("Response is not an array.");
      }
    } else if (request.readyState === 4) {
      console.error("Failed to load data, status: " + request.status);
    }
  };
  request.open("GET", "ajax.json");
  request.responseType = "json";
  request.send(null);
}

function displayData() {
  titleArea.innerHTML = data[number].title;
  contentArea.innerHTML = data[number].content;
  videoArea.setAttribute("src", data[number].url);
  number = (number + 1) % data.length;
}

function changeVideo() {
  if (data.length === 0) {
    getData();
  } else {
    displayData();
  }
}

button.addEventListener("click", changeVideo);

window.onload = changeVideo;
