window.addEventListener("DOMContentLoaded", function () {
  const apiElement = document.getElementById("moApi");
  let score = 0.0;
  const scoreElement = document.getElementById("moAccel");
  const timerElement = document.getElementById("timer");

  let sensor; 

  if ("LinearAccelerationSensor" in window) {
    apiElement.textContent = "Generic Sensor API";

    sensor = new LinearAccelerationSensor({ frequency: 60 });
    sensor.addEventListener("reading", () => {
      accelerationHandler(sensor);
    });
    sensor.start();
  } else if ("DeviceMotionEvent" in window) {
    apiElement.textContent = "Device Motion API";
    window.addEventListener(
      "devicemotion",
      (eventData) => {
        accelerationHandler(eventData.acceleration);
        intervalHandler(eventData.interval);
      },
      false
    );
  } else {
    apiElement.textContent = "No Accelerometer & Gyroscope API available";
  }
  let timeLeft = 60;

  function accelerationHandler(acceleration) {
    if (acceleration && acceleration.y !== null) {
      const info = acceleration.y.toFixed(3);
      timerElement.textContent = timeLeft;

      let countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (info < 0.5) {
          score += 0.5;
        }
        if (info > -0.5 && info < 0.5) {
          score += 0.1;
        }
        if (info > 0.5) {
          score += 0.5;
        }
        scoreElement.textContent = score;

        if (timeLeft <= 0) {
          clearInterval(countdown);
          if (sensor) {
            sensor.stop();
          }
          alert("Temps écoulé !, vous avez obtenu un score de " + score);
          score = 0.0;
          timeLeft = 60;
        }
      }, 10000);
    }
  }
});
