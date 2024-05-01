import React, { useState } from 'react'
import image from './image.png'
import { useMutation, useQuery } from '@apollo/client';
import { FREIDN_ACCEPT, GET_ALL_POST, LIKE_POST, NOTIFICATION, SEARCH_USER, TRENDING } from '../../connection/query';
export default function home() {
    const { data: d1, refetch: ru } = useQuery(GET_ALL_POST);
    const [likePost] = useMutation(LIKE_POST);
    const [name, setName] = useState("");
    const [friend] = useMutation(FREIDN_ACCEPT);
    const { data: d3 } = useQuery(TRENDING);
    const { data: d2, refetch: re } = useQuery(NOTIFICATION);
    const { data: d4, refetch: rr } = useQuery(SEARCH_USER, {
        variables: {
            data: name
        }
    });
    const handleLike = async (postId) => {
        try {
            await likePost({
                variables: {
                    data: postId
                }
            });
            ru();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    const makeFriend = async (id) => {
        try {
            await friend({
                variables: {
                    data: id
                }
            })
            re();

        }
        catch (error) {
            console.log("Error adding friend", error);
        }
    }
    const search = async () => {
        rr();
        if (d4 && d4.searchuser) {
            const user = d4.searchuser;
            window.location.href = `/social/profile/${user._id}`;
        } else {
            alert("No user found with this username.");
        }
    }
    const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleNotificationDropdown = () => {
        setNotificationDropdownVisible(!notificationDropdownVisible);
    };
    return (
        <div>
            <div className='flex justify-between mt-12 rounded-lg h-12 mx-36 bg-gradient-to-r from-red-100 to-blue-800'>
                <div className='mt-2'>
                    <a href="/social/allfriends">
                        <h1 className='text-xl ml-4 font-bold'>Friends</h1>
                    </a>
                </div>
                <div className='relative mt-1 flex'>

                    <button onClick={toggleDropdown} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:text-black rounded-md bg-gradient-to-r from-white to-pink-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700  dark:border-gray-600" type="button">Trending
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div className={`absolute left-0 mt-10 z-10 ${dropdownVisible ? '' : 'hidden'} rounded-lg shadow w-44`} id="dropdown">
                        <ul className="py-2 text-sm bg-slate-700 text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            {d3?.gettrending.map((trend, index) => (
                                <li key={index}>
                                    <h1 className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{trend.name}</h1>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <input onChange={(e) => {
                            setName(e.target.value);
                        }} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-black rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:border-blue-500 rounded-md bg-gradient-to-r from-white to-pink-200 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-900" placeholder="Users..." required />
                        <button onClick={() => search()} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex mt-1 justify-between">
                    <div>
                        <button onClick={() => { window.location = "/social/post" }} className="px-2 py-1 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold rounded-lg text-lg text-center me-2">Post</button>
                    </div>

                    {d2?.notification.length > 0 && (
                        <div>
                            <div className="relative">
                                <div className='absolute ml-10 rounded-full h-6 w-6 text-black font-bold text-lg bg-red-500 -mt-3'>
                                    <h1 className='ml-2 -mt-1'>{d2?.notification.length}</h1>
                                </div>
                                <button className="px-2 py-1 bg-gradient-to-r from-sky-100 via-yellow-100 to-green-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-sky-100 dark:focus:ring-green-200 font-bold rounded-lg text-lg text-center me-2" onClick={toggleNotificationDropdown}>
                                    Noti
                                </button>
                                {notificationDropdownVisible && (
                                    <div className={`absolute right-0 mt-10 z-10 rounded-lg shadow bg-white`} id="notification-dropdown">
                                        <ul className="py-2 text-md bg-white text-gray-700" aria-labelledby="notification-dropdown-button">
                                            {d2?.notification.map(noti => (
                                                <li key={noti.from}>
                                                    <div className="flex my-1 justify-between">
                                                        <span className='mt-2 font-extralight text-xl ml-3'>{noti.userName}</span>
                                                        <button onClick={() => makeFriend(noti.from)} className="bg-blue-600  font-bold p-2 mx-3 text-white">Accept</button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <div className='mx-44 mt-12 flex flex-wrap'>
                {d1 && d1?.allpost.map(post => (
                    <div key={post._id} className="md:max-w-lg mr-16 mb-20 sm:max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 bg-transparent dark:border-gray-700">
                        <div className="h-64 md:h-80 overflow-hidden rounded-t-lg">
                            <img className="w-full h-full object-cover" src={post.imgLink} alt="img" />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <div className=''>
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.imgdesc}</h5>
                                    <a href={`/social/profile/${post.by}`}>
                                        <h2 className='text-xl font-thin text-blue-400'>{post.userName}</h2>
                                    </a>
                                </div>
                                <div className='flex justify-betweena'>
                                    <div className='h-2 mt-2 mr-2'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <button onClick={() => handleLike(post._id)}>
                                                    <svg className=' hover:bg-red-500 hover:blur-lg' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg>
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
                                                    <svg className=' hover:bg-gray-500 hover:blur-lg' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>
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
                ))}
            </div>

        </div>
    )
}
