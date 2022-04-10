import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { CreateMachineDTO } from './dto/machine.dto';

import { MachineService } from './machine.service';

@Controller('machine')
export class MachineController {
  constructor(private machineService: MachineService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createPost(@Res() res, @Body() createMachineDTO: CreateMachineDTO) {
    const machine = await this.machineService.createMachine(createMachineDTO);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Machine Successfully Created', machine: machine });
  }

  @Get('/')
  async getMachines(@Res() res) {
    const machines = await this.machineService.getMachines();
    return res.status(HttpStatus.OK).json({
      machines,
    });
  }

  @Get('/:machineID')
  async getMachine(@Res() res, @Param('MachineID') machineID) {
    const machine = await this.machineService.getMachine(machineID);
    if (!machine) throw new NotFoundException('Machineo no existe');
    return res.status(HttpStatus.OK).json({ machine });
  }

  @Delete('/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteMachine(@Res() res, @Query('machineID') machineID) {
    const machineDeleted = await this.machineService.deleteMachine(machineID);
    if (!machineDeleted) throw new NotFoundException('Machineo no existe');
    return res.status(HttpStatus.OK).json({
      message: 'Machine Deleted Succesfully',
      machineDeleted,
    });
  }

  @Put('/update')
  @UseGuards(AuthGuard('jwt'))
  async updateMachine(
    @Res() res,
    @Body() createMachineDTO: CreateMachineDTO,
    @Query('machineID') machineID,
  ) {
    const updatedMachine = await this.machineService.updateMachine(
      machineID,
      createMachineDTO,
    );
    if (!updatedMachine) throw new NotFoundException('Machine does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Machine Updated Successfully',
      updatedMachine,
    });
  }
}
