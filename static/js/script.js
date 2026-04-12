// ===== SLIDESHOW (Startseite) =====
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

function nextSlide() { showSlide(slideIndex + 1); }
function startSlideshow() { stopSlideshow(); slideInterval = setInterval(nextSlide, intervalTime); }
function stopSlideshow() { if (slideInterval) clearInterval(slideInterval); slideInterval = null; }
function plusSlides(n) { showSlide(slideIndex + n); startSlideshow(); }

// ===== HAMBURGER MENÜ =====
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    const slideshowContainer = document.querySelector(".slideshow-container");
    const slides = getSlides();
    if (slideshowContainer && slides.length) {
        showSlide(0);
        startSlideshow();
        slideshowContainer.addEventListener("mouseenter", stopSlideshow);
        slideshowContainer.addEventListener("mouseleave", startSlideshow);
    }
    initHamburger();
});
