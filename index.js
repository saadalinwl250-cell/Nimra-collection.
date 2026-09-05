// APNA WHATSAPP NUMBER YAHAN LIKHEIN (Country Code 92 ke sath, bina + ke)
const myPhoneNumber = "923495534491"; 

let cart = [];

// Welcome Screen Logic
const enterStoreBtn = document.getElementById('enter-store-btn');
const welcomeScreen = document.getElementById('welcome-screen');

if (enterStoreBtn && welcomeScreen) {
    enterStoreBtn.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
    });
}

// Add to Cart Logic
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        cart.push({ name, price });
        updateCartUI();
        alert(`${name} cart mein add ho gaya hai!`);
    });
});

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.length;
}

// Open Cart Modal
const cartBtn = document.getElementById('cart-btn');
const modal = document.getElementById('checkout-modal');
const closeModal = document.getElementById('close-modal');

if (cartBtn && modal) {
    cartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Aapka cart khali hai!');
            return;
        }

        const cartList = document.getElementById('cart-items-list');
        const cartTotal = document.getElementById('cart-total');
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            cartList.innerHTML += `<p style="text-align:left; margin:5px 0;">• ${item.name} - PKR ${item.price}</p>`;
        });

        cartTotal.innerText = total;
        modal.style.display = 'flex';
    });
}

if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Order Form Submit (WhatsApp Redirection)
const orderForm = document.getElementById('order-form');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        let itemsText = cart.map(i => `${i.name} (PKR ${i.price})`).join('%0A');
        let totalAmount = document.getElementById('cart-total').innerText;

        let message = `*Naya Order Received!*%0A%0A` +
                      `*Customer Name:* ${name}%0A` +
                      `*Phone:* ${phone}%0A` +
                      `*Address:* ${address}%0A%0A` +
                      `*Items:*%0A${itemsText}%0A%0A` +
                      `*Total Bill:* PKR ${totalAmount}`;

        let whatsappURL = `https://wa.me/${myPhoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
    });
}