import {_getItems,_getItem,_getCart,_addItemToCart}from "../utils/dummyDB";

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