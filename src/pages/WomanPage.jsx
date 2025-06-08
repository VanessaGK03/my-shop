import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import '../styles/Clothes.css';

const WomanPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const womanProducts = stored.filter(p => p.category === 'woman');
    setProducts(womanProducts);
  }, []);

  return (
    <div className="wrapper">
      <div className="filter-bar">
        <select className="custom-select">
          <option disabled selected>Category</option>
          <option>T-shirts</option>
          <option>Trousers</option>
          <option>Dresses</option>
        </select>
        <select className="custom-select">
          <option disabled selected>Size</option>
          <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
        </select>
        <div className="range-slider">
          <input type="range" id="range-min" min="0" max="500" value="100" />
          <input type="range" id="range-max" min="0" max="500" value="400" />
          <div className="slider-track"></div>
          <div className="price-labels">
            <span id="range-min-label">$100</span>
            <span id="range-max-label">$400</span>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="product-grid">
          {products.map(p => (
            <div key={p.id} className="clothing-item">
              <a href="/product-details" onClick={(e) => {
                e.preventDefault();
                localStorage.setItem('viewProductId', p.id);
                window.location = '/product-details';
              }}>
                <img src={p.image} alt={p.name} />
              </a>
              <div className="clothes-describe">
                <p className="clothes-name">{p.name}</p>
                <p className="clothes-price">${p.price.toFixed(2)}</p>
                <button className="buy-button">Buy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomanPage;

