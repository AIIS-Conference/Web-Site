let previousLink = null;
let previousMenuLink = null;
let previousMenuCircle = null;

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

document.addEventListener('DOMContentLoaded', function() {
    const initialSection = getCookie("currentSection");
    const speakerButton = document.getElementById('speaker_button');
    if (speakerButton) {
        speakerButton.addEventListener('click', function() {
            window.location.href = 'speaker-page.html';
        });
    }
    if (initialSection) {
        const initialLink = document.querySelector(`#header a[href="#${initialSection}"]`);
        if (initialLink && initialLink.parentElement.classList.contains('header_link')) {
            initialLink.style.color = 'red';
            previousLink = initialLink;
        }
        const initialMenuLink = document.querySelector(`#menu a[href="#${initialSection}"]`);
        if (initialMenuLink && initialMenuLink.parentElement.classList.contains('menu_item')) {
            initialMenuLink.style.color = 'red';
            previousMenuLink = initialMenuLink;
        }
    }
});//on page load set current section link to red

document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('div[id]');
    let currentSection = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSection = section.id;
        }
    });

    if (currentSection) {
        const currentLink = document.querySelector(`#header a[href="#${currentSection}"]`);
        if (currentLink && currentLink.parentElement.classList.contains('header_link')) {
            if (previousLink && previousLink !== currentLink) {
                previousLink.style.color = '#444444';
            }
            currentLink.style.color = 'red';
            setCookie("currentSection", currentSection, 50);
            previousLink = currentLink;
        }
        const currentMenuLink = document.querySelector(`#menu a[href="#${currentSection}"]`);
        if (currentMenuLink && currentMenuLink.parentElement.classList.contains('menu_item')) {
            if (previousMenuLink && previousMenuLink !== currentMenuLink) {
                previousMenuLink.style.visibility = 'hidden';
            }
            currentMenuLink.style.visibility = 'visible';
            previousMenuLink = currentMenuLink;

            const currentMenuCircle = currentMenuLink.nextElementSibling;
            if (currentMenuCircle && currentMenuCircle.classList.contains('menu_circle')) {
                if (previousMenuCircle && previousMenuCircle !== currentMenuCircle) {
                    previousMenuCircle.style.backgroundColor = 'black';
                }
                currentMenuCircle.style.backgroundColor = 'red';
                previousMenuCircle = currentMenuCircle;
            }
        }
    }
});//change the color of the current section link to red on scroll