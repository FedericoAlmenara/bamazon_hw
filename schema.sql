
DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock INT NOT NULL
);

INSERT INTO products (item_name, department_name, price, stock) VALUES
("Adidas Track Pants", "Athletics", 50.00, 20), ("Candles", "Shop", 10.00, 20), ("Cat Food", "Pet Shop", 13.00, 20),
("Dog food", "Pet Shop", 20.00, 15), ("Sony Headphones", "Electronics", 120.00, 30), ("Fortnite Dance Compilation Part 1", "Shop", 1.00, 15),("Fortnite Dance Compilation Part 2", "Shop", 2.00, 5),
("Fortnite Dance Compilation Part 3", "Shop", 4.00, 10), ("Fortnite Dance Compilation Part 4", "Shop", 5.00, 6)