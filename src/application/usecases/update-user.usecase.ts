import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { IUpdateUserDto } from '../dto-interfaces/users/update-user.dto-interface';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository
    ) { }

    async execute(id: string, dto: IUpdateUserDto) {
        if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
        await this.userRepo.update(id, dto);
        return this.userRepo.findById(id);
    }
}