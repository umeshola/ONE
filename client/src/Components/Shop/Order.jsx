import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_ORDER, ME } from '../../connection/query'

export default function Order() {
    const { data: d1 } = useQuery(GET_ALL_ORDER);
    const { data: d2 } = useQuery(ME);
    return (
        <div>
            <div className='flex justify-center'>
                <h1 className='text-white font-bold text-3xl '>Your Order's</h1>
            </div>
            <div className='flex justify-start'>
                <div className=' mt-24 ml-12 mr-16'>
                    <div className='ml-12 mb-3'>
                        <div className='flex border-[1px] justify-center items-center border-solid border-white rounded-full w-24 h-24'>
                            <h1 className='text-7xl font-semibold text-red-300'>
                            {d2?.me?.userName.charAt(0).toUpperCase()}
                            </h1>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1'>userName :</h1>
                        <h1 className='text-lg text-green-600'>{d2?.me?.userName}</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1 mr-2'>email :</h1>
                        <h1 className='text-lg text-green-600'>{d2?.me?.email}</h1>
                    </div>
                </div>

                <div className='mt-32 ml-24'>
                    <div className="w-full max-w-2xl rounded-lg ">
                        {d1?.getallorder.map(item => (
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className='flex border-[1px] mr-2 justify-center items-center border-solid border-white rounded-full'>
                                                   <img className='h-16 w-16 rounded-full' src={item.imgLink} alt="" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    ${item.price}
                                                </p>
                                            </div>
                                            <div className="inline-flex ml-10 items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <a href={`/shop/review/${item.for}`}>
                                                    <div className=" flex justify-between bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                                        <svg className=" hover:text-blue-200 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                                            <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                                        </svg>
                                                        <h1 className='mt-1 hover:text-blue-200'>Reivew</h1>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
