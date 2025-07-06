import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { IUpdateUserDto } from '../dto-interfaces/users/update-user.dto-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from '../repository-interfaces/ifile-relation.repository-interface';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }

    async execute(id: string, dto: IUpdateUserDto) {
        if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
        const user = await this.userRepo.update(id, dto);

        if (!user)
            return null

        if (dto.file_id && dto.file_id.length > 0)
            await this.fileRelationRepo.findByRelationIdAndCreateOrReplace('user', user.id, dto.file_id);

        return this.userRepo.findById(user.id)

    }
}