const audio = document.getElementById("audio-player");
const progressBar = document.getElementById("pbforeground");
const playButton = document.getElementById("playpause");
const duration = document.getElementById("timetotal");
const playerBody = document.getElementById("pbb");
const time = document.getElementById("timedone");
let paused = true;
audio.addEventListener("timeupdate", onProgress);
audio.addEventListener("canplaythrough", () => {
  duration.innerHTML = toTime(audio.duration);
});
audio.addEventListener("ended", play);
playerBody.addEventListener("click", rewind);
playButton.addEventListener("click", play);
function play() {
  paused = !paused;
  if (!paused) {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}
function onProgress() {
  let precentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = precentage + "%";
  time.innerHTML = toTime(audio.currentTime);
}
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
  console.log("NOT MOBILE ))))))");
}
if (isMobile) {
  console.log("");
  document.getElementById("vol-control").style.display = "none";
}
function SetVolume(val) {
  audio.volume = val / 100;
}
function rewind(e) {
  let x = playerBody.getBoundingClientRect().left + window.pageXOffset;
  let precentage = (e.clientX - x) / playerBody.clientWidth;
  audio.currentTime = audio.duration * precentage;
  if (paused) play();
}
function toTime(seconds) {
  sec = Math.floor(seconds);
  min = Math.floor(sec / 60);
  min = min >= 10 ? min : "0" + min;
  sec = Math.floor(sec % 60);
  sec = sec >= 10 ? sec : "0" + sec;
  return min + ":" + sec;
}
