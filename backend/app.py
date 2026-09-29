from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

from database import (
    create_tables,
    insert_initial_foods,
    get_connection
)


# =====================================================
# PROJECT PATH
# =====================================================

BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)


# =====================================================
# FLASK APP
# =====================================================

app = Flask(__name__)

CORS(app)


# =====================================================
# DATABASE INITIALIZATION
# =====================================================

create_tables()
insert_initial_foods()


# =====================================================
# FRONTEND - HOME PAGE
# =====================================================

@app.route("/")
def home_page():

    return send_from_directory(
        BASE_DIR,
        "home.html"
    )


# =====================================================
# HOME PAGE - /home
# =====================================================

@app.route("/home")
def home():

    return send_from_directory(
        BASE_DIR,
        "home.html"
    )


# =====================================================
# FOOD / MENU PAGE
# =====================================================

@app.route("/index.html")
def index_page():
    return send_from_directory(
        BASE_DIR,
        "index.html"
    )


@app.route("/menu.html")
def menu_page():

    return send_from_directory(
        BASE_DIR,
        "menu.html"
    )

# =====================================================
# ORDER PAGE
# =====================================================


@app.route("/order.html")
def order_page():
    return send_from_directory(
        BASE_DIR,
        "order.html"
    )

# =====================================================
# FRONTEND - OTHER FILES
# =====================================================

@app.route("/<path:filename>")
def frontend_files(filename):

    # API routes should NOT come here
    if filename.startswith("api/"):

        return jsonify({
            "status": "error",
            "message": "API route not found"
        }), 404


    file_path = os.path.join(
        BASE_DIR,
        filename
    )


    if os.path.isfile(file_path):

        return send_from_directory(
            BASE_DIR,
            filename
        )


    return jsonify({
        "status": "error",
        "message": "Page not found",
        "file": filename
    }), 404


# =====================================================
# TEST API
# =====================================================

@app.route("/api/test")
def test():

    return jsonify({
        "status": "success",
        "message": "Frontend and Backend are connected!"
    })


# =====================================================
# GET ALL MENU ITEMS
# =====================================================

@app.route("/api/menu", methods=["GET"])
def get_menu():

    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute("""
        SELECT *
        FROM foods
        ORDER BY id
    """)


    foods = cursor.fetchall()

    connection.close()


    return jsonify({
        "status": "success",
        "count": len(foods),
        "foods": [
            dict(food)
            for food in foods
        ]
    })


# =====================================================
# GET SINGLE FOOD
# =====================================================

@app.route("/api/menu/<int:food_id>", methods=["GET"])
def get_food(food_id):

    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute("""
        SELECT *
        FROM foods
        WHERE id = ?
    """, (food_id,))


    food = cursor.fetchone()

    connection.close()


    if food is None:

        return jsonify({
            "status": "error",
            "message": "Food not found"
        }), 404


    return jsonify({
        "status": "success",
        "food": dict(food)
    })


# =====================================================
# SEARCH FOOD
# =====================================================

@app.route("/api/search", methods=["GET"])
def search_food():

    search = request.args.get(
        "q",
        ""
    ).strip()


    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute("""
        SELECT *
        FROM foods
        WHERE
            LOWER(name) LIKE ?
            OR LOWER(description) LIKE ?
            OR LOWER(category) LIKE ?
        ORDER BY name
    """, (
        f"%{search.lower()}%",
        f"%{search.lower()}%",
        f"%{search.lower()}%"
    ))


    foods = cursor.fetchall()

    connection.close()


    return jsonify({
        "status": "success",
        "count": len(foods),
        "foods": [
            dict(food)
            for food in foods
        ]
    })


# =====================================================
# GET FOOD BY CATEGORY
# =====================================================

@app.route("/api/category/<category>", methods=["GET"])
def get_category(category):

    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute("""
        SELECT *
        FROM foods
        WHERE LOWER(category) = ?
        ORDER BY name
    """, (
        category.lower(),
    ))


    foods = cursor.fetchall()

    connection.close()


    return jsonify({
        "status": "success",
        "category": category,
        "count": len(foods),
        "foods": [
            dict(food)
            for food in foods
        ]
    })
@app.route("/images/<path:filename>")
def images(filename):
    return send_from_directory(
        os.path.join(BASE_DIR, "images"),
        filename
    )

# =====================================================
# HEALTH CHECK
# =====================================================

@app.route("/api/health")
def health():

    return jsonify({
        "status": "OK",
        "backend": "Flask",
        "database": "SQLite",
        "project": "Food Much Restaurant"
    })


# =====================================================
# START SERVER
# =====================================================

if __name__ == "__main__":

    print("")
    print("======================================")
    print("      FOOD MUNCH RESTAURANT")
    print("======================================")
    print("Frontend + Backend Server Starting...")
    print("")
    print("Home Page:")
    print("http://127.0.0.1:5000/")
    print("")
    print("Food / Menu:")
    print("http://127.0.0.1:5000/index.html")
    print("")
    print("Order Page:")
    print("http://127.0.0.1:5000/order.html")
    print("")
    print("Menu API:")
    print("http://127.0.0.1:5000/api/menu")
    print("")


    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )