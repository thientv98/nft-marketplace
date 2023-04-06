import { getCookie } from 'cookies-next'

import moment from 'moment'
import i18n from './i18next'

export const formatMoment = (strDate: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(strDate).format(format)
}

/**
 * It takes a number and returns a string with the number padded with zeros
 * @param {number | undefined} number - The number to pad.
 * @param [numZero=4] - The number of zeros to pad the number with.
 * @returns A function that takes a number and a number of zeros and returns a string.
 */
export const padNumber = (number: number | undefined, numZero = 4) => {
  return number ? number.toString().padStart(numZero, '0') : ''
}

/**
 * If the string is less than the max length, return the string, otherwise return the string up to the
 * last space before the max length, plus the suffix
 * @param {string} str - The string to truncate.
 * @param {number} max - The maximum length of the string.
 * @param [suffix=...] - The string to append to the end of the truncated string.
 */
export const truncateWord = (str: string, max: number, suffix = '...') =>
  str.length < max
    ? str
    : `${str.substring(0, str.substring(0, max - suffix.length).lastIndexOf(' '))}${suffix}`

/**
 * If the user is on the server, get the role from the cookie, otherwise get it from the session
 * storage
 * @returns The role of the user.
 */
export const getRole = () => {
  let role = getCookie('role')
  if (!(typeof window === 'undefined')) {
    if (!role) {
      role = sessionStorage.getItem('role')
    }
  }
  return role
}

/**
 * It returns the translation of the given key, or an empty string if the translation is not found
 * @param {string} key - The key of the translation you want to use.
 * @returns The translation of the key.
 */
export const trans = (key: string) => {
  return i18n.t(key) ?? ''
}

export const getErrorMessage = (str: any) => {
  if (str) return str
  return trans('errorDefault')
}
