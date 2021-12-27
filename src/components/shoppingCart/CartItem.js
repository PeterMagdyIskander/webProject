
import "../../styles/app.css";

const CartItem = (props) => {
  return (
    <div>
      
{
    props.cart.map((item)=>{
        if(item.index===props.index){
            return <div>
                <p>{item.item.name}</p>
                <img alt={item.item.name} src={item.item.img} className="item-img"/>
                <p>{item.item.price}</p>
            </div>
        }else{
            return null
        }
    })
}
    </div>
  );
};
export default CartItem;
