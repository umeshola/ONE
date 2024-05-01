import React from 'react'
import { useParams } from 'react-router-dom';
import { ADDTOCART, BUY_FROM_CART, GET_ALL_REVIEW, GET_ITEM_REIVEW } from '../../connection/query';
import { useMutation, useQuery } from '@apollo/client';

export default function SigleItem() {
    const { id } = useParams();
    const[buyfromcart]=useMutation(BUY_FROM_CART);
    const [adding_cart] = useMutation(ADDTOCART);
    const { data: d1, refetch: r2 } = useQuery(GET_ITEM_REIVEW, {
        variables: {
            data: id
        }
    });
    const { data: d2, refetch: r1 } = useQuery(GET_ALL_REVIEW, {
        variables: {
            data: id
        }
    });
    const buyitem=async()=>{
        await buyfromcart({
            variables:{
                data:id
            }
        })
        window.location.href='/shop/order';
    };
    const addtoCart = async () => {
        await adding_cart({
            variables: {
                data: id
            }
        })
        window.location.href='/shop/cart';
    };
    return (
        <div>
            <div className='flex justify-center m-24'>
                <div className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center  justify-center mb-4">
                        <h5 className=" text-xl font-bold leading-none text-gray-900 dark:text-white">Dumbell</h5>
                    </div>
                    <div>
                    </div>
                    <div className="flow-root">
                        <div className='flex justify-center'>
                            <img className="rounded-t-lg h-56" src={d1?.getItemreview.imgLink} alt="img" />
                        </div>
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <div className='flex justify-between'>
                                <div className='flex justify-between py-3'>
                                    <button onClick={buyitem} className='flex mr-3 justify-between bg-black py-1 px-2 rounded-lg'>
                                        <h1 className='text-white hover:text-green-300  font-semibold text-md mr-1 '>BUY</h1>
                                        <svg class="w-6 hover:text-green-300  h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button onClick={addtoCart} className='bg-black px-1 py-1 rounded-lg'>
                                        <svg className="w-[27px] h-[27px] hover:text-orange-400 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='py-3'>
                                    <div className='flex justify-between'>
                                        <h1 className='text-xl font-bold text-yellow-300'>
                                            {d1?.getItemreview.stars} / 5
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {d2?.getallreview.map(reivew => (
                                <div key={reivew._id}>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 border-black border-[1px] border-solid rounded-full">
                                                <h1 className='text-lg font-normal ml-2 text-blue-300'>
                                                    {reivew.userName.charAt(0).toUpperCase()}
                                                </h1>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {reivew.name}
                                                </p>
                                                <p className="text-sm text-blue-300 truncate dark:text-blue-400">
                                                    ~ {reivew.userName}
                                                </p>
                                            </div>
                                            <div className="flex">
                                                {[...Array(reivew.stars)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        className="w-4 h-4 ms-1 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 22 20"
                                                    >
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
