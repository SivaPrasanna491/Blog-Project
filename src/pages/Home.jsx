import React, {useState, useEffect} from 'react'
import service from '../appwrite/conf'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Home() {
  const data = useLoaderData();
  const authStatus = useSelector(state => state.auth.status);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts()
    .then((post) => {
      if(post){
        setPosts(post.documents);
      }
    })
  }, [])
  if(!authStatus){
    return(
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-wrap">
            <div className="p-2 w-full">
                    <Link to='/signup'>
                      <h1 className="text-2xl font-bold hover:text-gray-500 cursor-pointer">Login to read posts</h1>
                    </Link>
            </div>
        </div>
      </div>
    )
  }
  return(
    <div className='w-full py-4'>
      <div className='flex flex-wrap justify-center gap-x-3 gap-y-3'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post}/>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Home

export const {postLists} = async () => {
  const res = await service.getPosts();
  return res?.documents || [];
};
