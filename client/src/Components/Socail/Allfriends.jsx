import React from 'react'
import image from './image.png'
import { useQuery } from '@apollo/client'
import { ALLFRIEND, ME } from '../../connection/query'

export default function Allfriends() {
    const { data: d3 } = useQuery(ME);
    const { data, error } = useQuery(ALLFRIEND)
    return (
        <div>
            <div className='flex justify-center'>
                <h1 className='text-white font-bold text-3xl '>all Friends</h1>
            </div>
            <div className='flex justify-start'>
                <div className=' mt-24 ml-12 mr-16'>
                    <div className='ml-12 mb-3'>
                        <div className='flex border-[1px] justify-center items-center border-solid border-white rounded-full w-24 h-24'>
                            <h1 className='text-7xl font-semibold text-red-300'>
                                {d3?.me?.userName.charAt(0).toUpperCase()}
                            </h1>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1'>userName :</h1>
                        <h1 className='text-lg text-green-600'>{d3?.me?.userName}</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1 mr-2'>email :</h1>
                        <h1 className='text-lg text-green-600'>{d3?.me?.email}</h1>
                    </div>
                </div>

                <div className='mt-32 ml-24'>
                    <div className="w-full max-w-2xl rounded-lg  ">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {data?.allfriend.map((friend, index) => (
                                    <li key={index} className="py-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className='flex border-[1px] mr-2 justify-center items-center border-solid border-white rounded-full w-8 h-8'>
                                                    <h1 className=' -mt-[6px] text-2xl font-thin text-green-200'>
                                                        {friend?.username.charAt(0).toLowerCase()}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {friend.username}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {friend.femail}
                                                </p>
                                            </div>
                                            <div className="inline-flex ml-10 items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <a href={`/social/profile/f/${friend.frd}`}>
                                                    <h1 className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Visit</h1>
                                                </a>
                                            </div>
                                        </div>
                                    </li>))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
