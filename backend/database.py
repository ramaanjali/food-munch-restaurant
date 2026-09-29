import sqlite3
import os


# =====================================================
# DATABASE PATH
# =====================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE_PATH = os.path.join(
    BASE_DIR,
    "restaurant.db"
)


# =====================================================
# GET CONNECTION
# =====================================================

def get_connection():

    connection = sqlite3.connect(DATABASE_PATH)

    connection.row_factory = sqlite3.Row

    return connection


# =====================================================
# CREATE TABLES
# =====================================================

def create_tables():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS foods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            image TEXT,
            rating REAL DEFAULT 5.0
        )
    """)

    connection.commit()
    connection.close()

    print("✅ Foods table created successfully!")


# =====================================================
# INSERT INITIAL FOODS
# =====================================================

def insert_initial_foods():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM foods")

    count = cursor.fetchone()[0]

    if count > 0:

        print("✅ Food data already exists.")

        connection.close()

        return


    foods = [

        (
            "Veg Pizza",
            "Cheesy pizza loaded with fresh vegetables.",
            299,
            "Pizza",
            "images/tandoori_pizza.jpg",
            5.0
        ),

        (
            "Chicken Burger",
            "Crispy chicken burger with cheese.",
            199,
            "Burger",
            "images/burger2.jpeg",
            5.0
        ),

        (
            "Chicken Biryani",
            "Hyderabadi dum biryani with raita.",
            349,
            "Biryani",
            "images/biryani2.webp",
            5.0
        ),

        (
            "Veg Noodles",
            "Spicy Chinese noodles with vegetables.",
            249,
            "Noodles",
            "images/hakka_noodles.webp",
            4.0
        ),

        (
            "Egg Noodles",
            "Spicy noodles with Egg.",
            349,
            "Noodles",
            "images/eggs_noodles.jpg",
            4.0
        ),

        (
            "White Sauce Pasta",
            "Creamy Italian pasta with herbs.",
            279,
            "Pasta",
            "images/white_pasta.jpg",
            5.0
        ),

        (
            "Veg Fried Rice",
            "Fresh vegetables tossed with rice.",
            229,
            "Rice",
            "images/Vegetable.jpeg",
            4.0
        ),

        (
            "Club Sandwich",
            "Triple-layer sandwich with fresh veggies.",
            179,
            "Sandwich",
            "images/club-sandwich.jpg",
            5.0
        ),

        (
            "Chicken Shawarma",
            "Juicy shawarma wrapped with mayonnaise.",
            249,
            "Shawarma",
            "images/chicken-shawarma.jpeg",
            5.0
        ),

        (
            "Gobi Manchurian",
            "Crispy cauliflower tossed in spicy sauce.",
            199,
            "Starters",
            "images/Gobi-Manchurian.jpeg",
            5.0
        ),

        (
            "Chocolate Ice Cream",
            "Rich chocolate ice cream with nuts.",
            299,
            "Desserts",
            "images/icecream.jpeg",
            5.0
        ),

        (
            "Brownie",
            "Warm chocolate brownie with ice cream.",
            149,
            "Desserts",
            "images/cake2.jpg",
            5.0
        ),

        (
            "Black Forest Cake",
            "Soft and creamy chocolate cake.",
            199,
            "Desserts",
            "images/choclate_cake.jpg",
            5.0
        ),

        (
            "Coca-Cola",
            "500ml chilled soft drink.",
            60,
            "Drinks",
            "images/coca_drink.avif",
            5.0
        ),

        (
            "Blue Mocktail",
            "Refreshing blue mocktail.",
            120,
            "Drinks",
            "images/Blue-mocktail.jpg",
            5.0
        ),

        (
            "Oreo Milkshake",
            "Cold and creamy Oreo milkshake.",
            180,
            "Drinks",
            "images/milkshake.jpeg",
            5.0
        )

    ]
    
    


    cursor.executemany("""
        INSERT INTO foods
        (
            name,
            description,
            price,
            category,
            image,
            rating
        )

        VALUES (?, ?, ?, ?, ?, ?)
    """, foods)
    cursor.execute("""
           UPDATE foods
           SET image = 'images/hakka_noodles.webp'
           WHERE name = 'Veg Noodles'
       """)
       
    cursor.execute("""
           UPDATE foods
           SET image = 'images/eggs_noodles.jpg'
           WHERE name = 'Egg Noodles'
       """)
       

    connection.commit()
    
    

    connection.close()

    print("✅ Initial food data inserted successfully!")


# =====================================================
# TEST DATABASE
# =====================================================

if __name__ == "__main__":

    print("Starting database setup...")

    create_tables()

    insert_initial_foods()

    print("✅ Database setup completed!")
    print("Database location:")
    print(DATABASE_PATH)


    