import Image from 'next/image'

import React from 'react'
import {MenuIcon,
        SearchIcon,
        ShoppingCartIcon
        } from '@heroicons/react/outline'

import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from 'next/router';
import { selectItems } from '../slices/basketSlice';
import { useSelector } from 'react-redux';



function Header() {
  const {data : session} = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* top-Nav */}
         <div className='flex items-center bg-black p-1 flex-grow py-2'>
         <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
              onClick={()=> router.push('/')}
              src="https://links.papareact.com/f90"
              alt="Amazon"
              width={140}
              height={40}
              objectFit='contain'
              className='cursor-pointer'
            />
        </div>

        {/* search */}
       <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
       <input className='p-2 h-full w-6 flex-grow flex-shrink  rounded-l-md focus:outline-none' type="text" />
        <SearchIcon className='h-12 p-4'/>
       </div>

          {/* Right > With Auth SignIn - SignOut*/}
         <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap '>

          <div onClick={!session ? signIn : signOut} className='link cursor-pointer '>
            <p className='flex items-center'>
          
              {session ? `  ${session.user.name} ` : 'Sign In'}
            
              
              {session ?   <img  className='rounded-full w-8 ' src={session.user.image}  />  : null}
          
            </p>
            <p className='font-extrabold md:text-sm'>account & Lists</p>
          </div>

          <div className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </div>

          <div className='relative link  flex items-center' onClick={()=> router.push('/checkout')}>
          <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
            {items.length}
          </span>
            <ShoppingCartIcon className='h-10' />
            <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
          </div>
         </div>
         </div>
     
       
 
    {/* bottom */}
    <div className=' flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
      <p className='link flex items-center'>
        <MenuIcon className='h-6 mr-1' />
        All
      </p>
      <p className='link'>prime video</p>
      <p className='link'>Amazon</p>
      <p className='link'>Today's Deals</p>
      <p className='link hidden lg:inline-flex'>Electronics</p>
      <p className='link hidden lg:inline-flex'>Food & Grocery</p>
      <p className='link hidden lg:inline-flex'>Prime</p>
      <p className='link hidden lg:inline-flex'>Buy Agin</p>
      <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
      <p className='link hidden lg:inline-flex'>Health & Personal Care</p>

    </div>
    </header>
  )
}

export default Header