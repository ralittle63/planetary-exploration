export interface DiscoveryFormDto {
  id?: number;
  missionId: number;
  discoveryTypeId: number;
  name: string;
  description: string;
  location: string;
  mission?: any;
  discoveryType?: any;
}
