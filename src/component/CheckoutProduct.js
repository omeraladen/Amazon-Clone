import React from 'react'
import Image from 'next/dist/client/image';
import { StarIcon } from '@heroicons/react/outline';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../slices/basketSlice';


function checkoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime
}) {

    const dispatch = useDispatch();
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    }

    
  return (
    <div className='grid grid-cols-5'>

        {/* take one colum  */}
        <Image  src={image}  height={200} width={200} objectFit='contain'/>
          
           {/* take three colum in the middle middle */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {
                        Array(rating).fill().map((_,i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500"/>
                        ))
                    }
                </div>
           
            <p className='text-xs my-2 line-clamp-3'>{description}</p>
           <CurrencyFormat  value={price} displayType={'text'} prefix={'$'} thousandSeparator={true}/>
           
           {hasPrime && (
            <div className='flex items-center space-x-2 -mt-5'>
                <img className='w-12' src="https://links.papareact.com/fdw" alt="prime-logo" />
                <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
            </div>
        )
        }
            </div>

            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' >Add to Basket</button>
                <button className='button'onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>




    </div>
  )
}

export default checkoutProduct;