import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from '../repository-interfaces/ifile-relation.repository-interface';


@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }

    async execute(id: string) {

        const user = await this.userRepo.findById(id);

        if (!user)
            return null

        const userImages = await this.fileRelationRepo.findByRelationId("user", user?.id as string)
        user.images = userImages

        return user
    }
}