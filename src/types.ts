export type StageId = 
  | 'hive' 
  | 'flowers' 
  | 'beekeeper' 
  | 'harvest' 
  | 'processing' 
  | 'transport' 
  | 'customer';

export interface StageInfo {
  id: StageId;
  levelNumber: number;
  name: string;
  shortName: string;
  tagline: string;
  icon: string;
  mapX: number; // percentage on map (0-100)
  mapY: number; // percentage on map (0-100)
  blockchainBlock: number;
  blockHash: string;
}

export interface HiveSensor {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'alert';
  temperature: number; // in °C
  humidity: number; // in %
  weight: number; // in kg
  soundFrequency: number; // in Hz
  soundLabel: string;
  activityLevel: 'Normal' | 'Elevated' | 'Low' | 'High Activity';
  alertMessage?: string;
}

export interface BatchPassport {
  batchId: string;
  productName: string;
  netWeight: string;
  variety: string;
  purityScore: number;
  blockchainContract: string;
  verifiedTimestamp: string;
  hive: {
    hiveId: string;
    location: string;
    apiaryName: string;
    temperature: string;
    humidity: string;
    hiveWeight: string;
    hiveStatus: string;
    queenStatus: string;
    coordinates: string;
  };
  flowers: {
    sources: Array<{
      name: string;
      percentage: number;
      season: string;
      color: string;
      icon: string;
    }>;
    notes: string;
    biome: string;
    pollenAnalysis: string;
  };
  beekeeper: {
    id: string;
    name: string;
    avatar: string;
    farmLocation: string;
    inspectionDate: string;
    verificationStatus: string;
    licenseNumber: string;
    quote: string;
  };
  harvest: {
    harvestDate: string;
    batchId: string;
    quantity: string;
    flowerSource: string;
    brixPercentage: string;
    moistureContent: string;
    rawUnfiltered: boolean;
    blockTx: string;
  };
  processing: {
    facility: string;
    facilityId: string;
    qualityChecked: boolean;
    batchRegistered: boolean;
    processingRecorded: boolean;
    noRecordChangesDetected: boolean;
    steps: Array<{ title: string; status: string; time: string }>;
    certifications: string[];
  };
  transport: {
    from: string;
    to: string;
    dispatchDate: string;
    deliveryDate: string;
    transportStatus: string;
    carrier: string;
    vehicleId: string;
    temperatureControlled: boolean;
    currentLocation: string;
  };
  customer: {
    recipient: string;
    deliveryCity: string;
    deliveredDate: string;
    qrVerified: boolean;
    sealIntact: boolean;
    verificationHash: string;
  };
}

export interface BlockchainBlock {
  blockNumber: number;
  blockName: string;
  stageId: StageId;
  timestamp: string;
  hash: string;
  previousHash: string;
  dataSummary: string;
  verified: boolean;
  signer: string;
}
