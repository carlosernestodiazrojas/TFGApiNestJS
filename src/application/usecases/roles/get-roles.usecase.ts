import { Inject, Injectable } from "@nestjs/common";
import { IRoleRepository, IRoleRepositoryToken } from "src/domain/repository-interfaces/irole.repository-interface";

@Injectable()
export class GetRolesUseCase {
    constructor(
        @Inject(IRoleRepositoryToken)
        private roleRepo: IRoleRepository
    ) { }

    async execute() {
        return this.roleRepo.findAll();
    }
}