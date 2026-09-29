// ==========================================
// FOOD RESTAURANT WEBSITE
// script.js
// ==========================================

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // OFFERS POPUP
    // ======================================

    const offerBtn = document.getElementById("offer-btn");
    const offerBox = document.getElementById("offersBox");
    const closeBtn = document.getElementById("closeOffer");

    if (offerBtn && offerBox && closeBtn) {

        offerBtn.addEventListener("click", function (e) {

            e.preventDefault();

            offerBox.classList.add("active");

        });

        closeBtn.addEventListener("click", function () {

            offerBox.classList.remove("active");

        });

        window.addEventListener("click", function (e) {

            if (e.target === offerBox) {

                offerBox.classList.remove("active");

            }

        });

    }

    // ======================================
    // NAVBAR ACTIVE LINK
    // ======================================

    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => item.classList.remove("active"));

            this.classList.add("active");

        });

    });

    // ======================================
    // SMOOTH SCROLL
    // ======================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

});

// ==========================================
// SCROLL ANIMATION
// ==========================================

window.addEventListener("scroll", () => {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const position = card.getBoundingClientRect().top;

        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

});

// ==========================================
// HERO IMAGE FLOAT EFFECT
// ==========================================

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    heroImage.addEventListener("mouseover", () => {

        heroImage.style.transform = "scale(1.05) rotate(2deg)";

    });

    heroImage.addEventListener("mouseout", () => {

        heroImage.style.transform = "scale(1) rotate(0deg)";

    });

}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(button.clientWidth, button.clientHeight);

        circle.style.width = diameter + "px";
        circle.style.height = diameter + "px";

        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.background = "rgba(255,255,255,0.5)";
        circle.style.transform = "scale(0)";
        circle.style.animation = "ripple 0.6s linear";
        circle.style.left = e.offsetX - diameter / 2 + "px";
        circle.style.top = e.offsetY - diameter / 2 + "px";

        button.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});

// ==========================================
// CREATE RIPPLE STYLE
// ==========================================

const style = document.createElement("style");

style.innerHTML = `

@keyframes ripple{

0%{
transform:scale(0);
opacity:1;
}

100%{
transform:scale(4);
opacity:0;
}

}

`;

document.head.appendChild(style);