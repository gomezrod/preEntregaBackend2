import bcrypt from 'bcrypt'

const createHash = (password) => bcrypt.hashSync(password, 10)
const validateHash = (password, hash) => bcrypt.compareSync(password, hash)

export { createHash, validateHash }