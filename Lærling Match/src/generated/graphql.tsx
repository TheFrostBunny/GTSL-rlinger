import { offlineExchange } from '@urql/exchange-graphcache';
import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Success: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type CreateStudentInput = {
  readonly afterApprenticeShip?: InputMaybe<Scalars['String']['input']>;
  readonly certificates?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly description?: InputMaybe<Scalars['String']['input']>;
  readonly email: Scalars['String']['input'];
  readonly line?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
  readonly password?: InputMaybe<Scalars['String']['input']>;
  readonly profileImage?: InputMaybe<Scalars['String']['input']>;
  readonly socialMedias?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly trade?: InputMaybe<Trades>;
};

export type CreateStudentPayload = {
  readonly __typename?: 'CreateStudentPayload';
  readonly query: Query;
  readonly student?: Maybe<Student>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createStudent: CreateStudentPayload;
  readonly updateStudent: UpdateStudentPayload;
};


export type MutationCreateStudentArgs = {
  input: CreateStudentInput;
};


export type MutationUpdateStudentArgs = {
  input: UpdateStudentInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  readonly id: Scalars['ID']['output'];
};

export type Query = {
  readonly __typename?: 'Query';
  readonly me?: Maybe<Student>;
  /** Fetches an object given its ID. */
  readonly node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  readonly nodes: ReadonlyArray<Maybe<Node>>;
  readonly student?: Maybe<Student>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: ReadonlyArray<Scalars['ID']['input']>;
};


export type QueryStudentArgs = {
  studentId: Scalars['ID']['input'];
};

export type Student = Node & {
  readonly __typename?: 'Student';
  readonly afterApprenticeShip?: Maybe<Scalars['String']['output']>;
  readonly certificates?: Maybe<ReadonlyArray<StudentCertificates>>;
  readonly credential?: Maybe<StudentCredential>;
  readonly description?: Maybe<Scalars['String']['output']>;
  readonly email?: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly line?: Maybe<Scalars['String']['output']>;
  readonly mediaLinks?: Maybe<ReadonlyArray<StudentSocialMedia>>;
  readonly name?: Maybe<Scalars['String']['output']>;
  readonly profileImage?: Maybe<Scalars['String']['output']>;
  readonly wantedTrade?: Maybe<Trades>;
};

export type StudentCertificates = {
  readonly __typename?: 'StudentCertificates';
  readonly description?: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['Int']['output'];
  readonly student?: Maybe<Student>;
  readonly studentId: Scalars['Int']['output'];
};

export type StudentCredential = {
  readonly __typename?: 'StudentCredential';
  readonly passwordHash: Scalars['String']['output'];
  readonly student: Student;
  readonly studentId: Scalars['Int']['output'];
};

export type StudentSocialMedia = {
  readonly __typename?: 'StudentSocialMedia';
  readonly id: Scalars['Int']['output'];
  readonly mediaUrl?: Maybe<Scalars['String']['output']>;
  readonly student: Student;
  readonly studentId: Scalars['Int']['output'];
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  readonly onStudentCreated: Student;
};

