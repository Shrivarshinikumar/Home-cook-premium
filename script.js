const menuItemsContainer = document.getElementById('menuItems');
const cartItemsContainer = document.getElementById('cartItems');
const totalEl = document.getElementById('total');

let menuItems = [
    { name: "Gourmet Burger", price: 15, img: "IMG/burger.jpg" },
    { name: "Vegan Bowl", price: 12, img: "IMG/vegan-bowl.jpg" },
    { name: "Loaded Fries", price: 7, img: "IMG/loaded-fries.jpg" },
    { name: "Avocado Toast Deluxe", price: 14, img: "IMG/avocado-toast.jpg" },
    { name: "Spicy Fried Chicken", price: 16, img: "IMG/fried-chicken.jpg" },
    { name: "Cheese Pizza", price: 13, img: "IMG/pizza.jpg" }
];


let cart = [];

function displayMenu() {
    menuItemsContainer.innerHTML = '';
    menuItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        menuItemsContainer.appendChild(card);
    });
}

function addToCart(index) {
    cart.push(menuItems[index]);
    updateCart();
}

function updateCart() {
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = 'Your cart is empty.';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, i) => {
            const div = document.createElement('div');
            div.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${i})">Remove</button>`;
            cartItemsContainer.appendChild(div);
        });
    }
    totalEl.textContent = cart.reduce((sum, item) => sum + item.price, 0);
}

function removeFromCart(i) {
    cart.splice(i, 1);
    updateCart();
}

function checkout() {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert(`Order placed successfully! Total: $${cart.reduce((sum, item) => sum + item.price, 0)}`);
    cart = [];
    updateCart();
}

// Chef dashboard form
const chefForm = document.getElementById('chefForm');
chefForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('dishName').value;
    const price = parseFloat(document.getElementById('dishPrice').value);
    const img = document.getElementById('dishImage').value;
    menuItems.push({ name, price, img });
    displayMenu();
    chefForm.reset();
});

function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// Initial display
displayMenu();
updateCart();
