import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import './WishList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

export default function WishList() {
  const data = useSelector((state) => state.products);


  useEffect(() => {
    const newYMIndex = document.title.indexOf('Y&M');
    const newTitle = `Wishlist−${document.title.slice(newYMIndex)}`;
    document.title = newTitle;
}, [document.title]);
  const wishlistProducts = data.filter((product) => product.wish);

  return (
    <div className='wish'>
      <Menu />
      <div className='title'>
        <h1>Wishlist</h1>
      </div>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>UNIT PRICE</th>
              <th>STOCK STATUS</th> 
            </tr>
          </thead>
          <tbody>
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.sold === false ? "In Stock" : "Out of Stock"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No products added to the wishlist</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
    <Footer/></div>
    </div>
  );
}
