let triggers = [];
const sections = ['home', 'about', 'experience', 'work', 'skills', 'contact'];
let topBar = undefined;
let navHeight = undefined;
let langs = undefined;
let html = undefined;
let moonIcon = undefined;
let sunIcon = undefined;

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

    topBar = document.querySelector('.nav-top-bar');
    navHeight = topBar.offsetHeight;
    langs = document.querySelector('.home-lang-div');
    html = document.querySelector('html');
    moonIcon = document.querySelector('.moon');
    sunIcon = document.querySelector('.sun');

    sections.forEach((section, index) => {
        const element = document.querySelector('.' + section + '-container');

        ScrollTrigger.create({
            trigger: element,
            start: 'top top',
            end: 'bottom top',
            onEnter: () => changeStateTopBar('none'),
            onLeave: () => changeStateTopBar('block'),
            onEnterBack: () => changeStateTopBar('none'),
            onLeaveBack: () => changeStateTopBar('block'),
        });
    });

    updateTheme();
    videoHandler();
});

function videoHandler()
{
    const videos = document.querySelectorAll('.video');

    videos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

function updateTheme()
{
    const theme = localStorage.getItem("theme");

    if (theme) {
        changeTheme(theme);
    } else {
        localStorage.setItem("theme", "dark");
        changeTheme("dark");
    }
}

function changeStateTopBar(state)
{
    if (state === 'block') {
        topBar.style.display = 'block';
        gsap.to(topBar, {
            opacity: 1,
            duration: 0.3,
            ease: "power3.easeInOut",
            overwrite: true,
        });
    } else if (state === 'none') {
        gsap.to(topBar, {
            opacity: 0,
            duration: 0.3,
            ease: "power3.easeInOut",
            onComplete: () => topBar.style.display = 'none'
        });
    }
}

function hover(element)
{
    element.className = element.className + ' filter-orange';
}

function unhover(element)
{
    if (element.className.includes('filter-orange')) {
        element.className = element.className.replace('filter-orange', '');
    }
    //element.setAttribute('src', src);
}

function redirectLink(link)
{
    window.open(link, '_blank');
}

function scrollToId(id) {
    const element = document.querySelector('.' + id + '-container');

    triggers.forEach(trigger => trigger.disable(false));

    gsap.to(window, {
        duration: 0.3,
        scrollTo: {
            y: element,
            offsetY: navHeight
        },
        ease: "power3.easeInOut",
        onUpdate: () => changeStateTopBar('block'),
    });
}


function displayLangChoice()
{
    if (langs.style.display.length === 0) {
        langs.style.display = 'block';
        gsap.to(langs, {
            opacity: 1,
            duration: 0.3,
            ease: "power3.easeInOut",
            overwrite: true
        });
    } else {
        gsap.to(langs, {
            opacity: 0,
            duration: 0.3,
            ease: "power3.easeInOut",
            onComplete: () => langs.style.display = ''
        });
    }
}

function changeIconsColor(theme)
{
    if (theme === 'dark') {
        const icons = document.querySelectorAll('.filter-black');
        icons.forEach(icon => icon.className = icon.className.replace('filter-black', 'filter-white'));
    } else if (theme === 'light') {
        const icons = document.querySelectorAll('.filter-white');
        icons.forEach(icon => icon.className = icon.className.replace('filter-white', 'filter-black'));
    }
}

function changeTheme(theme)
{
    if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem("theme", "dark");
    } else if (theme === 'light') {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        html.setAttribute('data-theme', 'light');
        localStorage.setItem("theme", "light");
    }
    changeIconsColor(theme);
}
