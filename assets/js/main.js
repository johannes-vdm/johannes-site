/* SHOW MENU */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu');
        })
    }
}
showMenu('nav-toggle', 'nav-menu');


/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* SHOW SCROLL TOP */
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);


/* DARK LIGHT THEME */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const darkSyntax = document.getElementById('dark-highlight');
const lightSyntax = document.getElementById('light-highlight');

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// TODO
// function syntaxHighlightChecks() {
//     if (document.body.classList.contains('dark-theme')) {
//         darkSyntax.disabled = false;
//         lightSyntax.disabled = true;
//     } else {
//         darkSyntax.disabled = true;
//         lightSyntax.disabled = false;
//     }
// }

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);

    // TODO syntaxHighlightChecks();
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    syntaxHighlightChecks();

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})


/* REDUCE THE SIZE AND PRINT ON AN A4 SHEET */
function scaleCv() {
    document.body.classList.add('scale-cv');
}

/* REMOVE THE SIZE WHEN THE CV IS DOWNLOADED */
function removeScale() {
    document.body.classList.remove('scale-cv');
}

window.generateResume = function () {

    var script = document.createElement("script");
    script.src = "./assets/js/html2pdf.bundle.min.js";
    document.body.appendChild(script);

    let areaCv = document.getElementById('area-cv');

    // Html2pdf options
    let opt = {
        margin: 0,
        filename: 'Johannes van der Merwe - CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { orientation: 'portrait' }
    };

    // Function to call areaCv and Html2Pdf options 

    // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
    scaleCv();

    // 2. The PDF is generated
    html2pdf(areaCv, opt);

    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
    setTimeout(removeScale, 5000);
}
