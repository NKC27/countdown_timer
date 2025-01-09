let countdownInterval;

// Function to start the countdown timer
function startCountdown() {
  // Get the event title and target date
  const timerTitle = document.getElementById('timerTitle').value;
  const eventSelect = document.getElementById('eventSelect').value;
  const targetDate = new Date(document.getElementById('datetimeInput').value);

  if (isNaN(targetDate.getTime())) {
    alert('Please select a valid date and time.');
    return;
  }

  // Display the event title
  const eventType = {
    birthday: 'Your Birthday',
    anniversary: 'Your Anniversary',
    dueDate: 'Due Date',
    holiday: 'Holiday',
    cookerTimer: 'Cooker Timer',
    christmasEve: 'Christmas Eve',
    christmas: 'Christmas',
    easter: 'Easter',
    'new-year': 'New Year',
    valentines: "Valentine's Day",
    halloween: 'Halloween',
    mothersDay: "Mother's Day",
    fathersDay: "Father's Day",
    thanksgiving: 'Thanksgiving',
    weddingDay: 'Wedding Day',
    remembranceSunday: 'Remembrance Sunday',
    custom: timerTitle || 'Custom Event',
  };

  document.getElementById(
    'eventTitle'
  ).innerText = `Event: ${eventType[eventSelect]}`;

  // Clear any existing countdown if it's running
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  // Function to update the countdown every second
  countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById(
      'timer'
    ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the countdown is finished, trigger the confetti
    if (distance < 0) {
      clearInterval(countdownInterval); // Stop the countdown
      document.getElementById('timer').innerHTML = 'EXPIRED';
      triggerConfetti(); // Trigger confetti explosion
    }
  }, 1000);
}

// Function to trigger the confetti explosion
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Trigger confetti with customized settings
  confetti({
    particleCount: 200,
    spread: 160,
    origin: { y: 0.5 },
    colors: ['#ff0', '#0f0', '#00f', '#f00', '#ff0080'],
    ticks: 200,
  });
}
