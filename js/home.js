/* =========================================
   FOOD MUNCH HOME PAGE
========================================= */


/* ================================
   LOGIN
================================ */

function openLogin() {
    const overlay = document.getElementById("loginOverlay");

    if (overlay) {
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}


function closeLogin() {
    const overlay = document.getElementById("loginOverlay");

    if (overlay) {
        overlay.classList.remove("show");
        document.body.style.overflow = "";
    }
}


/* Close login when clicking outside the box */

document.addEventListener("click", function (event) {

    const overlay = document.getElementById("loginOverlay");
    const loginBox = document.querySelector(".login-box");

    if (
        overlay &&
        overlay.classList.contains("show") &&
        event.target === overlay
    ) {
        closeLogin();
    }

});


/* Close login with ESC key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeLogin();
    }

});


/* ================================
   LOGIN FORM
================================ */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        alert("Login successful! Welcome to Food Munch.");

        loginForm.reset();

        closeLogin();

    });

}


/* ================================
   SIGN UP
================================ */

function signup() {

    alert("Sign Up page coming soon!");

}


/* ================================
   FOOD CARD
================================ */

function openFood() {

    window.location.href = "index.html";

}


/* ================================
   HOME
================================ */

function goHome() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================================
   ACTIVE NAVIGATION
================================ */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        this.classList.add("active");

    });

});