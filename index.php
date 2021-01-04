<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Portfolio Price Tracker HTML Widget builder</title>
</head>
<body>
    
    <form action="" method="post">
    <p>Search</p>
    <label for="search">Search</label>
    <input type="text">
    <p>Fields - Name,Quantity, Purchase Price, Price, Cost, Market Value, Return, %Return</p>
    <input type="checkbox" id="name" name="name" value="Name">
    <label for="Name"> Name </label><br>
    
    <input type="checkbox" id="quantity" name="quantity" value="Quantity">
    <label for="Quantity"> Quantity</label><br>

    <input type="checkbox" id="purchase-price" name="purchase-price" value="Purchase Price">
    <label for="Purchase Price">Purchase Price</label><br>

    <input type="checkbox" id="price" name="price" value="Price">
    <label for="Price">Price</label><br>

    <input type="checkbox" id="cost" name="cost" value="Cost">
    <label for="Cost">Cost</label><br>

    <input type="checkbox" id="market-value" name="market-value" value="Market Value">
    <label for="Market Value">Market Value</label><br>

    <input type="checkbox" id="return" name="return" value="Return">
    <label for="Return">Return</label><br>

    <input type="checkbox" id="percentage-return" name="percentage-return" value="percentage-return">
    <label for="Percentage Return"> % Return</label><br>
    <p>Rows per page</p>
    <label for="rows">Rows per page:</label>
    <input list="rows" name="rows" id="row">

    <datalist id="rows">
    <option value="10">
    <option value="20">
    <option value="30">
    <option value="40">
    <option value="50">
    </datalist>
    <p>Sort Field</p>
    <label for="sorting">Sort by:</label>
    <input list="sorting-list" name="sorting" id="sort">

    <datalist id="sorting-list">
    <option value="Name">
    <option value="price">
    <option value="Market Value">
    <option value="Cost">
    <option value="50">
    </form>
    <p>Add Row for the coin bought at</p>
    
    
    
    <p>Sort Direction</p>
    <p>Color</p>
    <p>Extra CSS TABLE STLES</p>
    <p>Pagination</p>
    <script src="./JavaScript/main.js"></script>
</body>
</html> 