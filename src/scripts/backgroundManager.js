import cloudImage from '../assets/images/cloud.jpg';
import nightImage from '../assets/images/night.jpg';
import rainImage from '../assets/images/rain.jpg';
import snowImage from '../assets/images/snow.jpg';
import sunImage from '../assets/images/sun.jpg';

const body = document.querySelector('body');

function getImage(code) {
  let image;
  switch (code) {
    case 1:
      image = sunImage;
      break;
    case 2:
      image = nightImage;
      break;
    case 3:
      image = cloudImage;
      break;
    case 4:
      image = rainImage;
      break;
    case 5:
      image = snowImage;
      break;
    default:
      image = sunImage;
  }

  return image;
}

function changeBackground(code) {
  const image = getImage(code);
  body.style.backgroundImage = `url(${image})`;
}

const BackgroundManager = {
  changeBackground,
};

export default BackgroundManager;
