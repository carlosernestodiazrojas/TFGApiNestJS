import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('hoas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HoaController {

    @Get()
    @Roles('global_admin')
    findAll() {
        return "Todo bien";
    }

    @Get(':id')
    @Roles('global_admin')
    findById(@Param('id') id: string) {
        return `Encontrado --- ${id}`;
    }

    @Post()
    @Roles('global_admin')
    create(@Body() dto: any) {
        return `Creado --- ${dto}`;
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id') id: string, @Body() dto: any) {
        return `Actualizado --- ${id} - ${dto}`;
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id') id: string) {
        return `Eliminado --- ${id}`;
    }

}