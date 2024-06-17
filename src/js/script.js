window.addEventListener("DOMContentLoaded", function () {
  const apiElement = document.getElementById("moApi");
  let score = 0.0;
  const scoreElement = document.getElementById("moAccel");
  const timerElement = document.getElementById("timer");
  let sensor; // Déclarer sensor pour qu'il soit accessible globalement
  let scoreInterval; // Variable pour stocker l'intervalle de mise à jour du score

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

  let timeLeft = 60;

  function accelerationHandler(accelerationY) {
    if (typeof accelerationY === "number") {
      const info = accelerationY.toFixed(3);

      // Si l'intervalle est déjà défini, le nettoie
      if (scoreInterval) {
        clearInterval(scoreInterval);
      }

      // Mettre à jour le score toutes les 500 millisecondes
      scoreInterval = setInterval(() => {
        if (info < -1 || info > 1) {
          score += 0.5;
        } else {
          score += 0.1;
        }

        scoreElement.textContent = score.toFixed(1);
      }, 500);
    }
  }

  function intervalHandler(interval) {
    // Fonction pour gérer l'intervalle, si nécessaire
  }

  // Compte à rebours de 60 secondes
  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      if (scoreInterval) {
        clearInterval(scoreInterval);
      }
      alert("Temps écoulé ! Vous avez obtenu un score de " + score.toFixed(1));
      score = 0.0;
      timeLeft = 60;
      timerElement.textContent = timeLeft;
    }
  }, 1000);
});
