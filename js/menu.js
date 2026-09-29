document.addEventListener("DOMContentLoaded", function () {

    loadMenu();

    setupSearch();

    setupCategories();

});


// ========================================
// LOAD MENU FROM FLASK API
// ========================================

async function loadMenu() {

    const menuContainer =
        document.getElementById("menuContainer");

    if (!menuContainer) {

        console.error("menuContainer not found");

        return;
    }


    try {

        const response =
            await fetch("/api/menu");


        if (!response.ok) {

            throw new Error(
                "API request failed: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log("MENU DATA:", data);


        if (
            data.status !== "success" ||
            !data.foods ||
            data.foods.length === 0
        ) {

            menuContainer.innerHTML = `
                <p class="no-food">
                    No food items found.
                </p>
            `;

            return;
        }


        displayFoods(data.foods);

    }

    catch (error) {

        console.error(
            "Menu loading error:",
            error
        );


        menuContainer.innerHTML = `
            <div class="error-message">

                <h3>❌ Unable to load menu</h3>

                <p>
                    Please make sure Flask server is running.
                </p>

            </div>
        `;

    }

}


// ========================================
// DISPLAY FOOD ITEMS
// ========================================

function displayFoods(foods) {

    const menuContainer =
        document.getElementById("menuContainer");


    menuContainer.innerHTML = "";


    foods.forEach(function (food) {

        const card =
            document.createElement("div");


        card.className = "food-card";


        card.innerHTML = `

            <div class="food-image">

                <img
                    src="/${food.image}"
                    alt="${food.name}"
                    onerror="this.src='/images/logo.jpeg'"
                >

            </div>


            <div class="food-info">

                <h3>
                    ${food.name}
                </h3>


                <p class="description">
                    ${food.description || ""}
                </p>


                <div class="food-bottom">

                    <span class="price">
                        ₹${food.price}
                    </span>


                    <span class="rating">
                        ⭐ ${food.rating}
                    </span>

                </div>


                <button
                    class="order-btn"
                    onclick="orderFood(${food.id})">

                    ORDER NOW

                </button>

            </div>

        `;


        menuContainer.appendChild(card);

    });

}


// ========================================
// ORDER FOOD
// ========================================

function orderFood(foodId) {

    window.location.href =
        "/order.html?food_id=" + foodId;

}


// ========================================
// SEARCH
// ========================================

function setupSearch() {

    const searchInput =
        document.getElementById("search");

    const searchButton =
        document.getElementById("searchBtn");


    if (!searchInput || !searchButton) {

        return;
    }


    searchButton.addEventListener(
        "click",
        searchFood
    );


    searchInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                searchFood();

            }

        }
    );

}


// ========================================
// SEARCH FOOD API
// ========================================

async function searchFood() {

    const searchInput =
        document.getElementById("search");


    const value =
        searchInput.value.trim();


    if (value === "") {

        loadMenu();

        return;
    }


    try {

        const response =
            await fetch(
                "/api/search?q=" +
                encodeURIComponent(value)
            );


        const data =
            await response.json();


        displayFoods(data.foods);

    }

    catch (error) {

        console.error(
            "Search error:",
            error
        );

    }

}


// ========================================
// CATEGORY FILTER
// ========================================

function setupCategories() {

    const buttons =
        document.querySelectorAll(
            ".category"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


                buttons.forEach(function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                const category =
                    button.textContent.trim();


                if (category === "All") {

                    loadMenu();

                }

                else {

                    loadCategory(category);

                }

            }
        );

    });

}


// ========================================
// CATEGORY API
// ========================================

async function loadCategory(category) {

    try {

        const response =
            await fetch(
                "/api/category/" +
                encodeURIComponent(category)
            );


        const data =
            await response.json();


        displayFoods(data.foods);

    }

    catch (error) {

        console.error(
            "Category error:",
            error
        );

    }

}