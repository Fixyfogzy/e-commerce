// Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
  const cartIcon = document.getElementById('cartIcon');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.querySelector('.cart-count');
  const addToCartBtn = document.querySelector('.add-to-cart');
  const quantityElement = document.getElementById('quantity');
  
  let cart = [];
  let currentQuantity = 1;

  // Toggle cart dropdown visibility
  cartIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Close cart when clicking outside
  document.addEventListener('click', function() {
    cartDropdown.style.display = 'none';
  });

  // Adjust quantity
  window.adjustQuantity = function(change) {
    currentQuantity += change;
    if (currentQuantity < 1) currentQuantity = 1;
    if (currentQuantity > 10) currentQuantity = 10;
    quantityElement.textContent = currentQuantity;
  };

  // Add item to cart
  window.addToCart = function() {
    const product = {
      name: document.querySelector('.product-title').textContent,
      price: document.querySelector('.current-price').textContent,
      quantity: currentQuantity,
      image: document.getElementById('mainImage').src
    };

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }

    updateCart();
    resetQuantity();
    showAddedToCartMessage();
  };

  // Update cart UI
  function updateCart() {
    // Update count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items list
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      return;
    }

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <p>${item.name}</p>
          <p>${item.price} x ${item.quantity} = <span>$${(parseFloat(item.price.replace('$','')) * item.quantity).toFixed(2)}</span></p>
        </div>
        <button class="remove-item" onclick="removeCartItem('${item.name}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');

    // Add checkout button
    cartItems.innerHTML += `
      <button class="checkout-btn">Checkout</button>
    `;
  }

  // Remove item from cart
  window.removeCartItem = function(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
  };

  // Reset quantity selector
  function resetQuantity() {
    currentQuantity = 1;
    quantityElement.textContent = '1';
  }

  // Show temporary "added to cart" message
  function showAddedToCartMessage() {
    const originalText = addToCartBtn.innerHTML;
    addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart!';
    addToCartBtn.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
      addToCartBtn.innerHTML = originalText;
      addToCartBtn.style.backgroundColor = '';
    }, 2000);
  }
});