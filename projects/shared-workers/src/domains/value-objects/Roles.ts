import { InvalidArgumentError } from "../errors/InvalidArgumentError";
import { EnumValueObject } from "./EnumValueObject";

export enum RolesEnum {
  admin = "admin",
  account = "account",
  company = "company",
  worker = "worker",
}

export const RolesWhiteList: RolesEnum[] = [
  RolesEnum.admin,
  RolesEnum.account,
  RolesEnum.company,
  RolesEnum.worker,
];

export class Rol extends EnumValueObject<RolesEnum> {
  constructor(value: string | RolesEnum) {
    super(value, RolesEnum);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`Invalid Rol <${value}>`);
  }
}
