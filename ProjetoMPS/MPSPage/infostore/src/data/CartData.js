var CartData = (function() {    
    var products = [];
    
    var getProducts = function() {
        return products;
    };

    var setProducts = function(productsData) {
        products = productsData;
    }
    
    return {
        getProducts: getProducts,
        setProducts: setProducts        
    }

})();


export default CartData;