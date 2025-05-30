document.addEventListener("DOMContentLoaded", function () {
    if (document.location.pathname.endsWith("previous-edition/")) {
    const slideshowImages = [
        "images/previous_speakers/pictures/previous_edition_1.jpg",
        "images/previous_speakers/pictures/previous_edition_2.jpg",
        "images/previous_speakers/pictures/previous_edition_3.jpg",
        "images/previous_speakers/pictures/previous_edition_4.jpg",
        "images/previous_speakers/pictures/previous_edition_5.jpg",
        "images/previous_speakers/pictures/previous_edition_6.jpg",
        "images/previous_speakers/pictures/previous_edition_7.jpg"
    ];    
    
        // Shuffle the array using the Fisher-Yates algorithm
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    
        shuffleArray(slideshowImages); // Shuffle the images array
    
        const slideshowElement = document.getElementById("img");
        let currentImageIndex = 0;
    
        function changeSlideshowImage() {
            // Update the src of the image
            slideshowElement.src = slideshowImages[currentImageIndex];
            // Move to the next image, looping back to the start if necessary
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        }
        changeSlideshowImage();
        // Start the slideshow, changing the image every 3 seconds
        setInterval(changeSlideshowImage, 3000);
    }
});