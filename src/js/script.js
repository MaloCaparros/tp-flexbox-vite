window.addEventListener('DOMContentLoaded', function () {
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("moAccel");
  let sensor;
  let countdown;

  if ('LinearAccelerationSensor' in window) {

    let lastReadingTimestamp;
    sensor = new LinearAccelerationSensor({ frequency: 60 });
    sensor.addEventListener('reading', () => {
      if (lastReadingTimestamp) {
        intervalHandler(Math.round(sensor.timestamp - lastReadingTimestamp));
      }
      lastReadingTimestamp = sensor.timestamp;
      accelerationHandler(sensor.y, 'moAccel');
    });
    sensor.start();

  } else if ('DeviceMotionEvent' in window) {

    var onDeviceMotion = function (eventData) {
      accelerationHandler(eventData.acceleration.y, 'moAccel');
      intervalHandler(eventData.interval);
    }

    window.addEventListener('devicemotion', onDeviceMotion, false);
  } else {
    document.getElementById('moApi').innerHTML = 'No Accelerometer API available';
  }

  function accelerationHandler(y, targetId) {
    var info = `Y: ${y !== null ? y.toFixed(3) : 'N/A'}`;
    document.getElementById(targetId).innerHTML = info;
  }

  function intervalHandler(interval) {
    document.getElementById("moInterval").innerHTML = interval;
  }

  // Démarrer le compteur d'une minute
  let timeLeft = 30;
  timerElement.textContent = timeLeft;

  countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      alert("Temps écoulé !");
    }
  }, 1000);
});
