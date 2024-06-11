import { readFileSync } from 'fs'
import * as path from 'path'

export const resolveSql = (filePath: string, toString?: boolean): Buffer | string => {
  const filePathResolve = path.resolve(process.cwd(), 'src', 'sql', filePath)
  const dataFileResolve = toString ? readFileSync(filePathResolve, 'utf-8') : readFileSync(filePathResolve)
  return dataFileResolve
}
