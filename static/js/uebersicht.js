// uebersicht.js – Galerie-Slideshow für die Übersichtsseite

let galleryIndex = 1;

document.addEventListener("DOMContentLoaded", () => {
    showGallerySlide(galleryIndex);
});

// Vor/Zurück-Buttons
function plusSlides(n) {
    showGallerySlide(galleryIndex += n);
}

// Thumbnail-Klick
function currentSlide(n) {
    showGallerySlide(galleryIndex = n);
}

function showGallerySlide(n) {
    const slides = document.getElementsByClassName("gallerySlide");
    const thumbs = document.getElementsByClassName("demo");
    const captionText = document.getElementById("caption");

    if (!slides.length) return;

    // Index wrappen
    if (n > slides.length) galleryIndex = 1;
    if (n < 1) galleryIndex = slides.length;

    // Alle ausblenden
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Alle Thumbnails deaktivieren
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove("active");
    }

    // Aktiven Slide und Thumbnail setzen
    slides[galleryIndex - 1].style.display = "block";
    thumbs[galleryIndex - 1].classList.add("active");

    if (captionText) {
        captionText.textContent = thumbs[galleryIndex - 1].alt;
    }
}