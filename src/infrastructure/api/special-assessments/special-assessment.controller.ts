import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateSpecialAssessmentDto } from "src/adapters/dtos/special-assessments/create-special-assessment.dto";
import { UpdateSpecialAssessmentDto } from "src/adapters/dtos/special-assessments/update-special-assessment.dto";
import { SpecialAssessmentManagementUseCase } from "src/application/usecases/special-assessment/special-assessment-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('special-assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SpecialAssessmentController {

    constructor(
        private useCase: SpecialAssessmentManagementUseCase
    ) { }

    @Get('/allByHoa/:hoa_id')
    @Roles('global_admin')
    findAll(@Param('hoa_id', new ParseUUIDPipe({ version: '4' })) hoa_id: string) {
        return this.useCase.findAll(hoa_id);
    }

    @Get(':id')
    @Roles('global_admin')
    findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.findById(id);
    }

    @Post()
    @Roles('global_admin')
    create(@Body() dto: CreateSpecialAssessmentDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateSpecialAssessmentDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}