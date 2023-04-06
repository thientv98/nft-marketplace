/**
 * It returns an object with two properties, minLength and maxLength, which are both functions that
 * return a boolean
 * @param [minLength=6] - The minimum length of the password.
 * @param [maxLength=20] - The maximum length of the string.
 * @returns An object with two properties, minLength and maxLength.
 */
export const passwordValidation = (minLength = 6, maxLength = 20) => {
  return {
    minLength: minLenghValidation(minLength),
    maxLength: maxLenghValidation(maxLength),
  }
}

/**
 * It returns an object with a value and a message property
 * @param [minLength=6] - The minimum length of the string.
 * @returns An object with two properties: value and message.
 */
export const minLenghValidation = (minLength = 6) => {
  return {
    value: minLength,
    message: `Please enter at least ${minLength} characters.`,
  }
}

/**
 * It takes a number as an argument and returns an object with a value and message property
 * @param [maxLength=20] - The maximum length of the input.
 * @returns An object with two properties, value and message.
 */
export const maxLenghValidation = (maxLength = 20) => {
  return {
    value: maxLength,
    message: `Please enter within ${maxLength} characters.`,
  }
}
