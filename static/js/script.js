// script.js – Slideshow für die Startseite (index.html)

let slideIndex = 0;
let slideInterval = null;
const intervalTime = 3000;

function getSlides() {
    return document.getElementsByClassName("mySlides");
}

function hideAllSlides(slides) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
}

function showSlide(index) {
    const slides = getSlides();
    if (!slides.length) return;

    slideIndex = (index + slides.length) % slides.length;
    hideAllSlides(slides);
    slides[slideIndex].style.display = "block";
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(nextSlide, intervalTime);
}

function stopSlideshow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = null;
}

// Wird von HTML onclick genutzt
function plusSlides(n) {
    showSlide(slideIndex + n);
    startSlideshow();
}

document.addEventListener("DOMContentLoaded", () => {
    const slideshowContainer = document.querySelector(".slideshow-container");
    const slides = getSlides();

    if (!slideshowContainer || !slides.length) return;

    showSlide(0);
    startSlideshow();

    slideshowContainer.addEventListener("mouseenter", stopSlideshow);
    slideshowContainer.addEventListener("mouseleave", startSlideshow);
});


