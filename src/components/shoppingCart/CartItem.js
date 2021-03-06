
import "../../styles/app.css";

const CartItem = (props) => {
    console.log(props)
  return (
    <div>
      
{
    props.cart.map((item)=>{
        if(item.index===props.index){
            return <div key={item.id}>
                <p>{item.item.name}</p>
                <img alt={item.item.name} src={item.item.img} className="item-img"/>
                <p>price: ({item.boughtCount})*{item.item.price}</p>
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
