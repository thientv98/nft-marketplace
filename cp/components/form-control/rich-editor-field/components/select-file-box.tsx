import { BasicModal } from '@/components/modal'
import { trans } from '@/utils'
import { useRecoilState } from 'recoil'
import { openModalSelectFileState } from '../store'

export const SelectFileBox = () => {
  const [openModalSelectFile, setOpenModalSelectFile] = useRecoilState(openModalSelectFileState)

  return (
    <BasicModal
      open={openModalSelectFile}
      title={trans('titleModalSelectFile')}
      maxWidth="sm"
      onClose={() => setOpenModalSelectFile(false)}
    ></BasicModal>
  )
}
