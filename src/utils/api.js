import {_getItems,_getItem,_getCart,_addItemToCart,_signIn,_signUp,_addItem}from "../utils/dummyDB";

export function getItems() {
    return _getItems();
  }
export function getItem(id){
  return _getItem(id);
}
export function getCart(){
  return _getCart();
}
export function addItemToCart(id,count){
  return _addItemToCart(id,count);
}
export function signIn(username,password){
  return _signIn(username,password);
}

export function signUp(username,name,password,owner){
  return _signUp(username,name,password,owner);
}

export function addItem(item){
  return _addItem(item);
}