export enum Trades {
  ActivitiesWorker = 'ACTIVITIES_WORKER',
  AgriculturalMachineryMechanic = 'AGRICULTURAL_MACHINERY_MECHANIC',
  Agronomist = 'AGRONOMIST',
  AircraftEngineMechanic = 'AIRCRAFT_ENGINE_MECHANIC',
  AircraftStructureMechanic = 'AIRCRAFT_STRUCTURE_MECHANIC',
  AircraftSystemsMechanic = 'AIRCRAFT_SYSTEMS_MECHANIC',
  AluminumFabricator = 'ALUMINUM_FABRICATOR',
  AmbulanceWorker = 'AMBULANCE_WORKER',
  AnimalCareWorker = 'ANIMAL_CARE_WORKER',
  AquacultureTechnician = 'AQUACULTURE_TECHNICIAN',
  AquacultureWorker = 'AQUACULTURE_WORKER',
  AsphaltWorker = 'ASPHALT_WORKER',
  AutomationTechnician = 'AUTOMATION_TECHNICIAN',
  AutomotiveUpholsterer = 'AUTOMOTIVE_UPHOLSTERER',
  AutoBodyRepairer = 'AUTO_BODY_REPAIRER',
  AvionicsTechnician = 'AVIONICS_TECHNICIAN',
  Baker = 'BAKER',
  BasketMaker = 'BASKET_MAKER',
  BicycleMechanic = 'BICYCLE_MECHANIC',
  Blacksmith = 'BLACKSMITH',
  Bookbinder = 'BOOKBINDER',
  BrandingSignageDesigner = 'BRANDING_SIGNAGE_DESIGNER',
  BricklayerAndTiler = 'BRICKLAYER_AND_TILER',
  BronzeCaster = 'BRONZE_CASTER',
  BuildingAssembler = 'BUILDING_ASSEMBLER',
  BuildingOperationsTechnician = 'BUILDING_OPERATIONS_TECHNICIAN',
  BunadMaker = 'BUNAD_MAKER',
  Butcher = 'BUTCHER',
  Carpenter = 'CARPENTER',
  CarDetailer = 'CAR_DETAILER',
  CarMechanic = 'CAR_MECHANIC',
  CarPainter = 'CAR_PAINTER',
  Ceramicist = 'CERAMICIST',
  ChassisBodyBuilder = 'CHASSIS_BODY_BUILDER',
  ChemicalProcessIndustryOperator = 'CHEMICAL_PROCESS_INDUSTRY_OPERATOR',
  ChildAndYouthCareWorker = 'CHILD_AND_YOUTH_CARE_WORKER',
  CleaningOperator = 'CLEANING_OPERATOR',
  CncOperator = 'CNC_OPERATOR',
  CoilWinder = 'COIL_WINDER',
  CompositeBoatBuilder = 'COMPOSITE_BOAT_BUILDER',
  ConcreteWorker = 'CONCRETE_WORKER',
  ConstructionMachineryMechanic = 'CONSTRUCTION_MACHINERY_MECHANIC',
  ConstructionMachineOperator = 'CONSTRUCTION_MACHINE_OPERATOR',
  ConstructionPlumber = 'CONSTRUCTION_PLUMBER',
  ContentProducer = 'CONTENT_PRODUCER',
  Cook = 'COOK',
  Cooper = 'COOPER',
  CostumeSeamstress = 'COSTUME_SEAMSTRESS',
  CraneAndLiftingOperationsTechnician = 'CRANE_AND_LIFTING_OPERATIONS_TECHNICIAN',
  DataElectronicsTechnician = 'DATA_ELECTRONICS_TECHNICIAN',
  Deckhand = 'DECKHAND',
  DentalSecretary = 'DENTAL_SECRETARY',
  DimensionalInspector = 'DIMENSIONAL_INSPECTOR',
  DressmakerAndCostumeSeamstress = 'DRESSMAKER_AND_COSTUME_SEAMSTRESS',
  DrillingAndMaintenanceOperator = 'DRILLING_AND_MAINTENANCE_OPERATOR',
  DroneOperator = 'DRONE_OPERATOR',
  ElectricalRepairTechnician = 'ELECTRICAL_REPAIR_TECHNICIAN',
  Electrician = 'ELECTRICIAN',
  ElevatorInstaller = 'ELEVATOR_INSTALLER',
  EnergyOperator = 'ENERGY_OPERATOR',
  EngineMechanic = 'ENGINE_MECHANIC',
  Engraver = 'ENGRAVER',
  EquineProfessional = 'EQUINE_PROFESSIONAL',
  ExhibitionDesigner = 'EXHIBITION_DESIGNER',
  Farrier = 'FARRIER',
  FiligreeSilversmith = 'FILIGREE_SILVERSMITH',
  FirePreventionOfficer = 'FIRE_PREVENTION_OFFICER',
  Fisher = 'FISHER',
  Florist = 'FLORIST',
  FootTherapist = 'FOOT_THERAPIST',
  ForestryMachineOperator = 'FORESTRY_MACHINE_OPERATOR',
  ForkliftAndLiftMechanic = 'FORKLIFT_AND_LIFT_MECHANIC',
  FoundationWorker = 'FOUNDATION_WORKER',
  FreshGoodsSpecialist = 'FRESH_GOODS_SPECIALIST',
  FurnitureCarpenter = 'FURNITURE_CARPENTER',
  FurnitureUpholsterer = 'FURNITURE_UPHOLSTERER',
  Furrier = 'FURRIER',
  Gardener = 'GARDENER',
  Gilder = 'GILDER',
  Glassblower = 'GLASSBLOWER',
  GlassGrinder = 'GLASS_GRINDER',
  Glazier = 'GLAZIER',
  Goldsmith = 'GOLDSMITH',
  Gunsmith = 'GUNSMITH',
  Hairdresser = 'HAIRDRESSER',
  HandWeaver = 'HAND_WEAVER',
  HealthcareWorker = 'HEALTHCARE_WORKER',
  HornAndMetalCraftsperson = 'HORN_AND_METAL_CRAFTSPERSON',
  HospitalPorter = 'HOSPITAL_PORTER',
  IndustrialAssembler = 'INDUSTRIAL_ASSEMBLER',
  IndustrialCarpenter = 'INDUSTRIAL_CARPENTER',
  IndustrialFoodProductionWorker = 'INDUSTRIAL_FOOD_PRODUCTION_WORKER',
  IndustrialMechanic = 'INDUSTRIAL_MECHANIC',
  IndustrialPainter = 'INDUSTRIAL_PAINTER',
  IndustrialPipefitter = 'INDUSTRIAL_PIPEFITTER',
  IndustrialSurfaceTreatmentTechnician = 'INDUSTRIAL_SURFACE_TREATMENT_TECHNICIAN',
  IndustrialSurveyor = 'INDUSTRIAL_SURVEYOR',
  IndustrialTextilesWorker = 'INDUSTRIAL_TEXTILES_WORKER',
  IndustrialUpholsterer = 'INDUSTRIAL_UPHOLSTERER',
  InsulationWorker = 'INSULATION_WORKER',
  InteriorConsultant = 'INTERIOR_CONSULTANT',
  ItDeveloper = 'IT_DEVELOPER',
  ItOperationsTechnician = 'IT_OPERATIONS_TECHNICIAN',
  Joiner = 'JOINER',
  KnittingArtisan = 'KNITTING_ARTISAN',
  LaboratoryTechnician = 'LABORATORY_TECHNICIAN',
  Landscaper = 'LANDSCAPER',
  LaundryOperator = 'LAUNDRY_OPERATOR',
  LeatherAndFurCraftsperson = 'LEATHER_AND_FUR_CRAFTSPERSON',
  Locksmith = 'LOCKSMITH',
  LogisticsOperator = 'LOGISTICS_OPERATOR',
  MakeupAndWigArtist = 'MAKEUP_AND_WIG_ARTIST',
  MarineElectrician = 'MARINE_ELECTRICIAN',
  MarineEngineMechanic = 'MARINE_ENGINE_MECHANIC',
  MeatCutter = 'MEAT_CUTTER',
  MediaDesigner = 'MEDIA_DESIGNER',
  MediaTechnician = 'MEDIA_TECHNICIAN',
  MedicalSecretary = 'MEDICAL_SECRETARY',
  MenswearTailor = 'MENSWEAR_TAILOR',
  Milliner = 'MILLINER',
  MiningAndQuarryWorker = 'MINING_AND_QUARRY_WORKER',
  ModelMaker = 'MODEL_MAKER',
  MotorcycleMechanic = 'MOTORCYCLE_MECHANIC',
  NdtInspector = 'NDT_INSPECTOR',
  NutritionCook = 'NUTRITION_COOK',
  OnshoreWellDriller = 'ONSHORE_WELL_DRILLER',
  OptronicsTechnician = 'OPTRONICS_TECHNICIAN',
  OrganBuilder = 'ORGAN_BUILDER',
  OrthopedicTechnician = 'ORTHOPEDIC_TECHNICIAN',
  Painter = 'PAINTER',
  PastryChef = 'PASTRY_CHEF',
  PharmacyTechnician = 'PHARMACY_TECHNICIAN',
  PlasterMoldMaker = 'PLASTER_MOLD_MAKER',
  PlasticsTechnician = 'PLASTICS_TECHNICIAN',
  PlateWorker = 'PLATE_WORKER',
  Plumber = 'PLUMBER',
  PolymerCompositesTechnician = 'POLYMER_COMPOSITES_TECHNICIAN',
  PowerLineTechnician = 'POWER_LINE_TECHNICIAN',
  PrecisionMechanic = 'PRECISION_MECHANIC',
  ProductionElectronicsTechnician = 'PRODUCTION_ELECTRONICS_TECHNICIAN',
  ProductionTechnologyWorker = 'PRODUCTION_TECHNOLOGY_WORKER',
  ProductionTechnologyWorker2 = 'PRODUCTION_TECHNOLOGY_WORKER2',
  ProfessionalDriver = 'PROFESSIONAL_DRIVER',
  RailwaySignalingTechnician = 'RAILWAY_SIGNALING_TECHNICIAN',
  RailwayTrackInstaller = 'RAILWAY_TRACK_INSTALLER',
  RecyclingOperator = 'RECYCLING_OPERATOR',
  RefrigerationAndHeatPumpTechnician = 'REFRIGERATION_AND_HEAT_PUMP_TECHNICIAN',
  ReindeerHusbandryWorker = 'REINDEER_HUSBANDRY_WORKER',
  RemoteOperatedVehicleOperator = 'REMOTE_OPERATED_VEHICLE_OPERATOR',
  RoadAndConstructionWorker = 'ROAD_AND_CONSTRUCTION_WORKER',
  RoadOperationsAndMaintenanceWorker = 'ROAD_OPERATIONS_AND_MAINTENANCE_WORKER',
  RoofingAndMembraneInstaller = 'ROOFING_AND_MEMBRANE_INSTALLER',
  Ropemaker = 'ROPEMAKER',
  Saddler = 'SADDLER',
  Sailmaker = 'SAILMAKER',
  SalesAssistant = 'SALES_ASSISTANT',
  SausageMaker = 'SAUSAGE_MAKER',
  Scaffolder = 'SCAFFOLDER',
  ScreenPrinter = 'SCREEN_PRINTER',
  SeafoodProductionWorker = 'SEAFOOD_PRODUCTION_WORKER',
  SecurityGuard = 'SECURITY_GUARD',
  ServiceAndAdministrationWorker = 'SERVICE_AND_ADMINISTRATION_WORKER',
  SheetMetalWorker = 'SHEET_METAL_WORKER',
  Shoemaker = 'SHOEMAKER',
  Silversmith = 'SILVERSMITH',
  SkinTherapist = 'SKIN_THERAPIST',
  SpaceTechnologist = 'SPACE_TECHNOLOGIST',
  SparePartsClerk = 'SPARE_PARTS_CLERK',
  StainedGlassArtisan = 'STAINED_GLASS_ARTISAN',
  StoneWorker = 'STONE_WORKER',
  SwitchboardAssembler = 'SWITCHBOARD_ASSEMBLER',
  Taxidermist = 'TAXIDERMIST',
  TelecommunicationsInstaller = 'TELECOMMUNICATIONS_INSTALLER',
  TextileCleaner = 'TEXTILE_CLEANER',
  TextileCraftsperson = 'TEXTILE_CRAFTSPERSON',
  TimberAndGlulamProductionWorker = 'TIMBER_AND_GLULAM_PRODUCTION_WORKER',
  Toolmaker = 'TOOLMAKER',
  TourismServiceWorker = 'TOURISM_SERVICE_WORKER',
  TrainElectrician = 'TRAIN_ELECTRICIAN',
  VentilationTechnician = 'VENTILATION_TECHNICIAN',
  Waiter = 'WAITER',
  Watchmaker = 'WATCHMAKER',
  Welder = 'WELDER',
  WellOperator = 'WELL_OPERATOR',
  WheelEquipmentRepairer = 'WHEEL_EQUIPMENT_REPAIRER',
  Woodcarver = 'WOODCARVER',
  WoodenBoatBuilder = 'WOODEN_BOAT_BUILDER',
  Woodturner = 'WOODTURNER',
  WoodCraftsperson = 'WOOD_CRAFTSPERSON',
  WoolAndYarnCraftsperson = 'WOOL_AND_YARN_CRAFTSPERSON'
}

