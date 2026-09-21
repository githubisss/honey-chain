import { BatchPassport, BlockchainBlock, HiveSensor, StageInfo } from '../types';

export const STAGES_LIST: StageInfo[] = [
  {
    id: 'hive',
    levelNumber: 1,
    name: 'Beehive #HNY1024',
    shortName: 'HIVE',
    tagline: 'Colony sensor telemetry & smart brood box conditions',
    icon: '🐝',
    mapX: 12,
    mapY: 22,
    blockchainBlock: 1048201,
    blockHash: '0x8f3a...b912'
  },
  {
    id: 'flowers',
    levelNumber: 2,
    name: 'Flower Field',
    shortName: 'FLOWER FIELD',
    tagline: 'Pollen foraging zones & botanical biodiversity',
    icon: '🌸',
    mapX: 25,
    mapY: 65,
    blockchainBlock: 1048202,
    blockHash: '0x3c9d...e174'
  },
  {
    id: 'beekeeper',
    levelNumber: 3,
    name: 'Beekeeper Verification',
    shortName: 'BEEKEEPER',
    tagline: 'Certified master apiarist inspection & health log',
    icon: '👨🌾',
    mapX: 42,
    mapY: 28,
    blockchainBlock: 1048203,
    blockHash: '0x7e11...4a08'
  },
  {
    id: 'harvest',
    levelNumber: 4,
    name: 'Pure Honey Harvest',
    shortName: 'HARVEST',
    tagline: 'Cold spin extraction & refractometer testing',
    icon: '🍯',
    mapX: 58,
    mapY: 72,
    blockchainBlock: 1048204,
    blockHash: '0x1b5f...99d2'
  },
  {
    id: 'processing',
    levelNumber: 5,
    name: 'Processing & Quality Check',
    shortName: 'PROCESSING',
    tagline: 'Laboratory purity verification & sealed batching',
    icon: '🏭',
    mapX: 72,
    mapY: 34,
    blockchainBlock: 1048205,
    blockHash: '0x6d40...cc78'
  },
  {
    id: 'transport',
    levelNumber: 6,
    name: 'Eco Express Transport',
    shortName: 'TRANSPORT',
    tagline: 'Temperature-monitored refrigerated transit',
    icon: '🚚',
    mapX: 84,
    mapY: 70,
    blockchainBlock: 1048206,
    blockHash: '0x29fa...31e5'
  },
  {
    id: 'customer',
    levelNumber: 7,
    name: 'Your Honey Jar',
    shortName: 'YOUR HOME',
    tagline: 'Delivered, tamper-sealed, and cryptographically verified',
    icon: '🏠',
    mapX: 92,
    mapY: 24,
    blockchainBlock: 1048207,
    blockHash: '0x55bc...e419'
  }
];

