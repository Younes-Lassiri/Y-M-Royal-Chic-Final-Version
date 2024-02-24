import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import './Shop.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_REVIEW, ADD_TO_CART, ADD_WISH_PRODUCT, HIDE_VIEW, REMOVE_WISH_PRODUCT, VIEW_PRODUCT } from '../redux/actions/actions';
import { ADD_SINGLE_QUANTITE } from '../redux/actions/actions';
import { MINUCE_SINGLE_QUANTITE } from '../redux/actions/actions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bag from './myImages/shopping-bag-svgrepo-com.png';
import bagHovered from './myImages/shopping-bag-svgrepo-com (1).png';
import viewImg from './myImages/view-svgrepo-com.png'
import hoverImg from './myImages/view-svgrepo-com (1).png'

import { FaStar } from "react-icons/fa";

import axios
 from 'axios';

import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Shop() {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [initialStyle, setInitialStyle] = useState({});
  useEffect(() => {
    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/products')
    .then((res) => res.json())
    .then((data) => {
      setRelatedProducts(data)
    })
  }, [])


  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }


  useEffect(() => {
    console.log(currentValue)
  }, [currentValue])


  
  const [reviewLength, setReviewLength] = useState(0)
const [relatedReview, setRelatedReview] = useState([])

  
const [clicked, setClicked] = useState(false);
const [heartClickedIndices, setHeartClickedIndices] = useState([]);

  const [clientName, setClientName] = useState("");
  const [review, setReview] = useState("");

const [liVisited, setLiVisited] = useState('one')


  const [selectedContent, setSelectedContent] = useState("description")
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);




