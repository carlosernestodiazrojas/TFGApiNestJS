import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { IFileRelationRepository, IFileRelationRepositoryToken } from '../repository-interfaces/ifile-relation.repository-interface';


@Injectable()
export class GetAllUsersUseCase {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository,
        @Inject(IFileRelationRepositoryToken)
        private fileRelationRepo: IFileRelationRepository
    ) { }

    async execute(hoa_id: string) {

        const users = await this.userRepo.findAll(hoa_id)

        const usersIds = users.map(user => user.id);

        const filesMap = await this.fileRelationRepo.findByRelationsIds('user', usersIds)


        if (filesMap.size > 0)
            for (const user of users) {
                let images = []
                const fileImagesMap = filesMap.get(user.id)

                if (fileImagesMap) {
                    images = fileImagesMap.map(image => image.file.id)
                }

                user.images = images
            }

        return users

    }
}