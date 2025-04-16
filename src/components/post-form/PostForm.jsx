import React, {useCallback, useEffect} from 'react'
import Input from '../../Input'
import Button from '../../Button'
import service from '../../appwrite/conf'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RTE from '../RTE'
import { useForm } from 'react-hook-form'
import Select from '../Select'
function PostForm({post}) {
    const navigate = useNavigate();
    const userdata = useSelector(state => state.auth.userData);
    const {register, handleSubmit, watch, getValues, setValue, control} = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const submit = async (data) => {
        if(post){
            const file = data.image[0]?await service.uploadFile(data.image[0]) : null;
            if(file){
                await service.deleteFile(post.featuredimage);
            }
            const dbPost = await service.updatePost(post.$id, {...data,
                featuredimage: file ? file.$id : undefined
            });
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } else{
            const file = await service.uploadFile(data.image[0]);
            data.featuredimage = file.$id;
            if(file){
                const dbPost = await service.createPost({...data, userid: userdata.$id});
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
    const slugTranform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }
        return ""
    }, [])
    useEffect(() => {
        const subscripton = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTranform(value.title), {shouldValidate: true})
            }
        })
        return () => subscripton.unsubscribe();
    }, [slugTranform, watch, setValue])
  return (
    <>
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                type='text'
                label='Title'
                className='mb-4'
                {...register("title",{
                    required: true
                })}
                />
                <Input
                type='text'
                label='Slug'
                className='mb-4 text-black'
                {...register("slug",{
                    required: true
                })}
                onInput={(e) =>(
                    setValue("slug", e.currentTarget.value, {shouldValidate: true})
                )}
                />
                <RTE label='Content' name='content' control={control} defaultValue={getValues("content")}/>
            </div>
            <div className='w-1/3 px-2'>
                <Input
                label='Featured Image'
                type='file'
                accept="image/png, image/pdf, image/jpeg image/jpg, image/gif"
                className='mb-4  bg-gray-300 text-black'
                {...register("image",{
                    required: true
                })}
                />
                {post && <div className='w-full mb-4'>
                    <img src={service.getFileView(post.featuredimage)} alt=""  className='rounded-xl'/>
                </div>}
                <Select label='Status' options={['active', 'inactive']}/>
                <Button
                children={post?"Update" : "Submit"}
                className='text-black mt-4 w-md bg-yellow-600'
                type='submit'
                />
            </div>
        </form>
    </>
  )
}

export default PostForm