import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import { total, getCartItems } from './createSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from './components/Modal'
function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(total())
  }, [cartItems]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(getCartItems())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      {isOpen && <Modal />}

      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
