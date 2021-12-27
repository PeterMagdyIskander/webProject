import "../../styles/app.css"


const CartItem=(props)=>{
    return(
        <div className="cart-cards">
            <div>
                <img  className="item-img" src={props.img}/>
            </div>
            <div className="cart-item-info">
                <p>{props.name}</p>
                <p>{props.price}</p>
            </div>
        </div>
    )
}
export default CartItem;