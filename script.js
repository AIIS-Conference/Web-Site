function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    let randomTime;
    if (document.location.pathname.endsWith("previous-edition.html")) {
        randomTime = Math.random() * 500 + 1000;
    } else {
        randomTime = Math.random() * 500 + 500;
    }
    setTimeout(() => {
        loadingScreen.style.display = "none";
        document.documentElement.style.scrollbarColor = "rgba(127, 127, 127, 0.8) transparent";
    }, randomTime);

    const speakerCards = document.querySelectorAll(".speaker_card");
    const mainSpeakerCard = document.getElementById("main_speaker_card");
    const mainSpeakerImage = document.getElementById("main_speaker_image");
    const mainSpeakerName = document.getElementById("main_speaker_name");
    const mainSpeakerCompany = document.getElementById("main_speaker_company");
    const mainSpeakerDescription = document.getElementById("main_speaker_description");
    const moreSpeakersTitle = document.getElementById("more_speakers_title");
    const moreSpeakersContainer = document.getElementById("more_speakers_container");
    const speakerInfo = document.getElementById("speaker_info");
    let mainSpeakerSelected = false;
    let previousSpeakerImage = null;

    speakerCards.forEach(card => {
        card.addEventListener("click", function () {
            // Check if the clicked card has the "tba" class
        if (card.classList.contains("tba")) {
            speakerInfo.style.flexDirection = "column";
            speakerInfo.style.justifyContent = "center";
            speakerInfo.style.alignItems = "center";
            speakerInfo.style.width = "100%";
            mainSpeakerName.style.marginTop = "min(1vw, 2vh)";
            mainSpeakerName.style.marginLeft = "max(-5vw, -10vh)";
            if (window.matchMedia("(orientation: portrait)").matches) {
                speakerInfo.style.display = "block";
                mainSpeakerName.style.marginTop = "2vh";
                mainSpeakerName.style.marginLeft = "auto";
                mainSpeakerName.style.marginRight = "auto";
                mainSpeakerName.style.textAlign = "right";
            }
            else {
                speakerInfo.style.display = "flex";
            }
        }
        else {
            speakerInfo.style.display = "";
            speakerInfo.style.flexDirection = "";
            speakerInfo.style.justifyContent = "";
            speakerInfo.style.alignItems = "";
            speakerInfo.style.width = "";
            mainSpeakerName.style.marginTop = "";
            mainSpeakerName.style.marginLeft = "";
        }
            const distanceToBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;

            if (!mainSpeakerSelected) {
                mainSpeakerSelected = true;
                mainSpeakerCard.style.visibility = "visible";
                mainSpeakerCard.style.height = "auto";
                moreSpeakersTitle.style.visibility = "visible";
                moreSpeakersTitle.style.height = "auto";
                moreSpeakersContainer.style.marginTop = "20px";
                moreSpeakersContainer.style.paddingTop = "0";
                if (window.matchMedia("(orientation: portrait)").matches) {
                    mainSpeakerCard.style.display = "block";
                }
                // Scroll to the same distance from the bottom
                window.scrollTo({ top: document.body.scrollHeight - window.innerHeight - distanceToBottom, behavior: 'instant' });
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            } else {
                // Restore the previous speaker image
                previousSpeakerImage.src = previousSpeakerImage.dataset.originalSrc;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Store the current speaker image
            previousSpeakerImage = card.querySelector("img");
            previousSpeakerImage.dataset.originalSrc = previousSpeakerImage.src;
            previousSpeakerImage.src = "images/speakers/gray.jpg";

            // Update main speaker details here
            mainSpeakerImage.src = card.querySelector("img").dataset.originalSrc;
            mainSpeakerName.textContent = card.querySelector(".speaker_name").textContent;
            mainSpeakerCompany.textContent = card.querySelector(".speaker_company").textContent;
            mainSpeakerDescription.textContent = card.querySelector(".speaker_description").textContent;
            console.log(mainSpeakerDescription.textContent);
        });
    });

    if (document.location.pathname.endsWith("previous-edition.html")) {
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