import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { GETALLCART, BUY_FROM_CART, ME, REMOVE_FROM_CART } from '../../connection/query'

export default function Cart() {
    const { data: d1,refetch } = useQuery(GETALLCART);
    const { data: d2 } = useQuery(ME);
    const[buyfromcart]=useMutation(BUY_FROM_CART);
    const[removecart]=useMutation(REMOVE_FROM_CART);

    const buyitem=async(id)=>{
        await buyfromcart({
            variables:{
                data:id
            }
        })
        refetch();
    }
    const removefromcart=async(id)=>{
        await removecart({
            variables:{
                data:id
            }
        })
        refetch();
    }
    return (
        <div>
            <div className='flex justify-center'>
                <h1 className='text-white font-bold text-3xl'>Your Cart</h1>
            </div>
            <div className='flex justify-start'>
                <div className='mt-24 ml-12 mr-16'>
                    <div className='ml-12 mb-3'>
                        <div className='flex border-[1px] justify-center items-center border-solid border-white rounded-full w-24 h-24'>
                            <h1 className='text-7xl font-bold text-red-300'>
                            {d2?.me?.userName.charAt(0).toUpperCase()}
                            </h1>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1 mr-2'>userName:</h1>
                        <h1 className='text-lg text-green-600'>{d2?.me?.userName}</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1 mr-2'>email:</h1>
                        <h1 className='text-lg text-green-600'>{d2?.me?.email}</h1>
                    </div>
                </div>
                <div className='mt-32 flex flex-wrap'>
                    {d1?.getallcart.map(item => (
                        <div key={item._id} className="md:max-w-lg mr-16 mb-20 sm:max-w-sm bg-white border rounded-lg   bg-gradient-to-r border-gray-200 from-gray-100  to-gray-500">
                            <div className="h-64 md:h-64 overflow-hidden rounded-t-lg">
                                <img className="w-full h-full object-cover" src={item.imgLink} alt="img" />
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h5 className="text-2xl font-thin tracking-tight text-gray-900">${item.price}</h5>

                                        <h2 className='text-xl font-thin text-green-900'>{item.name}</h2>

                                    </div>
                                    <div className='flex justify-betweena'>
                                        <div className='h-2 mt-2 mr-2'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <button onClick={()=>buyitem(item.which)}>
                                                        <svg className="w-6 hover:text-green-300  h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' h-2 mt-2 mr-2'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <button onClick={()=>removefromcart(item.which)}>
                                                        <svg className="w-6 h-6 hover:text-orange-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>

                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    )
}
