/**
 * FormLoginProps is an object with three properties: email, password, and remember.
 *
 * The email property is a string.
 * The password property is a string.
 * The remember property is a boolean.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password the user entered.
 * @property {boolean} remember - boolean
 */
export type FormLoginProps = {
  email: string
  password: string
  remember: boolean
}
