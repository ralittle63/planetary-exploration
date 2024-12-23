export interface MissionFormDto {
  id?: number;
  name: string;
  date: Date;
  planetId: number;
  description: string;
  planet?: any;
  discoveries: any[];
}
