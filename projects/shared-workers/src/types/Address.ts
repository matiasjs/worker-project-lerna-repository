export interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  number: number;
  zip_code: string;
  floor: string;
  tower: string;
  department: string;
  coordinates: {
    lat: string;
    long: string;
  };
}
