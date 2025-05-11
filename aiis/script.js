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
    const randomTime = Math.random() * 500 + 1000;
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, randomTime);

    const speakerCards = document.querySelectorAll(".speaker_card");
    const mainSpeakerCard = document.getElementById("main_speaker_card");
    const mainSpeakerImage = document.getElementById("main_speaker_image");
    const mainSpeakerName = document.getElementById("main_speaker_name");
    const mainSpeakerCompany = document.getElementById("main_speaker_company");
    const mainSpeakerDescription = document.getElementById("main_speaker_description");
    const moreSpeakersTitle = document.getElementById("more_speakers_title");
    const moreSpeakersContainer = document.getElementById("more_speakers_container");
    let mainSpeakerSelected = false;
    let previousSpeakerImage = null;

    speakerCards.forEach(card => {
        card.addEventListener("click", function () {
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
        });
    });
});