export const DEMO_BATCH: BatchPassport = {
  batchId: 'HNY1024',
  productName: 'Golden Meadow Artisan Raw Honey',
  netWeight: '500g / 17.6 oz',
  variety: 'Alpine Wildflower & Sunflower Blossom',
  purityScore: 99.8,
  blockchainContract: '0x4E70...93F2 (HoneyChain Ledger v2)',
  verifiedTimestamp: 'September 18, 2026 at 14:32 UTC',
  hive: {
    hiveId: '#HNY1024 (Brood Box Alpha-3)',
    location: 'Sunny Valley Apiary, Meadow Ridge, Lot 4',
    apiaryName: 'Cloverdale Sustainable Apiaries',
    temperature: '28°C',
    humidity: '62%',
    hiveWeight: '42 kg',
    hiveStatus: 'Healthy',
    queenStatus: 'Active & Marked (Queen Aurelia)',
    coordinates: '46.8182° N, 8.2275° E (Elevation 1,120m)'
  },
  flowers: {
    sources: [
      { name: 'Alpine Wildflower', percentage: 45, season: 'Late Summer', color: '#f59e0b', icon: '🌸' },
      { name: 'Sunflowers', percentage: 35, season: 'Peak Bloom', color: '#eab308', icon: '🌼' },
      { name: 'Lavender & White Clover', percentage: 20, season: 'End of Harvest', color: '#8b5cf6', icon: '🌺' }
    ],
    notes: 'Bees foraged within a pristine 3.2km organic radius, free from synthetic pesticides or neonicotinoids.',
    biome: 'Sub-Alpine Meadow & Meadowland Terraces',
    pollenAnalysis: 'Rich multi-floral density with over 840 grains/field, indicating authentic raw origin.'
  },
  beekeeper: {
    id: 'BK-9921',
    name: 'Mateo Vance',
    avatar: '👨🌾',
    farmLocation: 'Golden Meadow Organic Farm, Alpine Valley',
    inspectionDate: 'August 24, 2026',
    verificationStatus: 'Verified Master Beekeeper ✓',
    licenseNumber: 'EU-BIO-CERT-8842',
    quote: 'Our bees are treated with holistic care, natural wood Langstroth hives, and gentle non-invasive checks.'
  },
  harvest: {
    harvestDate: 'August 28, 2026',
    batchId: 'HNY1024',
    quantity: '185 kg (370 Glass Jars)',
    flowerSource: 'Wildflower, Sunflower & Clover',
    brixPercentage: '82.4° Brix (Premium Density)',
    moistureContent: '16.8% (Well under 20% standard)',
    rawUnfiltered: true,
    blockTx: '0x1b5f778a2e49c0d12f45ea67b3112cde'
  },
  processing: {
    facility: 'HoneyChain Pure Lab & Cold Spin Facility',
    facilityId: 'FAC-SWISS-04',
    qualityChecked: true,
    batchRegistered: true,
    processingRecorded: true,
    noRecordChangesDetected: true,
    steps: [
      { title: 'Cold-Spin Extraction (34°C max)', status: 'Passed', time: 'Aug 29, 09:15' },
      { title: 'Coarse Stainless Mesh Filter', status: 'Passed (Pollen preserved)', time: 'Aug 29, 11:30' },
      { title: 'Nuclear Magnetic Resonance Purity Scan', status: '100% Genuine Honey', time: 'Aug 30, 08:45' },
      { title: 'Nitrogen Flushed Amber Glass Bottling', status: 'Hermetically Sealed', time: 'Aug 30, 14:00' }
    ],
    certifications: ['Certified Raw & Unpasteurized', 'Zero Additives Detected', 'ISO 22000 Food Safety', 'Soil Association Organic']
  },
  transport: {
    from: 'Golden Meadow Farm (Alpine Valley)',
    to: 'Eco-Distribution Hub & Direct Delivery',
    dispatchDate: 'September 02, 2026',
    deliveryDate: 'September 05, 2026',
    transportStatus: 'Delivered',
    carrier: 'GreenRoute Clean Electric Logistics',
    vehicleId: 'EV-TRUCK-88C',
    temperatureControlled: true,
    currentLocation: 'Delivered to Doorstep (Tamper Seal Verified)'
  },
  customer: {
    recipient: 'Honey Lover (Verified Customer)',
    deliveryCity: 'Your City, Home Address',
    deliveredDate: 'September 05, 2026',
    qrVerified: true,
    sealIntact: true,
    verificationHash: '0x55bce419a4e2124bb8cf14238e899b41a02'
  }
};

