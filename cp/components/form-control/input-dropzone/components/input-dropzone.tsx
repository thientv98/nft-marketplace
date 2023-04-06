import { FormHelperText, InputLabel } from '@mui/material';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { DropzoneArea } from 'react-mui-dropzone';
import { uploadFile } from '../api';

type IInputFieldProps = {
  name: string
  required?: boolean
  filesLimit?: number
  acceptedFiles?: any
  formContext?: any
  label?: string
}

export const InputDropzone = (props: IInputFieldProps) => {

  const { enqueueSnackbar } = useSnackbar()

  // Props
  const { name, required = false, filesLimit = 5, acceptedFiles = ['image/*'], formContext, label } = props

  const [files, setFiles] = useState<any>([]);

  const handleUploadImage = async (files: any) => {
    const array: any[] = [];
    files.map(async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      array.push(uploadFile(formData, enqueueSnackbar))
    })
    return Promise.all(array).then((values) => {
      return values
    });
  }

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
          let initialFiles = undefined
          if (value === '') {
            initialFiles = undefined
          } else {
            if (typeof value === 'string') {
              initialFiles = [value]
            } else {
              initialFiles = value
            }
          }
          return <DropzoneArea
            initialFiles={initialFiles}
            acceptedFiles={acceptedFiles}
            filesLimit={filesLimit}
            onChange={async (e) => {
              handleUploadImage(e).then((res: any) => {
                setFiles(res)
                if (filesLimit === 1) {
                  onChange(res[0] ?? '')
                } else {
                  onChange(res)
                }
              })
            }} />
        }}></Controller>
      {required && formContext?.formState?.errors?.[name] && <FormHelperText error margin='dense' sx={{ mx: 2 }}>This field is required</FormHelperText>}
    </Stack>
  )
}