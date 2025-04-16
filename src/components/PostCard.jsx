import React from 'react'
import {Link, useLoaderData} from 'react-router-dom'
import service from '../appwrite/conf'
function PostCard({$id, title, featuredimage}) {
  const data = useLoaderData();
  return (
    <>
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4 transition-transform duration-300 hover:scale-110'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFileView(featuredimage)} alt={title}
                    className='rounded-xl w-full' />
                </div>
                <h2
                className='text-xl font-bold text-black'
                >{title}</h2>
            </div>
        </Link>
    </>
  )
}

export default PostCard
