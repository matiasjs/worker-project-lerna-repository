export interface SpecializationsGetAllOutput
  extends Array<SpecializationGetAllOutput> {}

interface SpecializationGetAllOutput {
  _id: string;
  description: string;
}
