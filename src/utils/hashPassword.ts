import { compareSync, genSalt, hash } from 'bcryptjs'
import { from, map, switchMap } from 'rxjs'

export const hashPassword = (password: string) => {
  return from(genSalt(10)).pipe(
    switchMap((salt: string) => from(hash(password, salt))),
    map((hashedPassword: string) => hashedPassword)
  )
}

export const comparePassword = (password: string, hashedPassword: string): boolean => {
  const isMatch = compareSync(password, hashedPassword)
  return isMatch
}
