document.addEventListener("DOMContentLoaded", function () {
    const speakerCards = document.querySelectorAll(".speaker_card");
    const mainSpeakerCard = document.getElementById("main_speaker_card");
    const mainSpeakerImage = document.getElementById("main_speaker_image");
    const mainSpeakerName = document.getElementById("main_speaker_name");
    const mainSpeakerCompany = document.getElementById("main_speaker_company");
    const mainSpeakerDescription = document.getElementById("main_speaker_description");
    const mainSpeakerJobTitle = document.getElementById("main_speaker_job_title");
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
                mainSpeakerName.style.marginTop = "min(8.5vw, 17vh)";
                mainSpeakerName.style.marginLeft = "max(-5vw, -10vh)";
                mainSpeakerCard.classList.add("tba");
                if (window.matchMedia("(orientation: portrait)").matches) {
                    speakerInfo.style.display = "block";
                    mainSpeakerName.style.marginTop = "2vh";
                    mainSpeakerName.style.marginLeft = "auto";
                    mainSpeakerName.style.marginRight = "auto";
                    mainSpeakerName.style.textAlign = "center";
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
            mainSpeakerCard.classList.remove("tba");
            mainSpeakerName.style.textAlign = "left";
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
            }
            else {
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
            mainSpeakerJobTitle.textContent = card.querySelector(".speaker_job_title").textContent;
        });
    });
});

window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => {
    const mainSpeakerName = document.getElementById("main_speaker_name");
    const mainSpeakerCard = document.getElementById("main_speaker_card");
    const speakerInfo = document.getElementById("speaker_info");
    if (e.matches) {
        // Portrait mode
        speakerInfo.style.display = "block";
        mainSpeakerCard.style.display = "block";
        mainSpeakerName.style.marginTop = "2vh";
        mainSpeakerName.style.marginLeft = "auto";
        mainSpeakerName.style.marginRight = "auto";
        mainSpeakerName.style.textAlign = "center";
        if (mainSpeakerCard.classList.contains("tba")) {
            }
            else {
                mainSpeakerName.style.textAlign = "left";
            }        
    } else {
        // Landscape mode
        mainSpeakerCard.style.display = "flex";
        if (mainSpeakerCard.classList.contains("tba")) {
            mainSpeakerName.style.marginTop = "min(8.5vw, 17vh)";
            mainSpeakerName.style.marginLeft = "max(-5vw, -10vh)";
            mainSpeakerName.style.marginRight = "";
            }
            else {
                mainSpeakerName.style.marginTop = "min(2vw, 4vh)";
                mainSpeakerName.style.marginLeft = "0";
                mainSpeakerName.style.textAlign = "left";
            }
    }
});