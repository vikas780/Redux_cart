import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { openModal } from '../Modalslice'
const CartContainer = () => {
  const dispatch = useDispatch()
  const { cartItems, amount, total } = useSelector((state) => state.cart)
  const refresh = () => window.location.reload(true)

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your cart</h2>
          <h4 className='empty-cart'>is currently empty </h4>
          <footer>
            <button
              className='btn confirm-btn'
              onClick={() => {
                refresh()
              }}
            >
              Add Cart
            </button>
          </footer>
        </header>
      </section>
    )
  }
  return (
    <section className='cart'>
      <h1>Cart:</h1>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          className='btn clear-btn'
          onClick={() => {
            dispatch(openModal())
          }}
        >
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
