import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';
import cloudIcon from '../assets/cloud.svg';
import rainIcon from '../assets/rain.svg';
import snowIcon from '../assets/snow.svg';

function getWeatherIcon(code) {
  let image;
  switch (code) {
    case 1:
      image = sunIcon;
      break;
    case 2:
      image = moonIcon;
      break;
    case 3:
      image = cloudIcon;
      break;
    case 4:
      image = rainIcon;
      break;
    case 5:
      image = snowIcon;
      break;
    default:
      image = sunIcon;
  }

  return image;
}

const IconManager = {
  getWeatherIcon,
};

export default IconManager;
