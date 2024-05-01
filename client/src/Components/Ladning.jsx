import React from 'react'

export default function Ladning() {
    return (
        <div>
            <div className='absolute flex justify-start'>
                <div className='h-6 rotate-[17deg] w-80 blur-3xl bg-white'></div>
            </div>
            <div className=' relative flex  justify-center mt-96'>
                <a href="/shop">
                    <div className='felx hover:shadow-yellow-500 shadow-2xl shadow-red-100 mr-12 justify-center h-44 w-44 rounded-full bg-white transition ease-out delay-100 hover:scale-110 hover:bg-red-100 duration-300'>
                        <h1 className='font-bold pt-[62px] pl-11 text-4xl'>Shop</h1>
                    </div>
                </a>
                <a href="/health">
                    <div className='felx hover:shadow-green-500 shadow-2xl shadow-red-100 mr-12 justify-center h-44 w-44 rounded-full bg-white transition ease-out delay-100 hover:scale-110 hover:bg-red-100 duration-300'>
                        <h1 className='font-bold pt-[62px] pl-9 text-4xl'>Health</h1>
                    </div>
                </a>
                <a href="/social">
                    <div className='felx hover:shadow-blue-500 shadow-2xl shadow-red-100 mr-12 justify-center h-44 w-44 rounded-full bg-white transition ease-out delay-100 hover:scale-110 hover:bg-red-100 duration-300'>
                        <h1 className='font-bold pt-[62px] pl-9 text-4xl'>Social</h1>
                    </div>
                </a>
            </div>
        </div>
    )
}
