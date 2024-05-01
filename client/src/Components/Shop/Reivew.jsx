import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_ALL_REVIEW, GET_ITEM_REIVEW, SEND_REVIEW } from '../../connection/query'
import { useParams } from 'react-router-dom';

export default function Reivew() {


    const { id } = useParams();

    const[number,setNumber]=useState(0);
    const[msg,setMsg]=useState("")
    const[sendreview]=useMutation(SEND_REVIEW)


    const { data: d1,refetch:r1 } = useQuery(GET_ALL_REVIEW, {
        variables: {
            data: id
        }
    });
    const { data: d2 ,refetch:r2} = useQuery(GET_ITEM_REIVEW, {
        variables: {
            data: id
        }
    });

    const handleClick=async()=>{
        await sendreview({
            variables: {
                data: {
                    on:id,
                    name:msg,
                    stars:Number(number)
                }
            }
        });
        r1()
        r2()
    }
    return (
        <div>
            <div className='flex justify-center m-24'>
                <div className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center  justify-center mb-4">
                        <h5 className=" text-xl font-bold leading-none text-gray-900 dark:text-white">Review's</h5>
                    </div>
                    <div>
                    </div>
                    <div className="flow-root">
                        <div className='flex justify-center'>
                            <img className="rounded-t-lg h-56" src={d2?.getItemreview.imgLink} alt="img" />
                        </div>
                        <div>
                            <div className=' mt-4 flex justify-center'>
                                <h1 className='flex text-xl font-bold text-yellow-300'>{d2?.getItemreview.stars} / 5</h1>
                            </div>
                        </div>
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <div className=" mb-5 mt-6 flex items-center max-w-sm mx-auto">
                                <input  onChange={(e)=>{
                                        setNumber(e.target.value)
                                    }} type="number" min="1" max="5" className="text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-1 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="stars" required />
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className=" hover:text-blue-200 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input onChange={(e)=>{
                                        setMsg(e.target.value)
                                    }} type="text" className="text-gray-900  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-1 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What you want to say..." required />
                                </div>
                                <button onClick={handleClick} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                                    </svg>
                                </button>
                            </div>
                            {d1?.getallreview.map(reivew => (
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
