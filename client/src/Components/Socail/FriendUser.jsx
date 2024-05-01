import React from 'react'
import image from './image.png'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import { FRIEND_POST, INFO, LIKE_POST } from '../../connection/query';

export default function Frienduser() {
    const { id } = useParams();
    const variables = {
        data: id
    };
    const { data, refetch } = useQuery(FRIEND_POST, {
        variables
    });
    const [likePost] = useMutation(LIKE_POST);
    const handleLike = async (postId) => {
        try {
            await likePost({
                variables: {
                    data: postId
                }
            });
            refetch();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    const { data: d3 } = useQuery(INFO, {
        variables: {
            data: id
        }
    });

    return (
        <div>
            <div className='flex justify-center'>
                <h1 className='text-white font-bold text-3xl'>Friends Post's</h1>
            </div>

            <div className='flex justify-start'>
                <div className=' mt-24 ml-12 mr-16'>
                    <div className='ml-12 mb-3'>
                        <div className='flex border-[1px] justify-center items-center border-solid border-white rounded-full w-24 h-24'>
                            <h1 className='text-7xl font-light text-red-300'>
                                {d3?.basicinfo?.userName.charAt(0).toUpperCase()}
                            </h1>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1 mr-2'>userName:</h1>
                        <h1 className='text-lg text-green-600'>{d3?.basicinfo?.userName}</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-sm text-gray-600 mt-1 mr-2'>email:</h1>
                        <h1 className='text-lg text-green-600'>{d3?.basicinfo?.email}</h1>
                    </div>
                </div>
                <div className='mt-32 flex flex-wrap'>
                    {data?.friendpost?.length === 0 ? (
                        <div>
                            <h1 className=' ml-56 text-3xl text-green-200'>
                                NO POST YET
                            </h1>
                        </div>
                    ) : (
                        data?.friendpost?.map(post => (
                            <div key={post._id} className="md:max-w-lg mr-16 mb-20 sm:max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 bg-transparent dark:border-gray-700">
                                <div className="h-64 md:h-80 overflow-hidden rounded-t-lg">
                                    <img className="w-full h-full object-cover" src={post.imgLink} alt="img" />
                                </div>
                                <div>
                                    <div className='flex justify-between'>
                                        <div className=''>
                                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {post.imgdesc} </h5>
                                        </div>
                                        <div className='flex justify-betweena'>
                                            <div className='h-2 mt-2 mr-2'>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <button onClick={() => handleLike(post._id)}>
                                                            <svg className=' hover:bg-red-500 hover:blur-lg' width="24" height="24" xmlns="http://www.w3.org/2000/svg"  ><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg>
                                                        </button>
                                                    </div>
                                                    <div className='ml-1 text-white'>
                                                        {post.likes}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=' h-2 mt-2 mr-2'>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <a href={`/social/post/comment/${post._id}`}>
                                                            <svg className=' hover:bg-gray-500 hover:blur-lg' width="24" height="24" xmlns="http://www.w3.org/2000/svg"  ><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>
                                                        </a>
                                                    </div>
                                                    <div className='ml-1 text-white'>
                                                        {post.comments}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
