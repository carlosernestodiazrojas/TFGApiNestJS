
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { IUserRepository } from 'src/application/repository-interfaces/iuser.repository-interface';
import { CreateUserDto } from 'src/adapters/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/adapters/dtos/users/update-user.dto';
import { UserVM } from 'src/adapters/vm/user.vm';
import { RoleRepository } from './role.repository';
import { RoleName } from 'src/common/enums/role-name.enum';
import { RoleVM } from 'src/adapters/vm/role.vm';
import { HoaVM } from 'src/adapters/vm/hoa.vm';
import { HoaRepository } from './hoa.repository';
import { PropertyVM } from '../vm/property.vm';
import { CondominiumPropertyRepository } from './condominium-property.repository';

@Injectable()

export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly roleRepo: RoleRepository,
        private readonly hoaRepo: HoaRepository,
        private readonly propertyRepo: CondominiumPropertyRepository
    ) { }

    private toViewModel(user: User): UserVM {
        return new UserVM(
            user.id,
            user.email,
            user.password,
            user.name,
            user.last_name,
            new RoleVM(user.role.id, user.role.code, user.role.name as RoleName),
            user.hoa ? new HoaVM(user.hoa.id, user.hoa.name, user.hoa.address, user.hoa.president_id, user.hoa.admin_id) : null,
            user.property ? new PropertyVM(
                user.property.id,
                user.property.property_identifier,
                user.property.is_deleted,
                user.property.property_type,
                user.property.has_storage_room,
                user.property.has_parking_space,
                user.property.current_on_payments,
                user.property.created_at,
                user.property.updated_at
            ) : null
        );
    }

    async findByEmail(email: string): Promise<UserVM | null> {
        const ent = await this.repo.findOne({ where: { email }, relations: ['role', 'hoa', 'property'] });
        return ent ? this.toViewModel(ent) : null;
    }

    async findById(id: string): Promise<UserVM | null> {
        const ent = await this.repo.findOne({ where: { id }, relations: ['role', 'hoa', 'property'] });
        return ent ? this.toViewModel(ent) : null;
    }

    async findAll(hoa_id: string): Promise<UserVM[]> {

        const hoaEnt = await this.hoaRepo.findById(hoa_id);
        if (!hoaEnt) throw new NotFoundException('Comunidad no encontrada');

        const ents = await this.repo.find({ relations: ['role', 'hoa', 'property'] });

        const usersHoa = ents.filter(e => e.hoa.id === hoa_id)

        return usersHoa.map(e => this.toViewModel(e));
    }

    async create(dto: CreateUserDto): Promise<UserVM> {

        const roleEnt = await this.roleRepo.findByName(dto.role);
        if (!roleEnt) throw new NotFoundException('Rol no encontrado');

        const hoaEnt = await this.hoaRepo.findById(dto.hoa_id);
        if (!hoaEnt) throw new NotFoundException('Comunidad no encontrada');

        const ent = this.repo.create({
            email: dto.email,
            password: dto.password,
            name: dto.name,
            last_name: dto.last_name,
            role: { id: roleEnt.id },
            hoa: { id: hoaEnt.id }
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserVM> {

        const user = await this.repo.findOne({ where: { id }, relations: ['role', 'hoa'] });
        if (!user) throw new NotFoundException('Usuario no encontrado');

        if (dto.role) {
            const roleEnt = await this.roleRepo.findByName(dto.role);
            if (!roleEnt) throw new NotFoundException('Rol no encontrado');
            dto = { ...dto, role: undefined };
            await this.repo
                .createQueryBuilder()
                .relation(User, 'role')
                .of(id)
                .set(roleEnt.id);
        }

        if (dto.property) {
            const propertyEnt = await this.propertyRepo.findById(dto.property);
            if (!propertyEnt) throw new NotFoundException('Rol no encontrado');

            await this.repo
                .createQueryBuilder()
                .relation(User, 'property')
                .of(id)
                .set(propertyEnt.id);
        }


        if (dto.email || dto.name || dto.last_name || dto.password) {

            if (dto.email)
                user.email = dto.email

            if (dto.name)
                user.name = dto.name

            if (dto.last_name)
                user.last_name = dto.last_name

            if (dto.password)
                user.password = dto.password

            await this.repo.save(user)
        }

        const updated = await this.repo.findOne({ where: { id }, relations: ['role', 'hoa'] });
        return this.toViewModel(updated as User);
    }
}
