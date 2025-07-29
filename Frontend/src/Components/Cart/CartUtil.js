export const calculateTotalAmount = (cartItems = []) => {
    let price = 0, discount = 0;
    
    if (Array.isArray(cartItems)) {
      cartItems.forEach(item => {
        price += item.price.mrp || 0;  // Safeguard in case item.price.mrp is undefined
        discount += (item.price.mrp - item.price.cost) || 0;  // Safeguard in case item.price.cost is undefined
      });
    }
  
    return { price, discount };
  };
  