document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    let randomTime;
    if (document.location.pathname.endsWith("previous-edition/")) {
        randomTime = Math.random() * 500 + 1000;
    } else {
        randomTime = Math.random() * 500 + 500;
    }
    setTimeout(() => {
        loadingScreen.style.display = "none";
        document.documentElement.style.scrollbarColor = "rgba(127, 127, 127, 0.8) transparent";
    }, randomTime);
});

