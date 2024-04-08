// Function to smoothly scroll to the top of the page when the button is clicked
const scrollToTop = () => {
    const interval = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
            window.clearInterval(interval);
        }
    }, 1); // scroll speed in milliseconds
};

// Function to perform smooth scrolling to a target element
const smoothScrollTo = (target) => {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    const duration = 1000; // scroll duration in milliseconds

    // Easing function for smooth scrolling
    const easeInOut = (currentTime, startValue, changeInValue, duration) => {
        currentTime /= duration / 2;
        if (currentTime < 1) return changeInValue / 2 * currentTime * currentTime + startValue;
        currentTime--;
        return -changeInValue / 2 * (currentTime * (currentTime - 2) - 1) + startValue;
    };

    let start = null;

    // Step function to control scrolling animation
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOut(progress, startPosition, distance, duration));
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};

// Attach smooth scrolling behavior to links
document.querySelectorAll('#backToTopButton, .navbar-nav a.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
    });
});