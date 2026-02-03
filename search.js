// Search and Filter Functionality
class SearchManager {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'Sun flower',
                category: 'flowers',
                price: 10,
                image: 'images/sun flower.svg',
                description: 'sun lover flower',
                inStock: true,
                rating: 4.5,
                color: 'yellow'
            },
            {
                id: 2,
                name: 'White Rose',
                category: 'flowers',
                price: 15,
                image: 'images/White Rose.svg',
                description: 'premium white rose',
                inStock: true,
                rating: 4.8,
                color: 'white'
            },
            {
                id: 3,
                name: 'Daisy',
                category: 'flowers',
                price: 8,
                image: 'images/Daisy.svg',
                description: 'fresh daisy flower',
                inStock: true,
                rating: 4.3,
                color: 'white'
            },
            {
                id: 5,
                name: 'Dahlia',
                category: 'flowers',
                price: 18,
                image: 'images/dahlia.svg',
                description: 'elegant dahlia',
                inStock: true,
                rating: 4.7,
                color: 'pink'
            }
        ];
        
        this.filteredProducts = [...this.products];
        this.searchTerm = '';
        this.filters = {
            category: 'all',
            priceRange: 'all',
            color: 'all',
            inStock: 'all'
        };
        
        this.init();
    }

    init() {
        this.setupSearchUI();
        this.setupEventListeners();
        this.renderProducts();
    }

    setupSearchUI() {
        // Add search bar to header if not exists
        const headerContent = document.querySelector('.header-content');
        if (headerContent && !document.querySelector('.search-container')) {
            const searchHTML = `
                <div class="search-container">
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="Search flowers..." id="searchInput">
                        <button class="search-btn" id="searchBtn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                    </div>
                    <button class="filter-toggle-btn" id="filterToggleBtn">
                        <img src="images/Vector (9).svg" alt="Filter" width="16" height="16">
                        Filtering
                    </button>
                </div>
            `;
            
            // Insert search container after nav
            const nav = headerContent.querySelector('.nav');
            if (nav) {
                nav.insertAdjacentHTML('afterend', searchHTML);
            }
        }

        // Filter panel and overlay removed
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.applyFilters();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyFilters();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }
        
        // Filter panel toggle
        const filterToggleBtn = document.getElementById('filterToggleBtn');
        const filterPanel = document.getElementById('filterPanel');
        const closeFilterBtn = document.getElementById('closeFilterBtn');
        const filterOverlay = document.getElementById('filterOverlay');
        
        if (filterToggleBtn) {
            filterToggleBtn.addEventListener('click', () => {
                filterPanel.classList.add('show');
                filterOverlay.classList.add('show');
            });
        }
        
        if (closeFilterBtn) {
            closeFilterBtn.addEventListener('click', () => {
                filterPanel.classList.remove('show');
                filterOverlay.classList.remove('show');
            });
        }
        
        if (filterOverlay) {
            filterOverlay.addEventListener('click', () => {
                filterPanel.classList.remove('show');
                filterOverlay.classList.remove('show');
            });
        }
        
        // Filter controls
        const applyFiltersBtn = document.getElementById('applyFiltersBtn');
        const resetFiltersBtn = document.getElementById('resetFiltersBtn');
        
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                this.updateFiltersFromUI();
                this.applyFilters();
                filterPanel.classList.remove('show');
                filterOverlay.classList.remove('show');
            });
        }
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                this.resetFilters();
                filterPanel.classList.remove('show');
                filterOverlay.classList.remove('show');
            });
        }
    }

    updateFiltersFromUI() {
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const colorFilter = document.getElementById('colorFilter');
        const stockFilter = document.getElementById('stockFilter');
        
        if (categoryFilter) this.filters.category = categoryFilter.value;
        if (priceFilter) this.filters.priceRange = priceFilter.value;
        if (colorFilter) this.filters.color = colorFilter.value;
        if (stockFilter) this.filters.inStock = stockFilter.value;
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            if (this.searchTerm && !product.name.toLowerCase().includes(this.searchTerm) && 
                !product.description.toLowerCase().includes(this.searchTerm)) {
                return false;
            }
            
            // Category filter
            if (this.filters.category !== 'all' && product.category !== this.filters.category) {
                return false;
            }
            
            // Price filter
            if (this.filters.priceRange !== 'all') {
                const [min, max] = this.filters.priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
                if (product.price < min || product.price > max) {
                    return false;
                }
            }
            
            // Color filter
            if (this.filters.color !== 'all' && product.color !== this.filters.color) {
                return false;
            }
            
            // Stock filter
            if (this.filters.inStock === 'in-stock' && !product.inStock) {
                return false;
            }
            if (this.filters.inStock === 'out-of-stock' && product.inStock) {
                return false;
            }
            
            return true;
        });
        
        this.renderProducts();
        this.showResults();
    }

    resetFilters() {
        this.searchTerm = '';
        this.filters = {
            category: 'all',
            priceRange: 'all',
            color: 'all',
            inStock: 'all'
        };
        
        // Reset UI
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const colorFilter = document.getElementById('colorFilter');
        const stockFilter = document.getElementById('stockFilter');
        
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        if (priceFilter) priceFilter.value = 'all';
        if (colorFilter) colorFilter.value = 'all';
        if (stockFilter) stockFilter.value = 'all';
        
        this.filteredProducts = [...this.products];
        this.renderProducts();
        this.showResults();
    }

    renderProducts() {
        const productsGrid = document.querySelector('.top-seller-grid');
        if (!productsGrid) return;
        
        if (this.filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results">
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = this.filteredProducts.map(product => `
            <div class="seller-card">
                <div class="seller-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="seller-info">
                    <h3 class="seller-name">${product.name}</h3>
                    <div class="seller-price-row">
                        <p class="seller-price">$${product.price}</p>
                        <button class="seller-btn-text btn-add-cart" 
                                data-product-id="${product.id}" 
                                data-product-name="${product.name}" 
                                data-product-price="${product.price}" 
                                data-product-image="${product.image}">
                            <img src="images/corzina.svg" alt="Cart" class="cart-icon">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Re-initialize cart functionality for new products
        this.reinitializeCart();
    }

    reinitializeCart() {
        // Re-add event listeners to new add to cart buttons
        const addToCartBtns = document.querySelectorAll('.btn-add-cart');
        addToCartBtns.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });
        
        const newAddToCartBtns = document.querySelectorAll('.btn-add-cart');
        newAddToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const product = {
                    id: parseInt(btn.dataset.productId),
                    name: btn.dataset.productName,
                    price: parseFloat(btn.dataset.productPrice),
                    image: btn.dataset.productImage,
                    description: `${btn.dataset.productName.toLowerCase()} flower`
                };
                if (window.cartManager) {
                    window.cartManager.addToCart(product);
                }
            });
        });
    }

    showResults() {
        const resultsCount = this.filteredProducts.length;
        const totalCount = this.products.length;
        
        // Update or create results message
        let resultsMessage = document.querySelector('.search-results-message');
        if (!resultsMessage) {
            const topSellerSection = document.querySelector('.top-seller-section');
            if (topSellerSection) {
                const resultsHTML = `<div class="search-results-message"></div>`;
                topSellerSection.insertAdjacentHTML('afterbegin', resultsHTML);
                resultsMessage = document.querySelector('.search-results-message');
            }
        }
        
        if (resultsMessage) {
            if (this.searchTerm || this.filters.category !== 'all' || this.filters.priceRange !== 'all') {
                resultsMessage.innerHTML = `<p>Found ${resultsCount} of ${totalCount} products</p>`;
                resultsMessage.style.display = 'block';
            } else {
                resultsMessage.style.display = 'none';
            }
        }
    }
}

// Initialize search manager
document.addEventListener('DOMContentLoaded', () => {
    window.searchManager = new SearchManager();
});
