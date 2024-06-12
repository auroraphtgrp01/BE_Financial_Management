import { IDeleteDateTime, IUpdateDateTime } from 'src/interfaces/Common.interface'

export interface IUser {
  id: string
  name: string
  email: string
  userPassword: string
  phoneNumber: string
  gender: string
  dateOfBirth: string
  refreshToken: string
  createdAt: string
  createdBy: string
  updateInfo: IUpdateDateTime
  deleteInfo: IDeleteDateTime
}
