window.addEventListener("DOMContentLoaded", function () {
 /* const water = document.getElementById("water");
  let sensor;

  water.style =
    "height: 10em; -webkit-transition: all 15s ease-out; -moz-transition: all 15s ease-out; -o-transition: all 15s ease-out; transition: all 15s ease-out;";
  // Initialisation du capteur

  sensor = new Accelerometer();
  sensor.start();
  sensor.addEventListener("reading", () => {
    console.log(`Acceleration along X-axis ${sensor.x}`);
    console.log(`Acceleration along Y-axis ${sensor.y}`);
    console.log(`Acceleration along Z-axis ${sensor.z}`);
  });

  let timerElement = document.getElementById("timer");
  let scoreELement = document.getElementById("score");
  scoreELement.textContent = "X:" + sensor.x + "Y:" +  sensor.y + "Z:" + sensor.z;
  let timeLeft = 30;
  timerElement.textContent = timeLeft;

  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      alert("Temps écoulé !");
    }
  }, 1000);*/
  if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
    document.getElementById('moApi').innerHTML = 'Generic Sensor API';
    
    let lastReadingTimestamp;
    let accelerometer = new LinearAccelerationSensor();
    accelerometer.addEventListener('reading', e => {
      if (lastReadingTimestamp) {
        intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
      }
      lastReadingTimestamp = accelerometer.timestamp
      accelerationHandler(accelerometer, 'moAccel');
    });
    accelerometer.start();
    
    if ('GravitySensor' in window) {
      let gravity = new GravitySensor();
      gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
      gravity.start();
    }
    
    let gyroscope = new Gyroscope();
    gyroscope.addEventListener('reading', e => rotationHandler({
      alpha: gyroscope.x,
      beta: gyroscope.y,
      gamma: gyroscope.z
    }));
    gyroscope.start();
    
  } else if ('DeviceMotionEvent' in window) {
    document.getElementById('moApi').innerHTML = 'Device Motion API';
    
    var onDeviceMotion = function (eventData) {
      accelerationHandler(eventData.acceleration, 'moAccel');
      accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
      rotationHandler(eventData.rotationRate);
      intervalHandler(eventData.interval);
    }
    
    window.addEventListener('devicemotion', onDeviceMotion, false);
  } else {
    document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
  }
  
  function accelerationHandler(acceleration, targetId) {
    var info, xyz = "[X, Y, Z]";
  
    info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
    info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
    info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
    document.getElementById(targetId).innerHTML = info;
  }
  
  function rotationHandler(rotation) {
    var info, xyz = "[X, Y, Z]";
  
    info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
    info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
    info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
    document.getElementById("moRotation").innerHTML = info;
  }
  
  function intervalHandler(interval) {
    document.getElementById("moInterval").innerHTML = interval;
  }
});
