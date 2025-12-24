/* Data for slideshow */
const slideData = [
    { img: 'photo1.jpg', text: "Happy Birthday to the most amazing Mom! 🌸" },
    { img: 'photo2.jpg', text: "Thank you for all the love and laughter! 💖" },
    { img: 'photo3.jpg', text: "Wishing you a year filled with joy! 🎂" },
    { img: 'photo4.jpg', text: "Your smile brightens our every day. ☀️" },
    { img: 'photo5.jpg', text: "Grateful for everything you do. 🙏" },
    { img: 'photo6.jpg', text: "You make the world a better place. 🌍" },
    { img: 'photo7.jpg', text: "Sending you huge hugs! 🤗" },
    { img: 'photo8.jpg', text: "May your day be as sweet as cake! 🍰" },
    { img: 'photo9.jpg', text: "Here's to another wonderful year! 🥂" },
    { img: 'photo10.jpg', text: "Lots of love from all of us. ❤️" },
    { img: 'photo11.jpg', text: "You deserve the best celebration! 🎉" },
    { img: 'photo12.jpg', text: "Cherishing every moment with you. ⏳" },
    { img: 'photo13.jpg', text: "Forever young and beautiful! 💃" },
    { img: 'photo14.jpg', text: "Ready to make a wish? 🕯️" }
];

let currentSlideIndex = 0;
let blownCandlesCount = 0;
const totalCandles = 3;
let slideTimer;

function startSurprise() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('slideshow').classList.add('active');

    // Initialize first slide
    renderSlide(currentSlideIndex);
}

function renderSlide(index) {
    const container = document.getElementById('slide-content');
    container.innerHTML = `
    <div class="slide active">
      <img src="${slideData[index].img}" alt="Birthday Memory">
      <div class="caption">${slideData[index].text}</div>
    </div>
  `;

    // Clear existing timer if any
    if (slideTimer) clearTimeout(slideTimer);

    // Set auto-advance timer
    slideTimer = setTimeout(nextSlide, 5000); // 5 seconds for better reading time
}

function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex < slideData.length) {
        renderSlide(currentSlideIndex);
    } else {
        // Stop timer when slides are done
        if (slideTimer) clearTimeout(slideTimer);

        // Go to cake section
        document.getElementById('slideshow').classList.remove('active');
        document.getElementById('cake-section').classList.add('active');

        // Trigger candle lighting
        setTimeout(lightCandles, 1000);
    }
}

function lightCandles() {
    const candles = document.querySelectorAll('.candle');
    let delay = 0;

    // Reset for animation in case (though default is hidden now)
    blownCandlesCount = 0;

    // Total candles might be different now in HTML (5), so let's update dynamic check or hardcode
    // HTML has 5 candles now. Update global.
    // We can't update const totalCandleseasily here, better to trust blownCandlesCount vs querySelector count

    candles.forEach((candle, index) => {
        const flame = candle.querySelector('.flame');
        setTimeout(() => {
            flame.classList.add('lit');
            // Optional: Sound effect for lighting
        }, delay);
        delay += 500; // Light one every 500ms
    });

    // Update title text after lighting
    setTimeout(() => {
        document.querySelector('#cake-section h1').innerText = "Blow out the candles! 💨";
    }, delay + 500);
}

function blowCandle(element) {
    const flame = element.querySelector('.flame') || element;

    // Only allow blowing if it is lit
    if (flame.classList.contains('lit') && !flame.classList.contains('out')) {
        flame.classList.add('out');
        flame.classList.remove('lit'); // Stop animation
        blownCandlesCount++;

        // Check against actual number of candles in DOM
        const totalCandlesInDom = document.querySelectorAll('.candle').length;

        if (blownCandlesCount === totalCandlesInDom) {
            setTimeout(showFinalMessage, 500);
        }
    }
}

function showFinalMessage() {
    const msg = document.getElementById('final-message');
    msg.classList.add('visible');
    startConfetti();
}

function startConfetti() {
    const colors = ['#FFB7B2', '#E2F0CB', '#FFdac1', '#b5ead7', '#ff9aa2'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';

        document.body.appendChild(confetti);

        // Clean up
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

/* Balloon Logic */
function createBalloons() {
    const container = document.getElementById('balloon-container');
    const colors = ['#ff4081', '#1976d2', '#d50000', '#ffcdd2', '#bbdefb'];

    // Create a balloon every 500ms
    setInterval(() => {
        if (!document.getElementById('intro').classList.contains('active')) return;

        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        // Random Position
        balloon.style.left = Math.random() * 90 + 'vw';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random Speed
        balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';

        // Interaction
        balloon.onclick = function () {
            popBalloon(this);
        };

        container.appendChild(balloon);

        // Cleanup
        setTimeout(() => {
            if (balloon.parentNode) balloon.remove();
        }, 8000);

    }, 800);
}

function popBalloon(balloon) {
    balloon.classList.add('popped');
    // Optional: Add simple pop sound if we had one
    setTimeout(() => {
        if (balloon.parentNode) balloon.remove();
    }, 200);
}

// Start balloons on load
window.onload = createBalloons;
