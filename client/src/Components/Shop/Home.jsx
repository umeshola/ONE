import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ADDTOCART, GETALLITEMS, MOST_BOUGHT, SEARCH_ITEM } from '../../connection/query'

export default function Home() {
    const [name, setName] = useState("");
    const { data: d1 } = useQuery(GETALLITEMS);
    const { data: d2 } = useQuery(MOST_BOUGHT);
    const [adding_cart] = useMutation(ADDTOCART);
    const { data: d3 , refetch: rr} = useQuery(SEARCH_ITEM, {
        variables: {
            data: name
        }
    });
    const addtoCart = async (id, name) => {
        await adding_cart({
            variables: {
                data: id
            }
        })
        alert(`${name} is been added to cart`)
    }

    const search = async () => {
        rr();
        if (d3 && d3.searchitem) {
            const user = d3.searchitem;
            window.location.href = `/shop/singleitem/${user._id}`;
        } else {
            alert("No user found with this username.");
        }
    }


    return (
        <div>
            <div className=' justify-between flex mt-12 rounded-lg h-12 mx-36 bg-gradient-to-r from-red-100 to-yellow-200'>
                <div className=" flex mt-1 justify-between">
                    <div>
                        <button onClick={() => { window.location = "/shop/order" }} className="px-2 py-1 bg-gradient-to-r from-red-100 via-lime-200 to-green-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400 font-bold rounded-lg text-lg text-center me-2">Order</button>
                    </div>
                </div>
                <div className='relative mt-1 flex'>
                    <div>
                        <input onChange={(e) => {
                            setName(e.target.value);
                        }} type="search" className="block p-2.5 w-full z-20 text-sm text-black rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:border-blue-500 rounded-md bg-gradient-to-r from-white to-pink-200 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-900" placeholder="Items" required />
                        <button onClick={() => search()} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className=" flex mt-1 justify-between">
                    <div>
                        <button onClick={() => { window.location = "/shop/cart" }} className="px-2 py-1 bg-gradient-to-r from-blue-200 via-lime-300 to-green-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400 font-bold rounded-lg text-lg text-center me-2">Cart</button>
                    </div>
                </div>
            </div>
            <div className='flex mx-36 mt-20 justify-centre'>
                <div>

                    <div className=' h-52 min-w-52 mr-12 py-3 px-3 bg-gradient-to-r from-lime-100 rounded-lg to-yellow-200'>
                        <div className='flex justify-center'>
                            <h1 className='font-bold text-2xl pb-1'>Most Bought</h1>
                        </div>
                        <div className='bg-black h-[1px]'></div>
                        {d2?.getMostBought.map(item => (
                            <div className='py-1 flex justify-center'>
                                <h1 className='text-xl font-thin'>{item.name}</h1>
                            </div>
                        ))}
                    </div>
                    <div className='flex -ml-10 justify-center'>
                        <button onClick={() => { window.location.href = '/shop/add' }} className='px-3 py-2 bg-white mt-6 rounded-lg'>
                            <h1 className='font-mono text-2xl'>SELL</h1>
                        </button>
                    </div>
                </div>
                <div >
                    <div>
                        <div className='flex flex-wrap'>
                            {d1?.getallitem.map(item => (
                                <div key={item._id} className="md:max-w-md mr-16 mb-20 sm:max-w-sm bg-white border bg-gradient-to-r border-gray-200 from-gray-100 rounded-lg to-gray-500">
                                    <div className="h-64 md:h-64 overflow-hidden rounded-t-lg">
                                        <img className="w-full h-full object-cover" src={item.imgLink} alt="img" />
                                    </div>
                                    <div>
                                        <div className='flex justify-between'>
                                            <div className=''>
                                                <h5 className="text-2xl tracking-tight text-black font-light">${item.price}</h5>
                                                <a href="">
                                                    <h2 className='text-xl font-thin text-green-900'>{item.name}</h2>
                                                </a>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='h-2 mt-2 mr-2'>
                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <button onClick={() => addtoCart(item._id, item.name)}>
                                                                <svg className="w-[27px] h-[27px] hover:text-yellow-800  text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
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
            </div>
        </div>
    )
}
