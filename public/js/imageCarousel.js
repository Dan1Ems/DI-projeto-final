function showImages() {
    try {
            const images = [
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg"
        ];

        let currentIndex = 0;

        const carouselImage = document.querySelector("#carousel-image");
        const nextButton = document.querySelector("#next-btn");
        const prevButton = document.querySelector("#prev-btn");

        function showImage(index) {
            carouselImage.src = images[index];
        }

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;

            showImage(currentIndex);
        });

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;

            showImage(currentIndex);
        });
    } catch (error) {
        console.error(error);
    }
}