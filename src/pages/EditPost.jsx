import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import service from '../appwrite/conf'
import PostForm from '../components/post-form/PostForm'
import { useNavigate } from 'react-router-dom'
function EditPost() {
  const navigate = useNavigate();
  const {slug} = useParams();
  const [post, setPosts] = useState(null);
  useEffect(() => {
    if(slug){
      service.getPost(slug)
      .then((post) => {
        if(post){
          setPosts(post);
        } else{
          navigate('/');
        }
      })
    }
  }, [])
  return (
    <div className='py-8'>
      <PostForm post={post}/>
    </div>
  )
}

export default EditPost