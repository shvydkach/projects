const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play")
const audio = document.querySelector("#audio")
const progress = document.querySelector(".progress-line")
const progressContainer = document.querySelector(".progress-container");


function playSong() {
  musicContainer.classList.add("play");
  playBtn.innerText = "⏹";
  playBtn.classList.toggle("action-btn-play");
  playBtn.classList.toggle("action-btn-stop");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.innerText = "▶";
  playBtn.classList.toggle("action-btn-play");
  playBtn.classList.toggle("action-btn-stop");

  audio.pause();
}



function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Відстеження подій
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


// Коли аудіо програється, timeupdate буде запускатись щоразу
audio.addEventListener("timeupdate", updateProgress);

// Коли закінчилось
// audio.addEventListener("ended", );

progressContainer.addEventListener("click", setProgress);

