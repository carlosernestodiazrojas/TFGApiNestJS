import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from 'src/domain/repository-interfaces/iuser.repository-interface';

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository
    ) { }

    async execute(id: string, oldPass: string, newPass: string) {
        const user = await this.userRepo.findById(id);
        const match = await bcrypt.compare(oldPass, user?.password);
        if (!match) throw new BadRequestException('Contraseña actual incorrecta');
        const hash = await bcrypt.hash(newPass, 10);
        await this.userRepo.update(id, { password: hash });
        return { message: 'Contraseña actualizada' };
    }
}