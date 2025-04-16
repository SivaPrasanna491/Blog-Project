import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Button from '../Button';
import service from '../appwrite/conf';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'
function Post() {
  const userData = useSelector(state => state.auth.userData)
  const navigate = useNavigate();
  const {slug} = useParams();
  const [post, setPost] = React.useState(null);
  useEffect(() => {
    if(slug){
      service.getPost(slug)
      .then((post) => {
        if(post){
          setPost(post);
        } else{
          navigate('/');
        }
      })
    }
  }, [slug, navigate])
  const deletePost = () => {
    service.deletePost(post.$id,{...post})
    .then((dbPost) => {
      if(dbPost){
        service.deleteFile(post.featuredimage)
        navigate('/');
      }
    })
  }
  const isAuthor = post && userData ? post.userid === userData.$id : false;
  console.log('isAuthor:', isAuthor);
  return post ?(
    <div className='w-full flex justify-center items-center mx-auto flex-col mb-4 py-8'>
      <div className='relative inline-block'>
        <img src={service.getFileView(post.featuredimage)} alt="" className='rounded-xl max-h-[500px] object-contain mb-4'/>
        
        {isAuthor && (
          <div className="absolute right-4 top-4 flex gap-2 z-10">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className='mr-3 bg-green-500 text-white'>
                  Edit
              </Button>
            </Link>
            <Button className='bg-red-600 text-black' onClick={deletePost}>
                Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-full mb-6 text-center">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css text-center">
          {parse(post.content)}
      </div>
  </div>
  
  ): null
}

export default Post