import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { NEW_POST } from '../../connection/query';

export default function Post() {
    const [imgL, setImgL] = useState("")
    const [imgD, setImgD] = useState("")
    const [zone, setZone] = useState("")
    const [p, setP] = useState(false);
    const [postnew] = useMutation(NEW_POST, {
        onCompleted: () => {
            alert("DONE");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postnew({
                variables: {
                    data: {
                        imgLink: imgL,
                        imgdesc: imgD,
                        zone: zone,
                        p: !!p,
                    },
                },
            });
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    return (
        <div>
            <div className='flex justify-center pt-32'>
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Post.</h5>
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image address</label>
                            <input onChange={(e) => setImgL(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="add.." required />
                            <div>
                                <a href="">
                                    <h1 className='text-md text-blue-500 hover:underline hover:cursor-pointer'>Img to address</h1>
                                </a>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image description</label>
                            <input onChange={(e) => setImgD(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="desc.." required />
                        </div>
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">#Zone</label>
                            <input onChange={(e) => setZone(e.target.value)} placeholder="#example" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Privacy</label>
                            <select onChange={(e) => setP(e.target.value === 'true')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                <option value="false">Public</option>
                                <option value="true">Private</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
