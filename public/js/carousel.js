function initCarousel() {;
    const carouselImages = document.querySelector("#carousel-images");
    if (!carouselImages) return;

    const images = [
            { src:"/images/image1.jpg", alt:"Image 1" },
            { src:"/images/image2.jpg", alt:"Image 2" },
            { src:"/images/image3.jpg", alt:"Image 3" },
            { src:"/images/image4.jpg", alt:"Image 4" },
    ];

    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");

    if (!prevButton || !nextButton) return;

    if (images.length === 0) {
        prevButton.disabled = true;
        nextButton.disabled = true;
        return;
    }

    let currentIndex = 0;

    function renderImages() {
        carouselImages.innerHTML = "";

        images.forEach(image => {
            const img = document.createElement("img");

            img.className = "min-w-full w-full h-full object-cover";
            img.src = image.src;
            img.alt = image.alt;

            carouselImages.appendChild(img);
        });
    }

    function updateCarousel() {
        const offset = currentIndex * 100;
        carouselImages.style.transform = `translateX(-${offset}%)`;
    }

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    renderImages();
    updateCarousel();
}