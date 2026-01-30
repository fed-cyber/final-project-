const products = [
    {
        id: 1,
        name: "Running Shoes",
        category: "running",
        price: 1200,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Casual Sneakers",
        category: "casual",
        price: 850,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Formal Shoes",
        category: "formal",
        price: 1500,
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Sports Shoes",
        category: "running",
        price: 1100,
        image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        name: "Leather Shoes",
        category: "formal",
        price: 1800,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        name: "Everyday Sneakers",
        category: "casual",
        price: 750,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(span => {
        span.textContent = count;
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    showCart();
}

function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
    } else {
        let total = 0;
        cartItems.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            return `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <p>${item.price} Birr × ${item.quantity}</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="btn" style="background:#dc3545;">Remove</button>
                </div>
            `;
        }).join('');
        
        cartTotal.textContent = total;
    }
    
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('cartModal');
    if (modal) modal.style.display = 'none';
}

function loadFeaturedProducts() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    
    grid.innerHTML = products.slice(0, 3).map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} Birr</div>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function loadAllProducts() {
    const container = document.querySelector('.products-container');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} Birr</div>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    const category = document.getElementById('categoryFilter')?.value;
    const sort = document.getElementById('sortFilter')?.value;
    
    let filtered = [...products];
    
    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (sort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }
    
    const container = document.querySelector('.products-container');
    if (container) {
        container.innerHTML = filtered.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">${product.price} Birr</div>
                    <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill all required fields');
                return;
            }
            
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMsg.style.display = 'none';
            }, 5000);
        });
    }
}

function setupMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Load products based on page
    if (document.querySelector('.products-grid')) {
        loadFeaturedProducts();
    }
    
    if (document.querySelector('.products-container')) {
        loadAllProducts();
        setupFilters();
    }
    
    // Cart modal
    document.querySelectorAll('.cart-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showCart();
        });
    });
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Contact form
    setupContactForm();
    
    // Mobile menu
    setupMobileMenu();

});
