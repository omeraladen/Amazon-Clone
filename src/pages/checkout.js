import React from 'react'
import Header from '../component/Header';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import CheckoutProduct from '../component/CheckoutProduct'
import CurrencyFormat from 'react-currency-format';
import { useSession } from "next-auth/react"
import { selectTotal } from '../slices/basketSlice';

import { loadStripe } from '@stripe/stripe-js';

import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key); // use public key to allow you to get stripe account


function checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession()
  

    const createCheckoutSession = async () => {
    const stripe = await stripePromise;
     
    // call the backend.. first install axios library
    // const checkoutSession = await axios.post('/api/create-checkout-session' , {
    //   // means make request to path /api/create-checkout-session and add these two info down
    //   items: items,
    //   email: session.user.email
    // });

      const checkoutSession = () => {
        axios.post('/api/create-checkout-session' , {
          items: items,
           email: session.user.email
        })
      }

    // Redirect user To Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if(result.error){
      alert(result.error.message )
    }

  };

  return (
    <div className='bg-gray-100'>
        <Header/>

        <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* left */}
        <div className='flex-grow m-5 shadow-sm'>
          <img
            src='https://images-eu.ssl-images-amazon.com/images/G/03/warehousedeals/XCM_CUTTLE_1414876_2235693_UK_CUTTLE_1242x300_en_GB.jpg'
            width={1029}
            height={250}
            objectFit='contain'
          />
          <div className='flex flex-col p-5 space-x-10 bg-white'>
               <h1 className='text-3xl border-b pb-4'>
                {items.length === 0 ? 'Your Amazon Basket !'  : 'Shopping Basket '}
                {items.length === 0 ? <img className='ml-60 ' src='https://www.valeorx.com/static/media/empty-cart.60e68bfd.png'  /> : null}
               </h1>
            
              {
                items.map((item, i) => (
                  <CheckoutProduct 
                  key={i}
                  id={item.id}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  hasPrime={item.hasPrime}
                  />
                ))
              }

          </div>
        </div>


        {/* right  */}

        <div className='flex flex-col bg-white p-10 shadow-md'>
          {
            items.length > 0 && (
              <>
              <h2 className='whitespace-nowrap'>Subtotal ({items.length} items) : {" "}
                <span className='font-extrabold	text-xl	'>
                  <CurrencyFormat value={total} prefix={'$'} />
                </span>
              </h2>
              
              <button 
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                {!session ? 'Sign in to Checkout ' : 'Proceed to Checkout'}
              </button>
              </>
            )
          }
        </div>
        </main>
    </div>
  )
}

export default checkout;