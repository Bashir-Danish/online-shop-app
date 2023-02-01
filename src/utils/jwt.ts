export const getToken = () => {
  let token = window.localStorage.getItem('tokenId');
  if (token == 'undefined') {
    token = ''
  }

  return token
};
export const saveToken = (token: string) => {
  window.localStorage.setItem('tokenId', token);
};
export const saveUser = (user :any )=> {
  window.localStorage.setItem('user', user);
};
export const destroyToken = () => {
  window.localStorage.removeItem('tokenId');
};
export const addToCart = (product :any) => {
  // let cartItem = window.localStorage.getItem('product');
  // let count = window.localStorage.getItem('cartCount');
  // if (cartItem ) {
  //   window.localStorage.setItem('cartItem', product);
  //   window.localStorage.setItem('cartCount', count++ );
  // }

};


export default { getToken, saveToken, destroyToken ,saveUser ,addToCart};
