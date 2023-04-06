import { InputLabel, Stack, TextareaAutosize } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useMemo, useRef } from 'react'
import { Controller } from 'react-hook-form'

import 'react-quill/dist/quill.snow.css'
import { handleImage } from '../handle'

/**
 * @property {string} name - The name of the input field. This is used to identify the field in the form.
 * @property {string} label - The label for the input field
 * @property {boolean} required - This is a boolean value that indicates whether the field is required or not.
 * @property {string} placeholder - The text that will be displayed when the input is empty.
 */
type IRichEditorFieldProps = {
  name: string
  label?: string
  required?: boolean
  placeholder?: string
  validation?: any
}

/* This is a way to import a component that is not supported by SSR. */
// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false,
// })

/* A React component. */
export const RichEditorField = (props: IRichEditorFieldProps) => {
  /* Destructuring the props object. */
  const { name, label = '', required = false, placeholder = '', validation } = props

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ReactQuill = require('react-quill')

  const { enqueueSnackbar } = useSnackbar()

  const quillRef = useRef<any>()

  /* Defining the quill toolbar. */
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }, { font: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          [
            { align: [] },
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
        ],
        handlers: {
          image: () => handleImage(enqueueSnackbar, quillRef.current),
        },
      },
    }),
    []
  )

  return (
    <Stack>
      {label && (
        <InputLabel>
          {label} <span className="required">{required ? '*' : ''}</span>
        </InputLabel>
      )}
      <Controller
        name={name}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, value } }) => {
          if (window?.document) {
            return (
              <ReactQuill
                ref={quillRef}
                placeholder={placeholder}
                value={value}
                modules={modules}
                onChange={onChange}
                className="wrap-quill"
              />
            )
          } else {
            return <TextareaAutosize value={value} placeholder={placeholder} onChange={onChange} />
          }
        }}
      />
    </Stack>
  )
}
