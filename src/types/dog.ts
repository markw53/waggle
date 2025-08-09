export type DogGender = "male" | "female";

export interface DogProfile {
  id: string;
  name: string;
  description?: string;
  photoURL?: string;
  birthDate?: string;
  breed?: string;
  gender?: DogGender;
  ownerId?: string;
  // You can expand with: age, color, vaccinated, etc.
}