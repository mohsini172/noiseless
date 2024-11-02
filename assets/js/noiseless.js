const sounds = [
  "rain",
  "thunderstorm",
  "wind",
  "forest",
  "leaves",
  "waterstream",
  "seaside",
  "water",
  "fire",
  "summernight",
  "coffee",
  "train",
  "fan",
  "whitenoise",
  "pinknoise",
  "brownnoise",
];

function getRandomSounds(num) {
  const shuffled = sounds.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function random() {
  return getRandomSounds(3);
}

function productivity() {
  const productivitySounds = [
    "rain",
    "whitenoise",
    "pinknoise",
    "fan",
    "coffee",
    "waterstream",
  ];
  return productivitySounds.sort(() => 0.5 - Math.random()).slice(0, 3);
}

// Function for sounds suited for relaxation (nature sounds and soothing background noise)
function relax() {
  const relaxSounds = [
    "forest",
    "leaves",
    "waterstream",
    "seaside",
    "water",
    "fire",
    "summernight",
  ];
  return relaxSounds.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function getRandomColorChannel() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  const red = getRandomColorChannel();
  const green = getRandomColorChannel();
  const blue = getRandomColorChannel();
  return `rgb(${red},${green},${blue})`;
}

function changeBackgroundColor() {
  const randomColor = getRandomColor();
  document.querySelector("body").style.backgroundColor = randomColor;
}

function setButtonEvents() {
  const buttons = document.querySelectorAll("#buttons > button");
  const images = document.querySelectorAll("img");
  const sliders = document.querySelectorAll(`input[type="range"]`);
  const buttonMute = document.querySelector("#btn-mute");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      sounds.forEach((sound) => {
        const audio = document.querySelector(`audio[data-key="${sound}"]`);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      let selectedSounds = [];

      switch (button.id) {
        case "btn-random":
          selectedSounds = random(5);
          break;
        case "btn-productivity":
          selectedSounds = productivity(5);
          break;
        case "btn-relax":
          selectedSounds = relax(4);
          break;
        default:
          break;
      }
      selectedSounds.forEach((sound) => {
        const audio = document.querySelector(`audio[data-key="${sound}"]`);
        if (audio) audio.paused ? audio.play() : audio.pause();
      });
    });
  });

  images.forEach((image) => {
    image.addEventListener("click", (event) => {
      const key = image.parentElement.dataset.key;

      image.classList.toggle("active");
      const slider = document.querySelector(
        `div[data-key="${key}"] > input[type="range"]`
      );
      slider.classList.toggle("slider-active");

      const audio = document.querySelector(`audio[data-key="${key}"]`);
      if (audio) audio.paused ? audio.play() : audio.pause();
    });
  });

  sliders.forEach((slider) => {
    slider.addEventListener("input", (event) => {
      const key = slider.parentElement.attributes["data-key"].value;

      const audio = document.querySelector(`audio[data-key="${key}"]`);
      if (audio) audio.volume = slider.value / (slider.max - slider.min);
    });
  });

  buttonMute.addEventListener("click", (event) => {
    buttonMute.classList.toggle("fa-volume-up");
    buttonMute.classList.toggle("fa-volume-off");

    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      audio.muted = !audio.muted;
    });
  });
}

function setBackgroundChange() {
  changeBackgroundColor();
  setInterval(changeBackgroundColor, 10000);
}

function run() {
  setButtonEvents();
  setBackgroundChange();
}

run();
