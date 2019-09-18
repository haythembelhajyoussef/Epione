import { SpecialtyDTO } from "./SpecialtyDTO";
import { MotiveDTO } from "./MotiveDTO";

export class DoctorDTO {
  id: number;
  firstName: string;

  address: string;
  photo: string;
  lastName: string;
  sexe: string;

  civility: string;

  email: string;

  password: string;

  phoneNumber: string;

  licenseNumber: string;

  specialty: SpecialtyDTO;
  motives: [MotiveDTO];
}
