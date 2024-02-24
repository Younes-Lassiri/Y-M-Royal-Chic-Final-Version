import { FETCH_DATA, ADD_TO, ADD_WISH_PRODUCT, REMOVE_WISH_PRODUCT, ADD_TO_CART, REMOVE_CART, ADD_QUANTITE, MINUCE_QUANTITE, REMOVE_TRASH, VIEW_PRODUCT, HIDE_VIEW, ADD_SINGLE_QUANTITE, MINUCE_SINGLE_QUANTITE, ADD_REVIEW } from "../actions/actions";

const ShopReducer = (state = { products: [], wishProductQuantite: 0, cart: [], cartProductQuantite:0,trash:[],viewed:false,viewedProduct:[]}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, products: action.payload };
    case ADD_TO:
      return { ...state, products: [...state.products], wishProductQuantite: state.wishProductQuantite + 1 };
    case ADD_WISH_PRODUCT:
      return { 
        ...state,
        products: state.products.map((pro) =>
          pro.id === action.payload ? { ...pro, wish: true } : pro
        ),
        wishProductQuantite: state.wishProductQuantite + 1,
      };
    case REMOVE_WISH_PRODUCT:
      return {
        ...state,
        products: state.products.map((pro) =>
          pro.id === action.payload ? { ...pro, wish: false } : pro
        ),wishProductQuantite: state.wishProductQuantite - 1,
      };
      case ADD_TO_CART:
  const selectedProduct = state.products.find((pro) => pro.id === action.payload);
  const checkProduct = state.cart.find((pro) => pro.id === selectedProduct.id);

  if (checkProduct) {
    
    return {
      ...state,
      products: [...state.products],
      wishProductQuantite: state.wishProductQuantite,
      cart: state.cart.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, quantite: item.quantite + selectedProduct.quantite }
          : item
      ),
      cartProductQuantite: state.cartProductQuantite + selectedProduct.quantite,
    };
  } else {

    return {
      ...state,
      products: [...state.products],
      wishProductQuantite: state.wishProductQuantite,
      cart: [...state.cart, selectedProduct],
      cartProductQuantite: state.cartProductQuantite + 1,
    };
  }

        case REMOVE_CART:
  const removedProduct = state.cart.find((product) => product.id === action.payload);
  if (!removedProduct) {
    return state;
  }

  return {
    ...state,
    products: [...state.products],
    wishProductQuantite: state.wishProductQuantite,
    cart: state.cart.filter((product) => product.id !== action.payload),
    cartProductQuantite: state.cartProductQuantite - 1,
    trash: [...state.trash, removedProduct]
  };
          case ADD_QUANTITE:
  const updatedCart = state.cart.map((product) => {
    if (product.id === action.payload) {
      const updatedQuantite = (product.quantite || 0) + 1;

      return {
        ...product,
        quantite: updatedQuantite
      };
    }
    return product;
  });


  return {
    ...state,
    cart: updatedCart,
  };



  case MINUCE_QUANTITE:
  const updatedCartM = state.cart.map((product) => {
    if (product.id === action.payload) {
      const updatedQuantite = Math.max((product.quantite || 0) - 1, 0); 

      return {
        ...product,
        quantite: updatedQuantite
      };
    }
    return product;
  });


  return {
    ...state,
    cart: updatedCartM,
  };



  case REMOVE_TRASH:
    const selectedProduct_trash = state.trash.find((pro) => pro.id === action.payload);
    return {
        ...state,
        trash: state.trash.filter(function(product) {
            return product.id !== action.payload;
        }),
        cart: [...state.cart, selectedProduct_trash],
        cartProductQuantite: state.cartProductQuantite + 1
    };

    case VIEW_PRODUCT:
  return {
    ...state,
    viewed: true,
    viewedProduct: [action.payload],
  };
  case HIDE_VIEW:
  return {
    ...state,
    viewed: false,
    viewedProduct: [],
  };
  case ADD_SINGLE_QUANTITE:
  return {
    ...state,
    products: state.products.map(function (pro) {
      if (pro.id === action.payload) {
        return {
          ...pro,
          quantite: pro.quantite + 1,
        };
      }
      return pro;
    }),
    viewedProduct: state.viewedProduct.map(function (pro) {
      return {
        ...pro,
        quantite: pro.quantite + 1
      };
    }),
  };


  case MINUCE_SINGLE_QUANTITE:
  return {
    ...state,
    products: state.products.map(function (pro) {
      if (pro.id === action.payload && pro.quantite > 0) {
        return {
          ...pro,
          quantite: pro.quantite - 1,
        };
      }
      return pro;
    }),
    viewedProduct: state.viewedProduct.map(function (pro) {
      if (pro.quantite > 0) {
        return {
          ...pro,
          quantite: pro.quantite - 1,
        };
      }
      return pro;
    }),
  };



    default:
      return state;
  }
};

export default ShopReducer;