useEffect(() => {
  console.log(review)
}, [review])



  

  function effect() {
    let images = document.querySelectorAll('.effect');
    let secondImg = document.querySelector('.secondImg');

    let clicked = false;

    images.forEach((image, i) => {
      image.addEventListener('click', function () {
        images.forEach((img) => img.classList.remove('clicked'));
        image.classList.add('clicked');

        secondImg.style.transform = image.style.transform;

        clicked = true;
      });

      if (i === 0 && !clicked) {
        setInitialStyle({});
      }
    });
  }
  








 
  

  
  const products = useSelector((state) => state.products);
  const { name } = useParams();

  const viewedProduct = useSelector((state) => state.viewedProduct)
  const [linkHovered, setLinkHovered] = useState("")

  useEffect(() => {
    const newYMIndex = document.title.indexOf('Y&M');
    const newTitle = `${name} - ${document.title.slice(newYMIndex)}`;
    document.title = newTitle;
}, [name]);


  const product = products.find((product) => product.name === name.split('-').join(' '));

  useEffect(() => {
    if (product) {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/reviews')
        .then((res) => res.json())
        .then((data) => {
            const filteredReviews = data.filter(review => review.productId === product.id);
            setReviewLength(filteredReviews.length);
            setRelatedReview(filteredReviews)
        })
    }
}, [product]);


  useEffect(() => {
    effect(); 
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }


  
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month.toUpperCase()}, ${year}`;
  }


  function addToWish(productId, index) {
    setClicked(!heartClickedIndices.includes(index));
    if (!heartClickedIndices.includes(index)) {
      dispatch({ type: ADD_WISH_PRODUCT, payload: productId });
      setHeartClickedIndices((prevIndices) => [...prevIndices, index]);
      toast.success(`${product.name} added to Wishlist`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      removeWish(productId);
      setHeartClickedIndices((prevIndices) => prevIndices.filter((i) => i !== index));
      toast.error(`${product.name} removed from Wishlist`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  function removeWish(productId) {
    if (clicked) {
      dispatch({ type: REMOVE_WISH_PRODUCT, payload: productId });
    }
  }
  
  




  const handleSubmitReview = async (event) => {
    event.preventDefault();

    const body = {
        productId: product.id, 
        clientName: clientName, 
        reviewContent: review,
        rateValue: currentValue,
    };
    console.log(body)

    try {
        const response = await fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Error adding review');
        }

        const data = await response.json();
        console.log('Review sent successfully:', data);

        toast.success("Thank you for your review! Your review has been sent successfully.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(function(){window.location.reload()}, 2000)


    } catch (error) {
        console.error('Error adding order:', error);
    }
};

function reviewForm(){
  const styles = {
    stars: {
      display: "flex",
      flexDirection: "row",
      padding:'15px 0'
    }
  
  };
  const colors = {
    orange: "#bf402e",
    grey: "#a9a9a9"
    
};
  return(
    <div>
<h5 style={{color:'#000009', fontSize:'1.5rem', fontWeight:500, fontFamily:'"Source Serif Pro",serif'}}>{reviewLength} review for {product.name}</h5>
<div className='reviews-section container'>
  {relatedReview.map(function(review, i){
    return(
      <div className='row' style={{padding:'30px 0'}}>
        <div className='col-1' style={{textAlign:'left', padding:'0'}}><img src='https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/blog-user-2-100x100.jpg' style={{width:'112px', height:'112px'}}/></div>
        <div className='col-11' style={{padding:'0 35px'}}>
          <span style={{color:'#bf402e', fontSize:'20px', fontFamily:'Ionicons', letterSpacing:'.3em'}}>{'★'.repeat(review.rateValue)}{'☆'.repeat(5 - review.rateValue)}</span><br></br>
          <span style={{color:'#928c81', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:'11px', letterSpacing:'.16em', lineHeight:'1.63em', textTransform:'uppercase'}}>
  {formatDate(review.created_at)}
</span>
<h4 style={{color:'#2e2e2d',fontWeight:400, fontSize:'24px', lineHeight:'1.1em'}}>{review.clientName}</h4>
<p style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro",serif', fontWeight:400, lineHeight:'1.63em'}}>
  {review.reviewContent}
</p>


        </div>
      </div>
    )
  })}
</div>
<span style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro",serif', fontWeight:400, lineHeight: '1.63em'}}>Add a review</span><br></br>
<span style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro",serif', fontWeight:400, lineHeight: '1.63em'}}>Your email address will not be published. Required fields are marked *</span><br></br>
<span style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro",serif', fontWeight:400, lineHeight: '1.63em'}}>Your rating *</span><br></br>

<div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={18}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 7,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>


<form onSubmit={handleSubmitReview}>
<label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Your review *</label><br></br>
<textarea style={{width:'100%',height:'30vh', background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', outline:'none'}} onChange={(e) => setReview(e.target.value)}/><br></br>
<label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Name *</label><br></br>
<input type='text' style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}} onChange={(e) => setClientName(e.target.value)}/><br></br>
<label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Email *</label>
<input type='email' style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}}/><br></br>
<button type='submit' style={{padding:'14px 45px', color:'#000009', fontWeight:200, background:'transparent', border:'1px solid #000009',margin:'40px 0'}} className='review-btn'>Submit</button>
</form>
</div>
  )
}

function description(){
  return(
    <p style={{color:'#727272', fontSize:'16px', fontWeight:300, fontFamily:'"Source Serif Pro",serif'}}>
      Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis 
      in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix a
      periri consequat an. Eius lorem tincidunt vix at, vel pertinax sensibus id, error
       epicurei mea et. Mea facilisis urbanitas moderatius id. Vis ei rationibus definiebas,
       eu qui purto zril laoreet. Ex error omnium interpretaris pro, alia illum ea vim.
    </p>
  )
}

function infos(){
  return(
    <p style={{color:'#727272', fontSize:'16px', fontWeight:300, fontFamily:''}}>
      <div className='infos'>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '16px', fontFamily: '"Source Serif Pro",serif', fontWeight: '500' }}>
                    SKU: 00{product.id}
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '16px', fontFamily: '"Source Serif Pro",serif', fontWeight: '500' }}>
                    CATEGORY: Creative
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '16px', fontFamily: '"Source Serif Pro",serif', fontWeight: '500' }}>
                    TAGS: Brand, New, Silver
                  </span>
                  <br></br>
                </div>
    </p>
  )
}

const renderContent = () => {
  switch (selectedContent) {
    case 'reviewForm':
      return reviewForm();
    case 'description':
      return description();
    case 'infos':
      return infos();
    default:
      return null;
  }
};
  
function addToCart(){
  dispatch({ type: ADD_TO_CART, payload: product.id })
  toast.success(`${product.name} added to Cart`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }

  function addToCartRela(){
    dispatch({ type: ADD_TO_CART, payload: viewedProduct[0].id })
    toast.success(`${viewedProduct[0].name} added to Cart`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }

  function two(){
    setSelectedContent("infos")
    setLiVisited("two")
  }
  

  function one(){
    setSelectedContent("description")
    setLiVisited("one")
  }

  function three(){
    setSelectedContent("reviewForm")
    setLiVisited("three")
  }


  return (
    <div className='shop'>
      <Menu />
      {viewedProduct.length === 0? <ToastContainer />: null}
      <div className='title'>
        <h1>Shop</h1>
      </div>
      <div className='container h-100' style={{ marginTop: '150px' }}>
        <div className='row'>
          <div className='col-lg-2 col-12 text-center mb-3 mb-lg-0 order-lg-1 order-2' style={{ height: '95vh', position: 'relative' }}>
            
            <div
              className='raraa'
              style={{
                height: '30vh',
                textAlign: 'center',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '0',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                src={product.thumbnail}
                style={{ width: '100%', height: '100%', transform: 'scale(2.5) translateX(-40px)' }}
                className='effect clicked'
              />
            </div>
            <div
              className='raraa twoo'
              style={{
                height: '30vh',
                textAlign: 'center',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '30vh',
                marginTop: '13px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                src={product.thumbnail}
                style={{ width: '100%', height: '100%', transform: 'scale(2.7) translateX(-5px)' }}
                className='effect'
              />
            </div>
            <div
              className='raraa'
              style={{
                height: '30vh',
                textAlign: 'center',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '60vh',
                marginTop: '26px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img src={product.thumbnail} style={{ width: '100%', height: '100%' }} className='effect' />
            </div>
          </div>
          <div className='col-lg-5 col-12 uu order-1' style={{ height: '95vh', position: 'relative' }}>
            <div className='' style={{ height: '99%', overflow: 'hidden', cursor: 'crosshair' }}>
              <img src={product.thumbnail} style={{ height: '100%', width: '100%', ...initialStyle }} className='secondImg' />

              {product.new && <div className='new'>NEW</div>}
              {product.promo && (
                <>
                  <div className='promo'>-{product.promoValue}%</div>
                  <div className='oldPrice'>${product.oldPrice}</div>
                </>
              )}
              {product.sold && <div className='sold'>SOLD</div>}
            </div>
          </div>
          <div className='col-lg-5 col-12 h-100 second order-3' style={{ padding: '0 35px', position: 'relative' }}>
            <div className='hideView'>
              <h1 style={{ fontSize: '40px', color: '#2e2e2d', fontWeight: 400, marginTop: '-10px' }}>{product.name}</h1>
            </div>
            <span style={{ fontSize: '22px', color: '#727272' }}>${product.price}</span>
            <br></br>
            {relatedReview.length > 0 && (
    <span style={{ color: '#bf402e', fontSize: '25px', letterSpacing: '10px' }}>
        {'★'.repeat(relatedReview[relatedReview.length - 1].rateValue)}
        {'☆'.repeat(5 - relatedReview[relatedReview.length - 1].rateValue)}
    </span>
)}
            <span style={{ fontSize: '16px', paddingLeft: '20px', color: '#727272' }}>({reviewLength} customer review)</span>
            <br></br>
            <p
              className='view-para'
              style={{
                padding: '30px 0',
                fontSize: '20px',
                color: '#727272',
              }}
            >
              Alie num phaed rum torquatos nec eu, vis detraxit per iculis ex, nihil expete ndis in mei. Mei an per icula
              eurip idis, hinc ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem ipsum dolor sit.
            </p>
            <br></br>
            {product.sold ? (
              <>
                <span className='yaya' style={{ cursor: 'auto', padding: '25px 0' }}>
                  OUT OF STOCK
                </span>
                <br></br>
                <div style={{ margin: '30px 0' }}>
                  <span onClick={() => dispatch({ type: ADD_WISH_PRODUCT, payload: product.id })}>
                    <a className='yaya' style={{textDecoration:'none'}}>ADD TO WISHLIST</a>
                  </span>
                </div>
                <br></br>
                <div className='infos'>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    SKU: 00{product.id}
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    CATEGORY: Creative
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    TAGS: Brand, New, Silver
                  </span>
                  <br></br>
                </div>
              </>
            ) : (
              <div className='shopOperation'>
                <div
                  className=''
                  style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px', marginBottom: '20px' }}
                >
                  <span style={{ color: '#727272', letterSpacing: '.2rem', fontSize: '17px' }}>Quantite</span>
                  <span
                    style={{
                      fontSize: '15px',
                      padding: '0px',
                      color: '#727272',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      style={{ color: '#727272', backgroundColor: 'transparent', fontWeight: 'bold', border: 'none', fontSize: '25px' }}
                      onClick={() => {dispatch({type:MINUCE_SINGLE_QUANTITE,payload:product.id})}}>
                      ‹
                    </button>
                    <span style={{ marginTop: '2px' }}>{product.quantite}</span>
                    <button
                      style={{ color: '#727272', backgroundColor: 'transparent', fontWeight: 'bold', border: 'none', fontSize: '25px' }}
                    onClick={() => {dispatch({type:ADD_SINGLE_QUANTITE,payload:product.id})}}>
                      ›
                    </button>
                  </span>
                  <button className='botonaa' onClick={() => addToCart()}>
                    Add to cart
                  </button>
                </div>
                <span onClick={() => addToWish(product.id)}>
                  <a className='yaya' style={{textDecoration:'none'}}>ADD TO WISHLIST</a>
                </span>
                <br></br>
                <div className='infos' style={{ marginTop: '35px' }}>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    SKU: 00{product.id}
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    CATEGORY: Creative
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    TAGS: Brand, New, Silver
                  </span>
                  <br></br>
                </div>
              </div>
            )}
          </div>
          
        </div>


        

      </div>
      <div className='product-informations container' style={{padding:'60px 0'}}>
          <ul className='product-informations container-navbar' style={{display:'flex', gap:'50px', marginLeft:'-32px', alignItems:'center'}}>
            <li style={{color:'#727272', fontSize:'0.9rem', fontWeight:300, fontFamily:'monospace', cursor:'pointer', letterSpacing:'.2em', listStyleType:'none'}} onClick={() => one()} className={liVisited === "one"? "visited-review visited-review-one" :"visited-review" }>Description</li>

            <li style={{color:'#727272', fontSize:'0.9rem', fontWeight:300, fontFamily:'monospace', cursor:'pointer', letterSpacing:'.2em', listStyleType:'none'}}
             className={liVisited === "two"? "visited-review visited-review-two" :"visited-review" } onClick={() => two()}>ADDITIONAL INFORMATION</li>

            <li style={{color:'#727272', fontSize:'0.9rem', fontWeight:300, fontFamily:'monospace', cursor:'pointer', letterSpacing:'.2em', listStyleType:'none'}} onClick={() => three()}  className={liVisited === "three"? "visited-review visited-review-three" :"visited-review" }>REVIEWS ({reviewLength})</li>
          </ul>
          <p style={{padding:'25px 0'}}>
         {renderContent()}
          </p>
          <h2 style={{color:'2e2e2d', lineHeight:'1.2em', fontWeight: 400, fontFamily:'"EB Garamond",serif'}}>Related products</h2>
          <div className='relatedProducts container' style={{padding:'40px 0', display:'flex', justifyContent:'center'}}>
            <div className='row'>
            {relatedProducts.slice(0, 3).map((productRela, index) => (
          
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 carde" key={index} title={productRela.name}>
            
            <img src={productRela.thumbnail} alt="" />
            <Link to={`/product/${productRela.name.split(' ').join('-')}`}><div className="price">${productRela.price}</div></Link>
            
            


            <Link to='/cart'><div className='divHeart' onMouseEnter={() => setClicked(true)} onMouseLeave={() => setClicked(false)}>
      <img src={clicked ? bagHovered : bag} alt="Image"/>
    </div></Link>


            <div className='divView' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={isHovered ? hoverImg : viewImg} alt="Image" onClick={() => {dispatch({type:VIEW_PRODUCT,payload:{id:productRela.id,name:productRela.name,thumbnail:productRela.thumbnail,price:productRela.price,promo: productRela.promo,isNew: productRela.isNew,sold: productRela.sold,wish: productRela.wish,quantite: productRela.quantite}})}}/>
    </div>



            <div className="name"><Link to={`/product/${productRela.name.split(' ').join('-')}`}>{productRela.name}</Link></div>
            {productRela.isNew ? <div className='new'>NEW</div> : null}
            {productRela.promo ? (
  <>
    <div className='promo'>-{productRela.promoValue}%</div>
    <div className='oldPrice'>${productRela.oldPrice}</div>
  </>
) : null}
            {productRela.sold ? <div className='sold'>SOLD</div> : null}

            <Link to={`/product/${productRela.name.split(' ').join('-')}`}><div className='add'></div></Link>
          </div>
          
        ))}
            </div>
            {viewedProduct.length > 0 ? (
  <div className='viewProduct'>
    <div className='container h-100'>
    <div className="row h-100">
        <div className="col-md-5 h-100 col-12" style={{padding:0,overflow:'hidden'}}>
            <img src={viewedProduct[0].thumbnail} className='h-100 w-100 haha' alt="Viewed Product"/>
        </div>
        <div className="col-md-7 bg-light h-100 col-12 second" style={{padding:'75px 40px',position:'relative'}}>
        <div onClick={() => {dispatch({type:HIDE_VIEW})}}><ToastContainer /></div>
          <div className='hideView'>
            <h3 style={{fontSize:'40px',color:'#2e2e2d',fontWeight:400, fontFamily:'"EB Garamond",serif', lineHeight:'1em'}}>{viewedProduct[0].name}</h3>
            <button style={{position:'absolute',top:'30px',right:'30px'}} onClick={() => {dispatch({type:HIDE_VIEW})}}></button>
            </div>
            <span style={{fontSize:'19px',color:'#727272', fontWeight:300}}>${viewedProduct[0].price}</span><br></br>
            <span style={{color:'#bf402e', fontSize:'21px', fontFamily:'Ionicons', letterSpacing:'.3em'}}>★★★★★</span><br></br>
            <p className='view-para' style={{padding:'15px 0 0  0',fontSize:'17px',color:'#727272'}}>Alie num phaed rum torquatos nec eu, vis detraxit per 
              iculis ex, nihil expete ndis in mei. Mei an per icula 
              eurip idis, hinc ei est. Eos ei nisl graecis, vix aperiri 
              consequat an. Eius lorem ipsum dolor sit.</p><br></br>
              <div className='viewOperation' style={{display:'flex',justifyContent:'start',alignItems:'center',gap:'20px',marginBottom:'30px'}}>
              <span style={{color:'#727272',letterSpacing:'.22em',fontSize:'14px', fontFamily:'Montserrat,sans-serif', fontWeight:500}}>Quantity</span>
                        <div className=''>
                          <button style={{color:'#727272',backgroundColor:'transparent',fontWeight:'bold',border:'none',fontSize:'20px',color:'#727272'}} onClick={() => {dispatch({type:MINUCE_SINGLE_QUANTITE,payload:viewedProduct[0].id})}}>‹</button>
                          <span style={{fontSize:'15px',padding:'0px 7px',color:'#727272'}}>{viewedProduct[0].quantite}</span>
                          <button style={{color:'#727272',backgroundColor:'transparent',fontWeight:'bold',border:'none',fontSize:'20px',color:'#727272'}} onClick={() => {dispatch({type:ADD_SINGLE_QUANTITE,payload:viewedProduct[0].id})}}>›</button>
                        </div>
                        <button className='botona' onClick={() => addToCartRela()}>Add to cart</button>
              </div>
              <span onClick={() => addToWish(viewedProduct[0].id)}><a className='yaya' style={{textDecoration:'none'}}>ADD TO WISHLIST</a></span>
        </div>
    </div>
</div>

    
  </div>
) : null}
          </div>

        </div>
      
      <Footer />
    </div>
  );
}
