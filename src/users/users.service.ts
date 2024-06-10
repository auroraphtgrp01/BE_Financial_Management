import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DatabaseService } from 'src/database/database.service'
import { PathService } from 'src/path/path.service'
import { resolveSql } from 'src/database/resolveSql'
import { of, switchMap } from 'rxjs'

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly pathService: PathService
  ) {}
  create(createUserDto: CreateUserDto) {
    const sqlPathToQueryById = this.pathService.getPath('users', 'findUserById')
    const sqlRaw = resolveSql(sqlPathToQueryById, true) as string
    const queryClause = 'id = 2'
    return of(sqlRaw.replace('{ WHERE_CLAUSE }', queryClause)).pipe(switchMap((sql) => this.databaseService.query(sql)))
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
