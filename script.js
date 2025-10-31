
const defaultConfig = {
    site_title: "Typester",
    welcome_heading: "Welcome to Typester",
    description: "Your ultimate typing tester. Improve your typing speed and accuracy with our fun and engaging tests!",
    button_text: "Start Testing Now"
};


const elements = {
    siteTitle: document.getElementById('title'),
    welcomeHeading: document.getElementById('welcome'),
    description: document.getElementById('para'),
    button: document.querySelector('.button')
};


async function onConfigChange(config) {
    const siteTitle = config.site_title || defaultConfig.site_title;
    const welcomeHeading = config.welcome_heading || defaultConfig.welcome_heading;
    const description = config.description || defaultConfig.description;
    const buttonText = config.button_text || defaultConfig.button_text;

    elements.siteTitle.textContent = siteTitle;
    elements.welcomeHeading.textContent = welcomeHeading;
    elements.description.textContent = description;
    elements.button.textContent = buttonText;
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ['site_title', config.site_title || defaultConfig.site_title],
        ['welcome_heading', config.welcome_heading || defaultConfig.welcome_heading],
        ['description', config.description || defaultConfig.description],
        ['button_text', config.button_text || defaultConfig.button_text]
    ]);
}






window.addEventListener('load', function () {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');


        setTimeout(() => {
            animateElements();
        }, 300);
    }, 1500);
});


function animateElements() {
    const animatedElements = document.querySelectorAll('.animate-element, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-fade');


    setTimeout(() => {
        document.getElementById('navbar').classList.add('visible');
    }, 100);


    animatedElements.forEach((element, index) => {
        if (element.id === 'navbar') return;

        setTimeout(() => {
            element.classList.add('visible');
        }, 200 + (index * 150));
    });


    const featureCards = document.querySelectorAll('.detail-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 800 + (index * 200));
    });
}


let lastScrollTop = 0;


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);


document.addEventListener('DOMContentLoaded', () => {
    const scrollAnimateElements = document.querySelectorAll('.about-section');
    scrollAnimateElements.forEach(el => observer.observe(el));
});


const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        mobileMenu.classList.add('active');

        mobileMenuToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http:
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
    } else {
        mobileMenu.classList.remove('active');

        mobileMenuToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http:
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
    }
}


mobileMenuToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
});

mobileMenuToggle.addEventListener('touchstart', function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
}, { passive: false });


const menuSvg = mobileMenuToggle.querySelector('svg');
if (menuSvg) {
    menuSvg.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
}


const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    });


    link.addEventListener('touchstart', function (e) {
        this.style.backgroundColor = 'rgba(0, 212, 255, 0.15)';
    }, { passive: true });

    link.addEventListener('touchend', function (e) {
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 150);
    }, { passive: true });
});


const allNavLinks = document.querySelectorAll('.nav-link');
allNavLinks.forEach(link => {
    link.addEventListener('touchstart', function (e) {
        this.style.backgroundColor = 'rgba(0, 212, 255, 0.15)';
    }, { passive: true });

    link.addEventListener('touchend', function (e) {
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 150);
    }, { passive: true });
});


document.addEventListener('click', (event) => {
    if (isMenuOpen && !document.getElementById('navbar').contains(event.target)) {
        toggleMobileMenu();
    }
});


document.addEventListener('touchstart', (event) => {
    if (isMenuOpen && !document.getElementById('navbar').contains(event.target)) {
        toggleMobileMenu();
    }
}, { passive: true });


function closeMobileMenuOnScroll() {
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}


window.addEventListener('scroll', closeMobileMenuOnScroll, { passive: true });


document.addEventListener('touchmove', (event) => {
    if (isMenuOpen && event.touches.length === 1) {

        const touch = event.touches[0];
        const navbar = document.getElementById('navbar');


        if (!navbar.contains(document.elementFromPoint(touch.clientX, touch.clientY))) {
            toggleMobileMenu();
        }
    }
}, { passive: true });


function handleNavbarScroll(scrollTop) {
    const navbar = document.getElementById('navbar');

    if (scrollTop > lastScrollTop && scrollTop > 300) {

        navbar.classList.add('navbar-hidden');
    } else {

        navbar.classList.remove('navbar-hidden');
    }

    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
}


let lenis;
try {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


    lenis.on('scroll', ({ scroll }) => {
        handleNavbarScroll(scroll);
    });
} catch (error) {
    console.log('Lenis not available, using fallback scroll detection');


    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll(window.pageYOffset || document.documentElement.scrollTop);
                ticking = false;
            });
            ticking = true;
        }
    });
}


async function copyToClipboard(text, button) {
    try {

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            showCopySuccess(button);
        } else {

            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                showCopySuccess(button);
            } else {
                throw new Error('Copy command failed');
            }
        }
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showCopyError(button);
    }
}

function showCopySuccess(button) {
    showCopyNotification('Copied to clipboard!');


    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }
}

function showCopyError(button) {
    showCopyNotification('Copy failed - please select and copy manually');


    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Failed';
        button.style.background = 'rgba(255, 0, 0, 0.1)';
        button.style.borderColor = 'rgba(255, 0, 0, 0.3)';
        button.style.color = '#ff4444';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
        }, 2000);
    }
}

function showCopyNotification(message = 'Copied!') {

    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }


    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    document.body.appendChild(notification);


    setTimeout(() => {
        notification.classList.add('show');
    }, 10);


    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 2000);
}




if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}