export class CreateMachineDTO {
  readonly name: string;
  readonly description: string;
  readonly productionLine: string;
  readonly productionLocation: string;
  readonly createdAt: Date;
}
