import React from 'react'
import './Products.css'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Products() {


    function deleteProduct(productId) {
        const url = 'https://royalchicapi-cc1c56c683bf.herokuapp.com/api/products';
      
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: productId }) 
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          toast.error('Product deleted successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setTimeout(function(){window.location.reload()},1000)
          return response.json(); 
        })
        .then(data => {
          console.log(data.message); 
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
      }
      
    const products = useSelector((state) => state.products)
  return (
    <div className='container products-section'>
        <ToastContainer />
        <div className='row'>
            <div className='col-12'>
            <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>New</th>
                                <th>Promo Value</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.length > 0 ? products
                        .map((prod, i) => (
                            <tr key={i}>
                                <td>{prod.id}</td>
                                <td>{prod.name}</td>
                                <td style={{ color: 'green' }}>${prod.price.toLocaleString('en-US')}</td>
                                <td>{prod.isNew? "True" : "False"}</td>
                                <td>{prod.promoValue? "True" : "False"}</td>
                                <td style={{cursor:'pointer'}} onClick={() => deleteProduct(prod.id)}><i class='bx bx-x'></i></td>
                            </tr>
                        )) : <h2>No Products for now</h2>}
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
  )
}
