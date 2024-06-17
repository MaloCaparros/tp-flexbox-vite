window.addEventListener("DOMContentLoaded", function () {
  const apiElement = document.getElementById("moApi");
  let score = 0.0;
  const scoreElement = document.getElementById("moAccel");
  const timerElement = document.getElementById("timer");
  let sensor;
  let scoreboard;

  if ("LinearAccelerationSensor" in window) {
    apiElement.textContent = "Generic Sensor API";

    sensor = new LinearAccelerationSensor({ frequency: 60 });
    sensor.addEventListener("reading", () => {
      accelerationHandler(sensor.y);
    });
    sensor.start();
  } else if ("DeviceMotionEvent" in window) {
    apiElement.textContent = "Device Motion API";

    window.addEventListener(
      "devicemotion",
      (eventData) => {
        accelerationHandler(eventData.acceleration.y);
        intervalHandler(eventData.interval);
      },
      false
    );
  } else {
    apiElement.textContent = "No Accelerometer & Gyroscope API available";
  }

  function accelerationHandler(yAcceleration) {
    const info = yAcceleration !== null ? yAcceleration.toFixed(3) : 'N/A';

    if (info < -0.5 || info > 0.5) {
      score += 0.5;
    } else if (info > -0.5 && info < 0.5) {
      score += 0.1;
    }

    scoreElement.textContent = score.toFixed(1); // Met à jour le score avec une précision d'un chiffre après la virgule
  }

  let timeLeft = 10;
  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      if (scoreboard) {
        clearInterval(scoreboard);
      }
      alert(`Temps écoulé ! Vous avez obtenu un score de ${score.toFixed(1)} points !`);
      score = 0.0; // Réinitialise le score après le temps écoulé
      timeLeft = 10; // Réinitialise le temps restant
      timerElement.textContent = timeLeft; // Met à jour l'affichage du temps restant
    }
  }, 1000);
});