export type UpdateStudentInput = {
  readonly afterApprenticeShip?: InputMaybe<Scalars['String']['input']>;
  readonly certificates?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly description?: InputMaybe<Scalars['String']['input']>;
  readonly email: Scalars['String']['input'];
  readonly line?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
  readonly newPassword?: InputMaybe<Scalars['String']['input']>;
  readonly profileImage?: InputMaybe<Scalars['String']['input']>;
  readonly socialMedias?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly studentId: Scalars['ID']['input'];
  readonly trade?: InputMaybe<Trades>;
};

export type UpdateStudentPayload = {
  readonly __typename?: 'UpdateStudentPayload';
  readonly query: Query;
  readonly student?: Maybe<Student>;
};

export type CreateStudentMutationVariables = Exact<{
  input: CreateStudentInput;
}>;


export type CreateStudentMutation = { readonly __typename?: 'Mutation', readonly createStudent: { readonly __typename?: 'CreateStudentPayload', readonly student?: { readonly __typename?: 'Student', readonly id: string, readonly name?: string | null, readonly email?: string | null, readonly description?: string | null, readonly wantedTrade?: Trades | null, readonly line?: string | null, readonly profileImage?: string | null, readonly mediaLinks?: ReadonlyArray<{ readonly __typename?: 'StudentSocialMedia', readonly mediaUrl?: string | null }> | null, readonly certificates?: ReadonlyArray<{ readonly __typename?: 'StudentCertificates', readonly description?: string | null }> | null } | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { readonly __typename?: 'Query', readonly me?: { readonly __typename?: 'Student', readonly id: string, readonly name?: string | null, readonly email?: string | null, readonly wantedTrade?: Trades | null, readonly line?: string | null, readonly profileImage?: string | null, readonly mediaLinks?: ReadonlyArray<{ readonly __typename?: 'StudentSocialMedia', readonly mediaUrl?: string | null }> | null, readonly certificates?: ReadonlyArray<{ readonly __typename?: 'StudentCertificates', readonly description?: string | null }> | null } | null };

export type GetStudentQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type GetStudentQuery = { readonly __typename?: 'Query', readonly student?: { readonly __typename?: 'Student', readonly id: string, readonly name?: string | null, readonly email?: string | null, readonly description?: string | null, readonly wantedTrade?: Trades | null, readonly line?: string | null, readonly profileImage?: string | null, readonly mediaLinks?: ReadonlyArray<{ readonly __typename?: 'StudentSocialMedia', readonly mediaUrl?: string | null }> | null, readonly certificates?: ReadonlyArray<{ readonly __typename?: 'StudentCertificates', readonly description?: string | null }> | null } | null };

export type MeFragment = { readonly __typename?: 'Student', readonly id: string, readonly name?: string | null, readonly email?: string | null, readonly wantedTrade?: Trades | null, readonly line?: string | null, readonly profileImage?: string | null, readonly mediaLinks?: ReadonlyArray<{ readonly __typename?: 'StudentSocialMedia', readonly mediaUrl?: string | null }> | null, readonly certificates?: ReadonlyArray<{ readonly __typename?: 'StudentCertificates', readonly description?: string | null }> | null };

export type StudentFragment = { readonly __typename?: 'Student', readonly id: string, readonly name?: string | null, readonly email?: string | null, readonly description?: string | null, readonly wantedTrade?: Trades | null, readonly line?: string | null, readonly profileImage?: string | null, readonly mediaLinks?: ReadonlyArray<{ readonly __typename?: 'StudentSocialMedia', readonly mediaUrl?: string | null }> | null, readonly certificates?: ReadonlyArray<{ readonly __typename?: 'StudentCertificates', readonly description?: string | null }> | null };

export type UpdateStudentMutationVariables = Exact<{
  input: UpdateStudentInput;
}>;


export type UpdateStudentMutation = { readonly __typename?: 'Mutation', readonly updateStudent: { readonly __typename?: 'UpdateStudentPayload', readonly student?: { readonly __typename?: 'Student', readonly id: string, readonly name?: string | null, readonly email?: string | null, readonly description?: string | null, readonly wantedTrade?: Trades | null, readonly line?: string | null, readonly profileImage?: string | null, readonly mediaLinks?: ReadonlyArray<{ readonly __typename?: 'StudentSocialMedia', readonly mediaUrl?: string | null }> | null, readonly certificates?: ReadonlyArray<{ readonly __typename?: 'StudentCertificates', readonly description?: string | null }> | null } | null } };

export const MeFragmentDoc = gql`
    fragment Me on Student {
  id
  name
  email
  wantedTrade
  line
  profileImage
  mediaLinks {
    mediaUrl
  }
  certificates {
    description
  }
}
    `;
export const StudentFragmentDoc = gql`
    fragment Student on Student {
  id
  name
  email
  description
  wantedTrade
  line
  profileImage
  mediaLinks {
    mediaUrl
  }
  certificates {
    description
  }
}
    `;
export const CreateStudentDocument = gql`
    mutation CreateStudent($input: CreateStudentInput!) {
  createStudent(input: $input) {
    student {
      ...Student
    }
  }
}
    ${StudentFragmentDoc}`;

export function useCreateStudentMutation() {
  return Urql.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument);
};
export const GetMeDocument = gql`
    query GetMe {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;

export function useGetMeQuery(options?: Omit<Urql.UseQueryArgs<GetMeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMeQuery, GetMeQueryVariables>({ query: GetMeDocument, ...options });
};
export const GetStudentDocument = gql`
    query GetStudent($studentId: ID!) {
  student(studentId: $studentId) {
    ...Student
  }
}
    ${StudentFragmentDoc}`;

export function useGetStudentQuery(options: Omit<Urql.UseQueryArgs<GetStudentQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentQuery, GetStudentQueryVariables>({ query: GetStudentDocument, ...options });
};
export const UpdateStudentDocument = gql`
    mutation UpdateStudent($input: UpdateStudentInput!) {
  updateStudent(input: $input) {
    student {
      ...Student
    }
  }
}
    ${StudentFragmentDoc}`;

export function useUpdateStudentMutation() {
  return Urql.useMutation<UpdateStudentMutation, UpdateStudentMutationVariables>(UpdateStudentDocument);
};
export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  CreateStudentPayload?: (data: WithTypename<CreateStudentPayload>) => null | string,
  Student?: (data: WithTypename<Student>) => null | string,
  StudentCertificates?: (data: WithTypename<StudentCertificates>) => null | string,
  StudentCredential?: (data: WithTypename<StudentCredential>) => null | string,
  StudentSocialMedia?: (data: WithTypename<StudentSocialMedia>) => null | string,
  UpdateStudentPayload?: (data: WithTypename<UpdateStudentPayload>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<Student> | string>,
    node?: GraphCacheResolver<WithTypename<Query>, QueryNodeArgs, WithTypename<Student> | string>,
    nodes?: GraphCacheResolver<WithTypename<Query>, QueryNodesArgs, Array<WithTypename<Student> | string>>,
    student?: GraphCacheResolver<WithTypename<Query>, QueryStudentArgs, WithTypename<Student> | string>
  },
  CreateStudentPayload?: {
    query?: GraphCacheResolver<WithTypename<CreateStudentPayload>, Record<string, never>, WithTypename<Query> | string>,
    student?: GraphCacheResolver<WithTypename<CreateStudentPayload>, Record<string, never>, WithTypename<Student> | string>
  },
  Student?: {
    afterApprenticeShip?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Scalars['String'] | string>,
    certificates?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Array<WithTypename<StudentCertificates> | string>>,
    credential?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, WithTypename<StudentCredential> | string>,
    description?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Scalars['ID'] | string>,
    line?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Scalars['String'] | string>,
    mediaLinks?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Array<WithTypename<StudentSocialMedia> | string>>,
    name?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Scalars['String'] | string>,
    profileImage?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Scalars['String'] | string>,
    wantedTrade?: GraphCacheResolver<WithTypename<Student>, Record<string, never>, Trades | string>
  },
  StudentCertificates?: {
    description?: GraphCacheResolver<WithTypename<StudentCertificates>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<StudentCertificates>, Record<string, never>, Scalars['Int'] | string>,
    student?: GraphCacheResolver<WithTypename<StudentCertificates>, Record<string, never>, WithTypename<Student> | string>,
    studentId?: GraphCacheResolver<WithTypename<StudentCertificates>, Record<string, never>, Scalars['Int'] | string>
  },
  StudentCredential?: {
    passwordHash?: GraphCacheResolver<WithTypename<StudentCredential>, Record<string, never>, Scalars['String'] | string>,
    student?: GraphCacheResolver<WithTypename<StudentCredential>, Record<string, never>, WithTypename<Student> | string>,
    studentId?: GraphCacheResolver<WithTypename<StudentCredential>, Record<string, never>, Scalars['Int'] | string>
  },
  StudentSocialMedia?: {
    id?: GraphCacheResolver<WithTypename<StudentSocialMedia>, Record<string, never>, Scalars['Int'] | string>,
    mediaUrl?: GraphCacheResolver<WithTypename<StudentSocialMedia>, Record<string, never>, Scalars['String'] | string>,
    student?: GraphCacheResolver<WithTypename<StudentSocialMedia>, Record<string, never>, WithTypename<Student> | string>,
    studentId?: GraphCacheResolver<WithTypename<StudentSocialMedia>, Record<string, never>, Scalars['Int'] | string>
  },
  UpdateStudentPayload?: {
    query?: GraphCacheResolver<WithTypename<UpdateStudentPayload>, Record<string, never>, WithTypename<Query> | string>,
    student?: GraphCacheResolver<WithTypename<UpdateStudentPayload>, Record<string, never>, WithTypename<Student> | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  createStudent?: GraphCacheOptimisticMutationResolver<MutationCreateStudentArgs, WithTypename<CreateStudentPayload>>,
  updateStudent?: GraphCacheOptimisticMutationResolver<MutationUpdateStudentArgs, WithTypename<UpdateStudentPayload>>
};

export type GraphCacheUpdaters = {
  Query?: {
    me?: GraphCacheUpdateResolver<{ me: Maybe<WithTypename<Student>> }, Record<string, never>>,
    node?: GraphCacheUpdateResolver<{ node: Maybe<WithTypename<Student>> }, QueryNodeArgs>,
    nodes?: GraphCacheUpdateResolver<{ nodes: Array<WithTypename<Student>> }, QueryNodesArgs>,
    student?: GraphCacheUpdateResolver<{ student: Maybe<WithTypename<Student>> }, QueryStudentArgs>
  },
  Mutation?: {
    createStudent?: GraphCacheUpdateResolver<{ createStudent: WithTypename<CreateStudentPayload> }, MutationCreateStudentArgs>,
    updateStudent?: GraphCacheUpdateResolver<{ updateStudent: WithTypename<UpdateStudentPayload> }, MutationUpdateStudentArgs>
  },
  Subscription?: {
    onStudentCreated?: GraphCacheUpdateResolver<{ onStudentCreated: WithTypename<Student> }, Record<string, never>>
  },
  CreateStudentPayload?: {
    query?: GraphCacheUpdateResolver<Maybe<WithTypename<CreateStudentPayload>>, Record<string, never>>,
    student?: GraphCacheUpdateResolver<Maybe<WithTypename<CreateStudentPayload>>, Record<string, never>>
  },
  Student?: {
    afterApprenticeShip?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    certificates?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    credential?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    line?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    mediaLinks?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    profileImage?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>,
    wantedTrade?: GraphCacheUpdateResolver<Maybe<WithTypename<Student>>, Record<string, never>>
  },
  StudentCertificates?: {
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentCertificates>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentCertificates>>, Record<string, never>>,
    student?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentCertificates>>, Record<string, never>>,
    studentId?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentCertificates>>, Record<string, never>>
  },
  StudentCredential?: {
    passwordHash?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentCredential>>, Record<string, never>>,
    student?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentCredential>>, Record<string, never>>,
    studentId?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentCredential>>, Record<string, never>>
  },
  StudentSocialMedia?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentSocialMedia>>, Record<string, never>>,
    mediaUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentSocialMedia>>, Record<string, never>>,
    student?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentSocialMedia>>, Record<string, never>>,
    studentId?: GraphCacheUpdateResolver<Maybe<WithTypename<StudentSocialMedia>>, Record<string, never>>
  },
  UpdateStudentPayload?: {
    query?: GraphCacheUpdateResolver<Maybe<WithTypename<UpdateStudentPayload>>, Record<string, never>>,
    student?: GraphCacheUpdateResolver<Maybe<WithTypename<UpdateStudentPayload>>, Record<string, never>>
  },
};

export type GraphCacheConfig = Parameters<typeof offlineExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};