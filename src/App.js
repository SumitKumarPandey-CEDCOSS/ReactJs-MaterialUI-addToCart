import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './component/home'
import Cart from './component/cart'
import Product from './component/product'
import NoPage from './component/noPage'
import Navigation from './component/navigation'

function App () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
    setCount(cartQuantity)
  }, [])

  const handleProductClick = () => {
    setCount(count + 1)
  }

  return (
    <BrowserRouter>
      <>
        <Navigation count={count} />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route path='/products/:id'>
            <Product onClick={handleProductClick} />
          </Route>
          <Route path='/products'>
            <Product />
          </Route>
          <Route path='/cart'>
            <Cart count={count}/>
          </Route>
          <Route path='*'>
            <NoPage />
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default App