export const BLOCKCHAIN_LEDGER: BlockchainBlock[] = [
  {
    blockNumber: 1048201,
    blockName: 'BLOCK #001: 🐝 Hive Data Telemetry',
    stageId: 'hive',
    timestamp: '2026-08-20 08:14:22 UTC',
    hash: '0x8f3a948218c399bde104a621743ef094bc12a9e3',
    previousHash: '0x0000000000000000000000000000000000000000',
    dataSummary: 'Brood temp 28°C, humidity 62%, colony weight 42kg registered by IoT sensor #HNY1024',
    verified: true,
    signer: 'ApiaryNode-Alpha3 (0x7B1a...4801)'
  },
  {
    blockNumber: 1048202,
    blockName: 'BLOCK #002: 🌸 Flower Source Biodiversity',
    stageId: 'flowers',
    timestamp: '2026-08-22 11:30:10 UTC',
    hash: '0x3c9de174f8819ab00127a931109dc390bbf12015',
    previousHash: '0x8f3a948218c399bde104a621743ef094bc12a9e3',
    dataSummary: 'Botanical GPS foraging radius verified: 45% Wildflower, 35% Sunflower, 20% Clover',
    verified: true,
    signer: 'FloraValidator-BioNode (0x2C99...A510)'
  },
  {
    blockNumber: 1048203,
    blockName: 'BLOCK #003: 👨🌾 Beekeeper Certification',
    stageId: 'beekeeper',
    timestamp: '2026-08-24 16:45:00 UTC',
    hash: '0x7e114a08bc79e612f0099411ad45199651ba77bc',
    previousHash: '0x3c9de174f8819ab00127a931109dc390bbf12015',
    dataSummary: 'Master Apiarist Mateo Vance (BK-9921) signed organic harvest readiness inspection',
    verified: true,
    signer: 'MasterBeekeeper-Mateo (0x9921...F88B)'
  },
  {
    blockNumber: 1048204,
    blockName: 'BLOCK #004: 🍯 Raw Honey Harvest',
    stageId: 'harvest',
    timestamp: '2026-08-28 14:20:19 UTC',
    hash: '0x1b5f99d288ae0012bcf3994a5e128490a0cb47a1',
    previousHash: '0x7e114a08bc79e612f0099411ad45199651ba77bc',
    dataSummary: 'Batch HNY1024 harvested (185kg total). Brix test 82.4%, moisture 16.8% locked on-chain',
    verified: true,
    signer: 'HarvestRegistryNode (0x44B1...7023)'
  },
  {
    blockNumber: 1048205,
    blockName: 'BLOCK #005: 🏭 Processing & Purity Check',
    stageId: 'processing',
    timestamp: '2026-08-30 15:02:44 UTC',
    hash: '0x6d40cc7814bfae991207d5490bc1156e9112ae8b',
    previousHash: '0x1b5f99d288ae0012bcf3994a5e128490a0cb47a1',
    dataSummary: 'NMR testing passed. Zero adulteration, zero high fructose syrup detected. 370 tamper-sealed jars',
    verified: true,
    signer: 'PurityLabCertifier-SWISS (0x88F0...3122)'
  },
  {
    blockNumber: 1048206,
    blockName: 'BLOCK #006: 🚚 Transport & Cold-Chain',
    stageId: 'transport',
    timestamp: '2026-09-02 07:18:55 UTC',
    hash: '0x29fa31e5aa90b144ce88147d3320f9175cb94210',
    previousHash: '0x6d40cc7814bfae991207d5490bc1156e9112ae8b',
    dataSummary: 'GreenRoute EV #EV-TRUCK-88C logged constant 18-21°C transit across 320km route',
    verified: true,
    signer: 'EcoLogisticsNode (0x10C2...9951)'
  },
  {
    blockNumber: 1048207,
    blockName: 'BLOCK #007: 🏠 Customer QR Delivery Passport',
    stageId: 'customer',
    timestamp: '2026-09-05 13:40:11 UTC',
    hash: '0x55bce419a4e2124bb8cf14238e899b41a02798e1',
    previousHash: '0x29fa31e5aa90b144ce88147d3320f9175cb94210',
    dataSummary: 'Physical QR tamper seal activated on end customer bottle. Immutable traceability complete',
    verified: true,
    signer: 'HoneyChainOrchestrator (0xFACE...BEE1)'
  }
];

export const BEEKEEPER_HIVES: HiveSensor[] = [
  {
    id: 'HIVE-01',
    name: 'Hive 01 — Sunny Meadow',
    status: 'healthy',
    temperature: 28.2,
    humidity: 61,
    weight: 42.5,
    soundFrequency: 185,
    soundLabel: 'Content Queen Humming (185 Hz)',
    activityLevel: 'Normal'
  },
  {
    id: 'HIVE-02',
    name: 'Hive 02 — Wild Clover Ridge',
    status: 'healthy',
    temperature: 27.9,
    humidity: 63,
    weight: 44.1,
    soundFrequency: 190,
    soundLabel: 'Active Foraging Chorus (190 Hz)',
    activityLevel: 'High Activity'
  },
  {
    id: 'HIVE-03',
    name: 'Hive 03 — Orchard Brook',
    status: 'warning',
    temperature: 34.8,
    humidity: 74,
    weight: 31.0,
    soundFrequency: 260,
    soundLabel: 'Agitated Wing Flapping (260 Hz)',
    activityLevel: 'Elevated',
    alertMessage: 'Hive 03 needs attention: internal temperature elevated (+6.6°C) and higher acoustic vibration. Check ventilation and water source.'
  },
  {
    id: 'HIVE-04',
    name: 'Hive 04 — Pine Forest Edge',
    status: 'healthy',
    temperature: 28.0,
    humidity: 60,
    weight: 41.8,
    soundFrequency: 182,
    soundLabel: 'Steady Brood Thermal Rhythm (182 Hz)',
    activityLevel: 'Normal'
  }
];
