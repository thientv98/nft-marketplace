import {
  BasicModal,
  ButtonCancel,
  ButtonClear,
  ButtonSearch,
  InputField
} from '@/components'
import { openModalSearchState } from '@/store/common'
import { trans } from '@/utils'
import { Stack } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import { useRecoilState } from 'recoil'
import { filterItemState } from '../store'

export const ModalSearch = () => {
  /* Call hooks */
  const [openModalSearch, setOpenModalSearch] = useRecoilState(openModalSearchState)
  const [filter, setFilter] = useRecoilState(filterItemState)

  /* It's setting the default values of the form. */
  const defaultValues = {
    search: filter.search ?? '',

  }

  /**
   * It sets the filter state to an empty string and the postCategoryId to 0, and then closes the modal
   */
  const handleResetSearch = () => {
    setFilter({
      search: '',
    })
    setOpenModalSearch(false)
  }

  /**
   * It takes in a data object, sets the filter state with the data object's title and postCategoryId,
   * and then closes the modal
   * @param {any} data - any: The data that is sent from the form
   */
  const handleSubmitSearch = (data: any) => {
    setFilter(data)
    setOpenModalSearch(false)
  }

  return (
    <BasicModal
      open={openModalSearch}
      maxWidth="xs"
      title={trans('userTitleModalSearch')}
      onClose={() => setOpenModalSearch(false)}
    >
      <FormContainer defaultValues={defaultValues} onSuccess={handleSubmitSearch}>
        <Stack
          paddingTop={2}
          direction={'column'}
          justifyContent="space-between"
          alignContent="space-between"
        >
          <Stack spacing={2}>
            <InputField
              name={'search'}
              label={trans('labelSearch')}
              placeholder={trans('labelSearch')}
            />
          </Stack>

          <Stack direction={'row'} justifyContent="flex-end" spacing={2} mt={3}>
            <ButtonCancel handleClick={() => setOpenModalSearch(false)} btnText={trans('cancel')} />
            <ButtonClear handleClick={handleResetSearch} btnText={trans('clear')} />
            <ButtonSearch btnText={trans('btnSearch')} />
          </Stack>
        </Stack>
      </FormContainer>
    </BasicModal>
  )
}
