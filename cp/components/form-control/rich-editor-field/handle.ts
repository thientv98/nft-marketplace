import { uploadQuillImage } from './api'

/**
 * It creates an input element, sets the type to file and the accept attribute to image/*, then clicks
 * it.
 *
 * When the input element changes, it uploads the file to the server, gets the upload link, and inserts
 * it into the quill editor
 * @param {any} enqueueSnackbar - This is the function that is used to display a snackbar.
 * @param {any} quillObj - The quill object that you get from the ref of the quill editor
 */
export const handleImage = async (enqueueSnackbar: any, quillObj?: any) => {
  if (window?.document) {
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      if (input?.files?.length) {
        // Upload file to server
        const file = input.files[0]

        const formData = new FormData()
        formData.append('file', file)

        /// get upload link to display in editor
        const res = await uploadQuillImage(formData, enqueueSnackbar)

        // Insert to quill editor
        if (res) {
          const range = quillObj?.getEditorSelection()

          quillObj?.getEditor().insertEmbed(range.index, 'image', res)
        }

        //remove inpit file element
        input?.remove()
      }
    }
  }
}
