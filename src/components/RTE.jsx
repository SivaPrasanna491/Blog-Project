import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
function RTE({name, label, control, defaultValue}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block text-xl text-gray-50 mb-1 pl-1'>{label}</label>}
        <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
            <Editor
            apiKey='6ea3qkk6ust3tmw5d2osge22vejokt5o6xbxq8ot2fqoan40'
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
        )}
        />
    </div>
  )
}

export default RTE