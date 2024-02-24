import React, { useEffect, useState } from 'react'
import './Reviews.css'
import { useSelector } from 'react-redux'

export default function Reviews() {
    const [reviews, setReviews] = useState([])
    const products = useSelector((state) => state.products)

    useEffect(() => {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/reviews')
        .then((res) => res.json())
        .then((data) => {
            setReviews(data)
        })
    })
  return (
    <div className='container review-section'>
        <div className='row'>
            <div className='col-12'>
            <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Client</th>
                                <th>Product</th>
                                <th>Review</th>
                                <th>Review Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                        {reviews.length > 0 ? reviews
                        .map((rev, i) => (
                            <tr key={i}>
                                <td>{rev.id}</td>
                                <td>{rev.clientName}</td>
                                <td>{products.find((prod) => prod.id === rev.productId).name}</td>
                                <td>{rev.reviewContent}</td>
                                <td style={{color:'#bf402e', fontSize:'20px', fontFamily:'Ionicons', letterSpacing:'.3em'}}>{'★'.repeat(rev.rateValue)}{'☆'.repeat(5 - rev.rateValue)}</td>
                            </tr>
                        )) : <h2>No Reviews for now</h2>}
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
  )
}
