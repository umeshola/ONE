import React from 'react'
import logo from '../assets/logo.png'
import { useQuery } from '@apollo/client';
import { ME } from '../connection/query';
export default function Navbar() {
    const { data } = useQuery(ME);

    return (
        <div>
            <div className='  text-white bg-black flex justify-between'>
                <div className='flex justify-between ml-3 my-2'>
                    <div>
                        <img src={logo} alt="logo" className=' h-9 w-8 object-contain' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-serif mt-1 ml-2'>One</h1>
                    </div>
                </div>
                <div className='flex justify-between mr-3 my-3'>
                    <div>
                        <a href="/">
                            <h1 className='text-2xl mr-4 font-serif'>Home</h1>
                        </a>
                    </div>
                    {localStorage.getItem("token") ?
                        <div className='flex justify-between'>
                            <div className='flex border-[1px] mr-2 justify-center items-center border-solid border-white rounded-full w-8 h-8'>
                                <h1 className=' -mt-[2px] text-2xl font-semibold text-green-200'>
                                    {data?.me?.userName.charAt(0).toLowerCase()}
                                </h1>
                            </div>
                            <button className=' -mt-[2px] text-2xl' onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = '/'
                            }}>
                                Logout
                            </button>
                        </div>
                        : <div>
                            <a href="/signup">

                                <h1 className='text-2xl font-serif '>Singup</h1>
                            </a>
                        </div>}
                </div>
            </div>
        </div>
    )
}
