import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Machine } from './interfaces/machine.interface';
import { CreateMachineDTO } from './dto/machine.dto';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel('Machine') private readonly machineModel: Model<Machine>,
  ) {}

  async getMachines(): Promise<Machine[]> {
    const machines = await this.machineModel.find();
    return machines;
  }

  async getMachine(machineID: string): Promise<Machine> {
    const machine = await this.machineModel.findById(machineID);
    return machine;
  }

  async createMachine(createMachineDTO: CreateMachineDTO): Promise<Machine> {
    const machine = new this.machineModel(createMachineDTO);
    await machine.save();
    return machine;
  }

  async deleteMachine(machineID: string): Promise<Machine> {
    const deletedMachine = await this.machineModel.findByIdAndDelete(machineID);
    return deletedMachine;
  }

  async updateMachine(
    machineID: string,
    createMachineDTO: CreateMachineDTO,
  ): Promise<Machine> {
    const updatedMachine = await this.machineModel.findByIdAndUpdate(
      machineID,
      createMachineDTO,
      { new: true }, //Para que devuelva el objeto nuevo, no el previo a la actualización
    );
    return updatedMachine;
  }
}
