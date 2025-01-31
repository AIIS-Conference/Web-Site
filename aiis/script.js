// Function to handle side menu circle color changes
function handleSideMenu() {
    const sections = document.querySelectorAll('div[id]'); 
    const menuItems = document.querySelectorAll('#menu .menu_item'); 

    window.addEventListener('scroll', () => {
        let currentSection = '';

        // Determine which section is currently in view
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                currentSection = section.id;
            }
        });

        // Highlight the corresponding side menu item
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('a').getAttribute('href').includes(currentSection)) {
                item.classList.add('active'); 
            }
        });
    });
}

// Call the function
handleSideMenu();