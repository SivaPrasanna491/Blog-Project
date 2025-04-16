import React from 'react'
import {useState} from 'react'
import service from '../appwrite/conf'
import PostCard from '../components/PostCard'
import { useLoaderData } from 'react-router-dom'
function AllPosts() {
  const data = useLoaderData();
  const [posts, setPosts] = useState([]);
  React.useEffect(() => {
    service.getPosts()
    .then((post) => {
      if(post){
        setPosts(post.documents);
      }
    })
  }, [])
  return (
    <div className='w-full py-8'>
      <div className='flex flex-wrap justify-center gap-x-3'>
        {posts.map((post) => (
          <div className='p-2 w-1/4'>
            <PostCard {...post}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllPosts

export const {postsLists} = async () => {
  const res = await service.getPosts();
  return res?.documents || [];
};
