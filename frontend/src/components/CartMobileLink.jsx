import React from 'react'
import { TiShoppingCart } from "react-icons/ti"
import { useGlobalContext } from '../Provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'

const CartMobileLink = () => {
   const {totalPrice, totalQty} = useGlobalContext()


  return (
       <div className="bg-green-700 px-2 py-1 rounded text-white text-sm">
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-green-500 rounded w-fit'>
              <TiShoppingCart />
              
            </div>
             <div className='text-xs'>
              <p>{totalQty} items</p>
              <p>{DisplayPriceInRupees(totalPrice)} Price</p>
             </div>
          </div>

         
        </div>
  
  )
}

export default CartMobileLink