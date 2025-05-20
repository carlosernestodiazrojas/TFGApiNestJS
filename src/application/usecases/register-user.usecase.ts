import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { RoleName } from 'src/domain/models/role.model';
import { IUserRepository, IUserRepositoryToken } from 'src/domain/repositories/iuser.repository';
import { IRoleRepository, IRoleRepositoryToken } from 'src/domain/repositories/irole.repository';

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository,
        @Inject(IRoleRepositoryToken)
        private roleRepo: IRoleRepository,
    ) { }

    async execute(dto: CreateUserDto) {
        const exists = await this.userRepo.findByEmail(dto.email);
        if (exists) throw new BadRequestException('Email ya registrado');
        const roleEntity = await this.roleRepo.findByName(dto.role);
        const hash = await bcrypt.hash(dto.password, 10);
        return this.userRepo.create({ email: dto.email, password: hash, role: (dto.role as RoleName) });
    }
}