const body = document.querySelector('body');
const spinner = document.getElementById('loading-modal_spinner');
const container = document.getElementById('loading-modal_container');

function showModal() {
  disableScrolling();
  enableSpinning();
  container.style.visibility = `visible`;
}

function hideModal() {
  container.style.visibility = `hidden`;
  enableScrolling();
  disableSpinning();
}

// Helper functions

let intervalId;
function disableSpinning() {
  clearInterval(intervalId);
}

function enableSpinning() {
  spin();
  intervalId = setInterval(spin, 1000);
}

function spin() {
  const currentRotate = getCurrentRotate();
  const futureRotate = currentRotate + 360;
  setRotate(futureRotate);
}

function setRotate(degrees) {
  spinner.style.transform = `rotate(${degrees}deg)`;
}

function getCurrentRotate() {
  const currentTransform = spinner.style.transform;
  const currentRotate = Number(currentTransform.replace(/[^0-9]/g, ''));

  return currentRotate;
}

function enableScrolling() {
  body.style.overflow = 'visible';
}

function disableScrolling() {
  body.style.overflow = 'hidden';
}

const LoadingModal = {
  showModal,
  hideModal,
};

export default LoadingModal;
