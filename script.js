console.log("Welcome to Spotify");
// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('Songs/m1.mpeg');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentTimeDisplay = document.getElementById('currentTime');
let totalTimeDisplay = document.getElementById('totalTimeDisplay');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let Songs=[
    { songName: "buddhu sa mann", filePath:"Songs/m2.mpeg", coverPath:"covers/2.jpg"},
    { songName: "Iktara Song", filePath:"Songs/m3.mpeg", coverPath:"covers/3.jpg "},
    { songName: "i hate Love Story", filePath:"Songs/m4.mpeg", coverPath:"covers/4.jpg" },
    { songName: "Ishq Di Chashni ", filePath:"Songs/m5.mpeg", coverPath:"covers/5.jpg" },
    { songName: " Koi Mil Gaya", filePath:"Songs/m6.mpeg", coverPath:"covers/6.jpg" },
    { songName: "Shayarana", filePath:"Songs/m7.mpeg", coverPath:"covers/7.jpg" },
    { songName: "Subhan Allah", filePath:"Songs/m8.mpeg", coverPath:"covers/8.jpg" },
    { songName: "Tum Nhi Ho Mere", filePath:"Songs/m9.mpeg", coverPath:"covers/9.jpg" },
    { songName: "Yaaron Dosti Song", filePath:"Songs/m10.mpeg", coverPath:"covers/10.jpg" },
    { songName: "Love You Zindagi", filePath:"Songs/m1.mpeg", coverPath:"covers/1.jpg"},
];

// Populate Song Items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = Songs[i].songName;
});

// Play/Pause Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
          // Update Current Time
          let currentMinutes = Math.floor(audioElement.currentTime / 60);
          let currentSeconds = Math.floor(audioElement.currentTime % 60);
          currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
          currentTimeDisplay.innerText = `${currentMinutes}:${currentSeconds}`;
    }
});
// Update Total Duration
audioElement.addEventListener('loadedmetadata', () => {
    let totalMinutes = Math.floor(audioElement.duration / 60);
    let totalSeconds = Math.floor(audioElement.duration % 60);
    totalSeconds = totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds;
    totalTimeDisplay.innerText = `${totalMinutes}:${totalSeconds}`;
});

// Change Progress Bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Play Selected Song
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        if (audioElement.src.includes(Songs[i].filePath) && !audioElement.paused) {
            // Pause the current song if it's playing
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Play the selected song
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = Songs[songIndex].filePath;
            masterSongName.innerText = Songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});

// Next Song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % Songs.length;
    audioElement.src = Songs[songIndex].filePath;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous Song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + Songs.length) % Songs.length;
    audioElement.src = Songs[songIndex].filePath;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
// Automatically Play Next Song
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % Songs.length;
    audioElement.src = Songs[songIndex].filePath;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});


