import { Box } from '@mui/material'
import Image from 'next/image'

type BoxImageProps = {
  url: string
}

export const BoxImage = (props: BoxImageProps) => {
  // props
  const { url } = props

  return (
    <Box
      height={100}
      width={100}
      position="relative"
      borderRadius={'6px'}
      overflow="hidden"
      border={1}
    >
      <Image
        src={url || '/assets/images/no-picture.png'}
        layout="fill"
        alt=""
        placeholder="blur"
        blurDataURL={url || '/assets/images/no-picture.png'}
      />
    </Box>
  )
}
