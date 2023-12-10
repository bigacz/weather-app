const wrapper = document.getElementById('hour-weather_wrapper');
const slider = document.getElementById('hour-weather_slider');

let isPressed;
let startX;
let lastOffset;

wrapper.addEventListener('mousedown', (event) => {
  isPressed = true;
  startX = event.clientX;

  wrapper.style.cursor = 'grabbing';
});

wrapper.addEventListener('mouseup', () => {
  wrapper.style.cursor = 'grab';
  isPressed = false;
  lastOffset = 0;
});

wrapper.addEventListener('mouseenter', () => {
  wrapper.style.cursor = 'grab';
});

wrapper.addEventListener('mouseleave', () => {
  isPressed = false;
  wrapper.style.cursor = 'grab';
});

wrapper.addEventListener('mousemove', (event) => {
  if (!isPressed) {
    return;
  }

  const currentTransform = getTransformX();
  const offset = event.clientX - startX;
  const diff = offset - lastOffset;

  slider.style.transform = `translate(-${currentTransform - diff}px)`;
  lastOffset = offset;

  checkBoundary();
});

function checkBoundary() {
  const currentTransform = getTransformX();
  const wrapperWidth = wrapper.offsetWidth;
  const sliderWidth = slider.offsetWidth;

  const containersDiff = sliderWidth - wrapperWidth;

  if (containersDiff < currentTransform) {
    slider.style.transform = `translate(-${containersDiff}px)`;
  }

  console.log(wrapperWidth);
}

function getTransformX() {
  const currentTransform = slider.style.transform;
  const currentX = Number(currentTransform.replace(/[^0-9]/g, ''));

  return currentX;
}
