import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RoleName } from 'src/common/enums/role-name.enum';
import { IUserRepository, IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { IRoleRepository, IRoleRepositoryToken } from 'src/application/repository-interfaces/irole.repository-interface';
import { IHoaRepository, IHoaRepositoryToken } from 'src/application/repository-interfaces/ihoa.repository-interface';
import { ICreateUserDto } from '../dto-interfaces/users/create-user.dto-interface';

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository,
        @Inject(IRoleRepositoryToken)
        private roleRepo: IRoleRepository,
        @Inject(IHoaRepositoryToken)
        private hoaRepo: IHoaRepository,
    ) { }

    async execute(dto: ICreateUserDto) {
        const exists = await this.userRepo.findByEmail(dto.email);
        if (exists) throw new BadRequestException('Email ya registrado');
        const roleEntity = await this.roleRepo.findByName(dto.role);

        const hoaEntity = this.hoaRepo.findById(dto.hoa_id)

        const hash = await bcrypt.hash(dto.password, 10);
        return this.userRepo.create({
            ...dto,
            password: hash,
            role: (dto.role as RoleName)
        });
    }
}