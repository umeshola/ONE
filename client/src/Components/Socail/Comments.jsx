import React, { useState } from 'react'
import image from './image.png'
import { useMutation, useQuery } from '@apollo/client'
import { IMAGE, MAKE_COMMENT, POST_COMMENT } from '../../connection/query'
import { useParams } from 'react-router-dom';

export default function Comments() {

    const [name, setName] = useState("");
    const { id } = useParams();
    const { data: d1, refetch } = useQuery(POST_COMMENT, {
        variables: {
            data: id
        }
    });
    const { data: d2 } = useQuery(IMAGE, {
        variables: {
            data: id
        }
    });

    const [funxtion] = useMutation(MAKE_COMMENT);

    const handleComment = async () => {
        try {
            await funxtion({
                variables: {
                    data: {
                        on: id,
                        name
                    }
                }
            });
            refetch();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div className='flex justify-center m-24'>
            <div className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center  justify-center mb-4">
                    <h5 className=" text-xl font-bold leading-none text-gray-900 dark:text-white">Comments</h5>
                </div>
                <div>
                </div>
                <div className="flow-root">
                    <div className='flex justify-center'>
                        <img className="rounded-t-lg" src={d2?.getimgLink} alt="img" />
                    </div>
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className=" mb-5 mt-6 flex items-center max-w-sm mx-auto">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className=' hover:bg-gray-500 hover:blur-lg' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>
                                </div>
                                <input onChange={(e) => {
                                    setName(e.target.value);
                                }} type="text" className="  text-gray-900  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-1 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What you want to say..." required />
                            </div>
                            <button onClick={() => handleComment()} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" /></svg>
                            </button>
                        </div>

                        {d1 && d1?.getcomment.map(comment => (
                            <li key={comment._id} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex-shrink-0 h-8 w-8 border-black border-[1px] border-solid rounded-full">
                                            <h1 className='text-lg font-normal ml-[10px] text-blue-300'>
                                                {comment.userName.charAt(0).toUpperCase()}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {comment.name}
                                        </p>
                                        <p className="text-sm text-blue-300 truncate dark:text-blue-400">
                                            ~ {comment.userName}
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className='text-sm text-green-200'>
                                            {(new Date(parseInt(comment.time))).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </h1>
                                    </div>
                                </div>
                            </li>))}

                    </ul>
                </div>
            </div>
        </div>
    )
}
