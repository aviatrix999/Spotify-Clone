console.log("Welcome to spotify");

// Initialize Variables
let songIndex = 0;

let audioElement = new Audio("songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");

let myProgressBar = document.getElementById("myProgressBar");

let gif = document.getElementById("gif");

let songItems = Array.from(document.getElementsByClassName("songItem"));

let masterSongName = document.getElementById("masterSongName");

// Songs List
let songs = [
  {
    songName: "Salvatore",
    filePath: "songs/1.mp3",
    coverPath: "cover/1.jpg",
    timeStamp: "4:41",
  },

  {
    songName: "Golden Brown",
    filePath: "songs/2.mp3",
    coverPath: "cover/2.jpg",
    timeStamp: "2:54",
  },

  

  {
    songName: "Until I Found You",
    filePath: "songs/3.mp3",
    coverPath: "cover/3.jpg",
    timeStamp: "4:01",
  },

  {
    songName: "Heat Waves",
    filePath: "songs/4.mp3",
    coverPath: "cover/4.jpg",
    timeStamp: "3:57",
  },

  {
    songName: "Ride or Die",
    filePath: "songs/5.mp3",
    coverPath: "cover/5.jpg",
    timeStamp: "2:34",
  },

  {
    songName: "Harleys in Hawaii",
    filePath: "songs/6.mp3",
    coverPath: "cover/6.jpg",
    timeStamp: "3:05",
  },
];

// Populate Songs
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;

  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

  element.getElementsByClassName("timeStamp")[0].innerHTML =
    `${songs[i].timeStamp}
     <i id="${i}" class="songItemPlay fa-solid fa-circle-play"></i>`;
});

// Master Play Button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();

    masterPlay.innerHTML = '<i class="fa-solid fa-circle-pause fa-2x"></i>';

    gif.style.opacity = 1;

    masterSongName.innerText = songs[songIndex].songName;
  } else {
    audioElement.pause();

    masterPlay.innerHTML = '<i class="fa-solid fa-circle-play fa-2x"></i>';

    masterSongName.innerText = songs[songIndex].songName;

    gif.style.opacity = 0;
  }
});

// Update Progress Bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100,
  );

  myProgressBar.value = progress;
});

// Seek Functionality
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Reset All Song Icons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");

      element.classList.add("fa-circle-play");

      masterSongName.innerText = songs[songIndex].songName;

      gif.style.opacity = 1;
    },
  );
};

// Song Item Play Click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("songItemPlay")) {
    makeAllPlays();

    songIndex = parseInt(e.target.id);

    e.target.classList.remove("fa-circle-play");

    e.target.classList.add("fa-circle-pause");

    audioElement.src = songs[songIndex].filePath;

    audioElement.currentTime = 0;

    audioElement.play();

    masterSongName.innerText = songs[songIndex].songName;

    masterPlay.innerHTML = '<i class="fa-solid fa-circle-pause fa-2x"></i>';

    gif.style.opacity = 1;
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;

  audioElement.currentTime = 0;

  audioElement.play();

  masterSongName.innerText = songs[songIndex].songName;

  masterPlay.innerHTML = '<i class="fa-solid fa-circle-pause fa-2x"></i>';

  gif.style.opacity = 1;
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;

  audioElement.currentTime = 0;

  audioElement.play();

  masterSongName.innerText = songs[songIndex].songName;

  masterPlay.innerHTML = '<i class="fa-solid fa-circle-pause fa-2x"></i>';

  gif.style.opacity = 1;
});
