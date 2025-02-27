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

document.addEventListener("DOMContentLoaded", function() {
    const speakerCards = document.querySelectorAll(".speaker_card");
    const mainSpeakerImage = document.getElementById("main_speaker_image");
    const mainSpeakerName = document.getElementById("main_speaker_name");
    const mainSpeakerCompany = document.getElementById("main_speaker_company");
    const mainSpeakerDescription = document.getElementById("main_speaker_description");

    speakerCards.forEach(card => {
        card.addEventListener("click", function() {
            const speakerImage = card.querySelector(".speaker_image");
            const speakerName = card.querySelector(".speaker_name");
            const speakerCompany = card.querySelector(".speaker_company");
            const speakerDescription = card.querySelector(".speaker_description");

            // Swap images
            const tempImageSrc = mainSpeakerImage.src;
            mainSpeakerImage.src = speakerImage.src;
            speakerImage.src = tempImageSrc;

            // Swap names
            const tempName = mainSpeakerName.textContent;
            mainSpeakerName.textContent = speakerName.textContent;
            speakerName.textContent = tempName;

            // Swap companies
            const tempCompany = mainSpeakerCompany.textContent;
            mainSpeakerCompany.textContent = speakerCompany.textContent;
            speakerCompany.textContent = tempCompany;

            // Swap descriptions
            const tempDescription = mainSpeakerDescription.textContent;
            mainSpeakerDescription.textContent = speakerDescription.textContent;
            speakerDescription.textContent = tempDescription;
        });
    });
});