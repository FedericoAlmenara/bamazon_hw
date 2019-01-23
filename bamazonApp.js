var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password:"Badgerman4161",
    database: "bamazon_db"

})

connection.connect(function(err){
    if (err){
        console.error("error: " + err.stack);
    }
    loadProducts();
})

function loadProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        promptCustForProd(res);
    });
}

function promptCustForProd(inventory){
    inquirer
        .prompt([
            {
                type: "input",
                name: "choice",
                message: "What is the ID of the product you'd like to buy? [quit with q]",
                validate: function(val){
                    return !isNaN(val) || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function(val){
            checkIfShouldExist(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);

            if (product){
                promptCustometForQuantity(product);
            }
            else {
                console.log(`We dont have any of that product.`)
                loadProducts();
            }
        });
}

function promptCustometForQuantity(product){
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "how many would you like? insert a number",
                validate: function(val){
                    return val > 0 || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function(val){
            checkIfShouldExist(val.quantity);
            var quantity = parseInt(val.quantity);

            if (quantity > product.stock){
                console.log("Not enough quantity to fulfill yout order");
                loadProducts();
            }
            else{
                purchase(product, quantity);
            }

        });
}

function purchase(product, quantity){
    connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [quantity, product.id],
        function(err, res){
            console.log(`Success you purchased ${quantity} ${product.item_name}'s!`);
            loadProducts();
        }
    )
}

function checkInventory(choiceId, inventory){
    for (let i = 0; i < inventory.length; i++) {
       if (inventory[i].id === choiceId){
           return inventory[i];
       };
        
    }
    return null;
}

function checkIfShouldExist(choice) {
    if (choice.toLowerCase() === "q") {
      // Log a message and exit the current node process
      console.log("Goodbye!");
      process.exit(0);
    }
  }
  