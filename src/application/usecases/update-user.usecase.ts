import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/users/update-user.dto';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from 'src/domain/repositories/iuser.repository';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository
    ) { }

    async execute(id: string, dto: UpdateUserDto) {
        if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
        await this.userRepo.update(id, dto);
        return this.userRepo.findById(id);
    }
}