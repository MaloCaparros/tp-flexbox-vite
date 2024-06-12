const water = document.getElementById("water");
water.style =
  "height: 10em; -webkit-transition: all 15s ease-out; -moz-transition: all 15s ease-out; -o-transition: all 15s ease-out; transition: all 15s ease-out;";

function vibrateSimple() {
  navigator.vibrate(200);
}

function vibratePattern() {
  navigator.vibrate([100, 200, 200, 200, 500]);
}

sensor = new Accelerometer();
sensor.addEventListener('reading', listener);
sensor.start();