/* =========================================================
   VICTOR N. — PROFESSIONAL PORTFOLIO
   Main JavaScript File
   Vanilla JavaScript
========================================================= */

"use strict";


/* ================= GLOBAL ELEMENTS ================= */

const body = document.body;

const header = document.getElementById("header");

const navbar = document.getElementById("navbar");

const menuToggle = document.getElementById("menuToggle");

const themeToggle = document.getElementById("themeToggle");

const backToTop = document.getElementById("backToTop");

const preloader = document.getElementById("preloader");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const toastClose = document.getElementById("toastClose");

const currentYear = document.getElementById("currentYear");


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (preloader) {
            preloader.classList.add("hidden");
        }

    }, 700);

});


/* ================= COPYRIGHT YEAR ================= */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ================= TOAST NOTIFICATIONS ================= */

let toastTimeout;

function showToast(message) {

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


if (toastClose) {

    toastClose.addEventListener("click", () => {

        toast.classList.remove("show");

    });

}


/* ================= MOBILE NAVIGATION ================= */

function closeMobileMenu() {

    if (!navbar || !menuToggle) return;

    navbar.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    body.classList.remove("menu-open");

}


if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        body.classList.toggle("menu-open", isOpen);

    });

}


/* Close menu when a navigation link is clicked */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/* Close mobile menu when clicking outside */

document.addEventListener("click", event => {

    if (!navbar || !menuToggle) return;

    const clickedInsideMenu = navbar.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (
        navbar.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedToggle
    ) {

        closeMobileMenu();

    }

});


/* Close menu when screen becomes larger */

window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {

        closeMobileMenu();

    }

});


/* ================= LIGHT / DARK MODE ================= */

const savedTheme = localStorage.getItem("victorPortfolioTheme");


function applyTheme(theme) {

    if (theme === "light") {

        body.classList.add("light-theme");

    } else {

        body.classList.remove("light-theme");

    }

    updateThemeIcon();

}


function updateThemeIcon() {

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;

    if (body.classList.contains("light-theme")) {

        icon.className = "fas fa-moon";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        icon.className = "fas fa-sun";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


/* Apply saved theme */

applyTheme(savedTheme === "light" ? "light" : "dark");


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isLight = body.classList.toggle("light-theme");

        const selectedTheme = isLight ? "light" : "dark";

        localStorage.setItem(
            "victorPortfolioTheme",
            selectedTheme
        );

        updateThemeIcon();

        showToast(
            isLight
                ? "Light mode activated."
                : "Dark mode activated."
        );

    });

}


/* ================= TYPING ANIMATION ================= */

const typingElement = document.getElementById("typingText");

const typingWords = [

    "Frontend Developer",

    "Web Developer",

    "UI/UX Designer",

    "Creative Thinker",

    "Technology Enthusiast"

];

let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeAnimation() {

    if (!typingElement) return;

    const currentWord = typingWords[wordIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingElement.textContent = currentWord.substring(
        0,
        characterIndex
    );


    let typingSpeed = deleting ? 45 : 90;


    if (!deleting && characterIndex === currentWord.length) {

        deleting = true;

        typingSpeed = 1600;

    } else if (deleting && characterIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % typingWords.length;

        typingSpeed = 400;

    }

    setTimeout(typeAnimation, typingSpeed);

}


if (typingElement) {

    typeAnimation();

}


/* ================= SCROLL REVEAL ANIMATIONS ================= */

const revealElements = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }

    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* ================= HEADER SCROLL EFFECT ================= */

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* ================= BACK TO TOP ================= */

function handleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navLinks = document.querySelectorAll(
    ".nav-link"
);


function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener(
    "load",
    updateActiveNavigation
);


/* ================= PROJECT FILTERING ================= */

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;


        /* Update active button */

        filterButtons.forEach(filterButton => {

            filterButton.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter projects */

        projectCards.forEach(card => {

            const category = card.dataset.category;

            const matches =
                selectedFilter === "all" ||
                category === selectedFilter;


            if (matches) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* ================= PLACEHOLDER LINKS ================= */

document.querySelectorAll(".placeholder-link").forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        showToast(
            "This link will be activated when your contact details or project links are added."
        );

    });

});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

const formNotice = document.getElementById("formNotice");


if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();


        const name = document.getElementById(
            "contactName"
        ).value.trim();


        const email = document.getElementById(
            "contactEmail"
        ).value.trim();


        const subject = document.getElementById(
            "contactSubject"
        ).value.trim();


        const message = document.getElementById(
            "contactMessage"
        ).value.trim();


        /* Basic validation */

        if (!name || !email || !subject || !message) {

            showToast(
                "Please complete all the required fields."
            );

            return;

        }


        /* Validate email */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showToast(
                "Please enter a valid email address."
            );

            return;

        }


        /*
            EMAIL CONFIGURATION

            Replace YOUR_EMAIL_HERE with your actual
            email address when ready.

            Until then, the form will not pretend
            to send a message.
        */

        const recipient = "YOUR_EMAIL_HERE";


        if (
            !recipient ||
            recipient === "YOUR_EMAIL_HERE"
        ) {

            if (formNotice) {

                formNotice.textContent =
                    "Contact form is awaiting your email configuration.";

            }

            showToast(
                "Your email address needs to be configured before messages can be sent."
            );

            return;

        }


        /*
            Prepare an email draft using the visitor's
            default email application.
        */

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(

            "Hello Victor,\n\n" +

            "My name is: " + name + "\n" +

            "My email: " + email + "\n\n" +

            "Message:\n" + message

        );


        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;


        window.location.href = mailtoLink;


        if (formNotice) {

            formNotice.textContent =
                "Your email application is opening.";

        }


        contactForm.reset();

    });

}


/* ================= VISITOR COUNTER ================= */

/*
    BASIC LOCAL VISIT COUNTER

    This counts visits in the current browser only.

    It is not a global website visitor count.

    A genuine shared visitor counter will require
    an external analytics or counter service.
*/

try {

    let visitCount = Number(
        localStorage.getItem("victorPortfolioVisits")
    ) || 0;


    const previousVisitDate = localStorage.getItem(
        "victorPortfolioLastVisit"
    );


    const today = new Date().toDateString();


    if (previousVisitDate !== today) {

        visitCount++;

        localStorage.setItem(
            "victorPortfolioVisits",
            visitCount
        );

        localStorage.setItem(
            "victorPortfolioLastVisit",
            today
        );

    }


    const visitorCounter = document.getElementById(
        "visitorCount"
    );


    if (visitorCounter) {

        visitorCounter.textContent =
            visitCount.toLocaleString();

    }

} catch (error) {

    console.warn(
        "Visitor counter storage is unavailable.",
        error
    );

}


/* ================= KEYBOARD ACCESSIBILITY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeMobileMenu();

        if (toast) {

            toast.classList.remove("show");

        }

    }

});


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Victor N. Portfolio initialized successfully."
    );

});


/* ================= END OF SCRIPT ================= */
