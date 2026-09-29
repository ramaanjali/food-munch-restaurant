// ===========================================
// Food Much Restaurant
// order.js
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("orderForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // ==========================
        // Customer Details
        // ==========================

        const name = document.querySelector('input[type="text"]').value.trim();

        const mobile = document.querySelector('input[type="tel"]').value.trim();

        const email = document.querySelector('input[type="email"]').value.trim();

        const address = document.querySelector("textarea").value.trim();

        const quantity = document.querySelector("select").value;

        // ==========================
        // Validations
        // ==========================

        if (name === "") {

            alert("Please enter your name.");

            return;

        }

        if (!/^[A-Za-z ]+$/.test(name)) {

            alert("Name should contain only letters.");

            return;

        }

        if (!/^[0-9]{10}$/.test(mobile)) {

            alert("Enter a valid 10-digit mobile number.");

            return;

        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {

            alert("Enter a valid email address.");

            return;

        }

        if (address === "") {

            alert("Please enter your delivery address.");

            return;

        }

        if (quantity === "") {

            alert("Please select quantity.");

            return;

        }

        // ==========================
        // Food Items
        // ==========================

        const foods = document.querySelectorAll(".food-list input[type='checkbox']");

        let selectedFood = [];

        foods.forEach(food => {

            if (food.checked) {

                selectedFood.push(food.parentElement.innerText);

            }

        });

        if (selectedFood.length === 0) {

            alert("Please select at least one food item.");

            return;

        }

        // ==========================
        // Payment
        // ==========================

        const payment = document.querySelector("input[name='payment']:checked");

        if (!payment) {

            alert("Please select a payment method.");

            return;

        }

        // ==========================
        // Delivery
        // ==========================

        const delivery = document.querySelector("input[name='delivery']:checked");

        if (!delivery) {

            alert("Please select a delivery type.");

            return;

        }

        // ==========================
        // Success Message
        // ==========================

        alert(

            "🎉 Order Placed Successfully!\n\n" +

            "Customer : " + name +

            "\nItems : " + selectedFood.length +

            "\nQuantity : " + quantity +

            "\n\nThank you for ordering from\nFood Much Restaurant ❤️"

        );

        form.reset();

    });

    // ==========================
    // Reset Confirmation
    // ==========================

    const resetBtn = document.querySelector(".reset-btn");

    if (resetBtn) {

        resetBtn.addEventListener("click", function () {

            let answer = confirm("Do you really want to clear the form?");

            if (!answer) {

                event.preventDefault();

            }

        });

    }

});

// ===========================================
// Scroll To Top Button
// ===========================================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.style.position = "fixed";

topBtn.style.bottom = "30px";

topBtn.style.right = "30px";

topBtn.style.width = "50px";

topBtn.style.height = "50px";

topBtn.style.border = "none";

topBtn.style.borderRadius = "50%";

topBtn.style.background = "#ff6600";

topBtn.style.color = "white";

topBtn.style.fontSize = "24px";

topBtn.style.cursor = "pointer";

topBtn.style.display = "none";

topBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";

document.body.appendChild(topBtn);

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

// ===========================================
// Footer Icons Animation
// ===========================================

const icons = document.querySelectorAll(".footer-icons a");

icons.forEach(icon => {

    icon.addEventListener("mouseenter", function () {

        icon.style.transform = "scale(1.2) rotate(360deg)";

    });

    icon.addEventListener("mouseleave", function () {

        icon.style.transform = "scale(1)";

    });

});

// ===========================================
// Input Focus Effect
// ===========================================

const inputs = document.querySelectorAll("input, textarea, select");

inputs.forEach(input => {

    input.addEventListener("focus", function () {

        input.style.borderColor = "#ff6600";

    });

    input.addEventListener("blur", function () {

        input.style.borderColor = "#ddd";

    });

});

// ===========================================
// Live Character Counter
// ===========================================

const textArea = document.querySelector("textarea");

if (textArea) {

    const counter = document.createElement("small");

    counter.style.display = "block";

    counter.style.marginTop = "5px";

    counter.style.color = "gray";

    textArea.parentElement.appendChild(counter);

    textArea.addEventListener("input", function () {

        counter.innerHTML =

            textArea.value.length + " / 250 Characters";

    });

}
const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const address =
        document.getElementById("address").value;

    const total =
        document.getElementById("total").value;

    const foodItems = [
        "Selected food items"
    ];

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,

                    email: email,

                    phone: phone,

                    address: address,

                    food_items: foodItems,

                    total_amount: total

                })
            }
        );

        const result =
            await response.json();

        if (result.status === "success") {

            alert(
                "🎉 Order Reached!\n\n" +
                "Order ID: " +
                result.order_id +
                "\n\n" +
                "Confirmation email sent!"
            );

            orderForm.reset();

        } else {

            alert(
                "❌ " +
                result.message
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            "❌ Backend connection failed!"
        );

    }

});