function generateCode() {
  // code data
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '1234567890'

  // store data
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''), upperCaseLetters.split(''), number.split(''))

  // start generating code 
  let shortCode = ''
  for (i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * collection.length)
    shortCode += collection[index]
  }
  return shortCode
}
module.exports = generateCode

