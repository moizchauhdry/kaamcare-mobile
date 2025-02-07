import type { StackNavigationOptions } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from 'config/Theme';
import { ModalGrabber } from 'components/UI/ModalGrabber/ModalGrabber';
import { ModalChevronBack } from 'components/UI/ModalChevronBack/ModalChevronBack';
import { MedicalHistoryScreen } from 'screens/MedicalData/MedicalHistoryScreen/MedicalHistoryScreen';
import { AllergiesScreen } from 'screens/MedicalData/MedicalHistoryScreen/Allergies/AllergiesScreen';
import { AddAllergyScreen } from 'screens/MedicalData/MedicalHistoryScreen/Allergies/AddAllergy/AddAllergyScreen';
import { DiagnosisFormScreen } from 'screens/MedicalData/MedicalHistoryScreen/DiagnosisHistory/DiagnosisForm/DiagnosisFormScreen';
import { SelectDiagnosisScreen } from 'screens/MedicalData/MedicalHistoryScreen/DiagnosisHistory/SelectDiagnosis/SelectDiagnosisScreen';
import { IntroScreen } from 'screens/MedicalData/PillTrackerScreen/Intro/IntroScreen';
import { PillTrackerHomeScreen } from 'screens/MedicalData/PillTrackerScreen/Home';

import { AddMedicalDataHomeScreen } from '../../screens/MedicalData/AddMedicalDataHomeScreen/AddMedicalDataHomeScreen';
import { MedicalLogsScreen } from '../../screens/MedicalData/MedicalLogsScreen/MedicalLogsScreen';
import { PrimaryPreventionScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/PrimaryPreventionScreen';
import { GoalsOfCareScreen } from '../../screens/MedicalData/GoalsOfCareScreen/GoalsOfCareScreen';
import { SelectAllergyScreen } from '../../screens/MedicalData/MedicalHistoryScreen/Allergies/SelectAllergy/SelectAllergyScreen';
import { MedicationsScreen } from '../../screens/MedicalData/MedicalHistoryScreen/Medications/MedicationsScreen';
import { SelectMedicationScreen } from '../../screens/MedicalData/MedicalHistoryScreen/Medications/SelectMedication/SelectMedicationScreen';
import { MedicationFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/Medications/MedicationForm/MedicationFormScreen';
import { SocialHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SocialHistory/SocialHistoryScreen';
import { SmokingFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SocialHistory/SmokingForm/SmokingFormScreen';
import { AlcoholFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SocialHistory/AlcoholForm/AlcoholFormScreen';
import { OccupationFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SocialHistory/OccupationForm/OccupationFormScreen';
import { DrugFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SocialHistory/DrugForm/DrugFormScreen';
import { MedicalDevicesScreen } from '../../screens/MedicalData/MedicalHistoryScreen/MedicalDevices/MedicalDevicesScreen';
import { SelectMedicalDeviceScreen } from '../../screens/MedicalData/MedicalHistoryScreen/MedicalDevices/SelectMedicalDevice/SelectMedicalDeviceScreen';
import { MedicalDeviceFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/MedicalDevices/MedicalDeviceForm/MedicalDeviceFormScreen';
import { DentalHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/DentalHistory/DentalHistoryScreen';
import { SelectDiagnosisScreen as SelectDentalDiagnosisScreen } from '../../screens/MedicalData/MedicalHistoryScreen/DentalHistory/Diagnosis/SelectDiagnosisScreen';
import { SelectProstheticsScreen } from '../../screens/MedicalData/MedicalHistoryScreen/DentalHistory/Prosthetics/SelectProstheticsScreen';
import { DentalHistoryFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/DentalHistory/DentalHistoryFormScreen';
import { VisionHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/VisionHistory/VisionHistoryScreen';
import type { VisionHistoryName } from '../../constants/query/visionHistory';
import { EyeWearSelectScreen } from '../../screens/MedicalData/MedicalHistoryScreen/VisionHistory/EyeWear/EyeWearSelectScreen';
import { VisionDiagnosisSelectScreen } from '../../screens/MedicalData/MedicalHistoryScreen/VisionHistory/VisionDiagnosis/VisionDiagnosisSelectScreen';
import { VisionHistoryFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/VisionHistory/VisionHistoryFormScreen';
import { SurgicalHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SurgicalHistory/SurgicalHistoryScreen';
import { SelectSurgicalHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SurgicalHistory/SelectSurgicalHistory/SelectSurgicalHistoryScreen';
import { SurgicalHistoryFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/SurgicalHistory/SurgicalHistoryForm/SurgicalHistoryFormScreen';
import { HearingHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/HearingHistory/HearingHistoryScreen';
import { SelectHearingDiagnosisScreen } from '../../screens/MedicalData/MedicalHistoryScreen/HearingHistory/Diagnosis/SelectHearingDiagnosisScreen';
import type { HearingHistoryName } from '../../constants/query/hearingHistory';
import { SelectHearingAidsAndImplantsScreen } from '../../screens/MedicalData/MedicalHistoryScreen/HearingHistory/AidsAndImplants/SelectHearingAidsAndImplantsScreen';
import { SelectHearingTestsScreen } from '../../screens/MedicalData/MedicalHistoryScreen/HearingHistory/Tests/SelectHearingTestsScreen';
import { HearingHistoryFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/HearingHistory/HearingHistoryFormScreen';
import { BloodPressureFormScreen } from '../../screens/MedicalData/MedicalLogsScreen/BloodPressure/BloodPressureForm/BloodPressureFormScreen';
import { BloodPressureScreen } from '../../screens/MedicalData/MedicalLogsScreen/BloodPressure/BloodPressureScreen';
import type { DentalHistoryName } from '../../model/api/medicalHistory/DentalHistory';
import { BloodSugarFormScreen } from '../../screens/MedicalData/MedicalLogsScreen/BloodSugar/BloodSugarForm/BloodSugarFormScreen';
import { BloodSugarScreen } from '../../screens/MedicalData/MedicalLogsScreen/BloodSugar/BloodSugarScreen';
import { WeightScreen } from '../../screens/MedicalData/MedicalLogsScreen/Weight/WeightScreen';
import { WeightFormScreen } from '../../screens/MedicalData/MedicalLogsScreen/Weight/WeightForm/WeightFormScreen';
import { HeightScreen } from '../../screens/MedicalData/MedicalLogsScreen/Height/HeightScreen';
import { HeightFormScreen } from '../../screens/MedicalData/MedicalLogsScreen/Height/HeightForm/HeightFormScreen';
import { SaturationScreen } from '../../screens/MedicalData/MedicalLogsScreen/Saturation/SaturationScreen';
import { SaturationFormScreen } from '../../screens/MedicalData/MedicalLogsScreen/Saturation/SaturationForm/SaturationFormScreen';
import { DiagnosisHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/DiagnosisHistory/DiagnosisHistoryScreen';
import { FamilyHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/FamilyHistory/FamilyHistoryScreen';
import { FamilyHistoryMemberScreen } from '../../screens/MedicalData/MedicalHistoryScreen/FamilyHistory/FamilyHistoryMember/FamilyHistoryMemberScreen';
import { FamilyMemberFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/FamilyHistory/FamilyMemberForm/FamilyMemberFormScreen';
import { FamilyHistorySelectMedicalHistoryScreen } from '../../screens/MedicalData/MedicalHistoryScreen/FamilyHistory/FamilyHistorySelectMedicalHistory/FamilyHistorySelectMedicalHistoryScreen';
import type { FamilyHistoryApiDiagnosisType } from '../../model/api/medicalHistory/FamilyHistory';
import { FamilyHistorySelectDiagnosisScreen } from '../../screens/MedicalData/MedicalHistoryScreen/FamilyHistory/FamilyHistorySelectDiagnosisScreen/FamilyHistorySelectDiagnosisScreen';
import { FamilyHistoryDiagnosisFormScreen } from '../../screens/MedicalData/MedicalHistoryScreen/FamilyHistory/FamilyHistoryDiagnosisForm/FamilyHistoryDiagnosisFormScreen';
import { ImmunizationScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/Immunization/ImmunizationScreen';
import { SelectVaccineScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/Immunization/SelectVaccine/SelectVaccineScreen';
import { VaccineFormScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/Immunization/VaccineForm/VaccineFormScreen';
import { VaccineCardFormScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/Immunization/VaccineCardForm/VaccineCardFormScreen';
import { ScreeningExamsScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/ScreeningExams/ScreeningExamsScreen';
import { ScreeningExamFormScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/ScreeningExams/ScreeningExamForm/ScreeningExamFormScreen';
import { SelectScreeningExamScreen } from '../../screens/MedicalData/PrimaryPreventionScreen/ScreeningExams/SelectScreeningExam/SelectScreeningExamScreen';
import { ADLScreen } from '../../screens/MedicalData/GoalsOfCareScreen/ADLScreen/ADLScreen';
import { ACPScreen } from '../../screens/MedicalData/GoalsOfCareScreen/ACPScreen/ACPScreen';

export type AddMedicalDataNavigationParamsList = {
  AddMedicalDataHome: undefined;
  MedicalLogs: undefined;
  MedicalHistory: undefined;
  PrimaryPrevention: undefined;
  GoalsOfCare: undefined;

  ADL: undefined;
  ACP: undefined;

  BloodPressure: { type?: string; days?: number };
  BloodPressureForm: { edit: boolean; id?: string; days?: number; type?: string } | undefined;
  BloodSugar: { type?: string; days?: number };
  BloodSugarForm: { edit: boolean; id?: string; days?: number; type?: string } | undefined;
  HeartRate: undefined;
  Saturation: { days?: number };
  SaturationForm: { id?: string; edit?: boolean; days?: number } | undefined;
  Height: { days?: number };
  HeightForm:
    | {
        edit: boolean;
        id?: string;
        redirectScreen?: string;
        isNewest?: boolean;
        days?: number;
      }
    | undefined;
  Weight: { days?: number };
  WeightForm:
    | {
        edit: boolean;
        id?: string;
        redirectScreen?: string;
        isNewest?: boolean;
        days?: number;
      }
    | undefined;

  Allergies: undefined;
  SelectAllergy: undefined;
  AddAllergy: { name: string; edit: boolean; id?: string; isCommonName?: boolean } | undefined;

  VisionHistory: undefined;
  VisionHistorySelectDiagnosis: undefined;
  VisionHistorySelectEyeWear: undefined;
  VisionHistoryForm:
    | { sectionName: VisionHistoryName; name: string; edit: boolean; id?: string; isCommonName?: boolean }
    | undefined;

  DentalHistory: undefined;
  DentalHistorySelectDiagnosis: undefined;
  DentalHistorySelectProsthetics: undefined;
  DentalHistoryForm:
    | { sectionName: DentalHistoryName; name: string; edit: boolean; id?: string; isCommonName?: boolean }
    | undefined;

  HearingHistory: undefined;
  HearingHistorySelectDiagnosis: undefined;
  HearingHistorySelectAids: undefined;
  HearingHistorySelectTests: undefined;
  HearingHistoryForm:
    | { sectionName: HearingHistoryName; name: string; edit: boolean; id?: string; isCommonName?: boolean }
    | undefined;

  Diagnosis: undefined;
  SelectDiagnosis: undefined;
  DiagnosisForm: { name: string; edit: boolean; id?: string; isCommonName?: boolean };

  FamilyHistory: undefined;
  FamilyHistoryMember: { name: string | undefined; id?: string };
  FamilyMemberForm: { name?: string; isEdit: boolean; id?: string };
  FamilyHistorySelectMedicalHistory: { id: string };
  FamilyHistorySelectDiagnosis: { id: string; type: FamilyHistoryApiDiagnosisType };
  FamilyHistoryDiagnosisForm: {
    userId: string;
    id: string;
    type: FamilyHistoryApiDiagnosisType;
    name: string;
    edit: boolean;
    isCommonName?: boolean;
  };

  MedicalDevices: undefined;
  SelectMedicalDevice: undefined;
  MedicalDeviceForm: { name: string; edit: boolean; id?: string; isCommonName?: boolean };

  Medications: undefined;
  SelectMedication: undefined;
  MedicationForm: { name: string; edit: boolean; id?: string; isCommonName?: boolean };

  SocialHistory: undefined;
  SocialHistorySmokingForm: { edit: boolean; id?: string };
  SocialHistoryAlcoholForm: { edit: boolean; id?: string };
  SocialHistoryDrugForm: { edit: boolean; id?: string };
  SocialHistoryOccupationForm: { edit: boolean; id?: string };
  SurgicalHistory: undefined;
  SelectSurgicalHistory: undefined;
  SurgicalHistoryForm: { name: string; edit: boolean; id?: string; isCommonName?: boolean };

  Immunizations: undefined;
  SelectVaccine: undefined;
  VaccineForm: { name: string; subName: string; edit: boolean; id?: string; isCommonName?: boolean };
  VaccineCardForm: { edit: boolean; id?: string };
  ScreeningExams: undefined;
  SelectScreeningExam: undefined;
  ScreeningExamForm: { name: string; edit: boolean; id?: string };
  ScreeningExamCardForm: { edit: boolean; id?: string };

  AddActivitiesOfDailyLiving: undefined;
  ListActivitiesOfDailyLiving: undefined;
  AddAdvancedCarePlanning: undefined;
  ListAdvancedCarePlanning: undefined;
  PillTrackerIntro: undefined;
  PillTrackerHome: undefined;
};

const Stack = createStackNavigator<AddMedicalDataNavigationParamsList>();

const options: StackNavigationOptions = {
  headerBackImage: () => null,
  headerBackTitle: 'Close',
  headerBackTitleVisible: true,
  headerBackTitleStyle: { fontSize: 17, paddingHorizontal: 8, lineHeight: 22 },
  headerTitle: () => <ModalGrabber />,
  headerTitleAlign: 'center',
  headerTintColor: theme.colors.primary,
  headerStyle: { backgroundColor: theme.colors.background, shadowColor: 'transparent' },
};

const cardOptions: StackNavigationOptions = {
  ...options,
  presentation: 'card',
};

const optionsStack: StackNavigationOptions = {
  headerBackImage: () => <ModalChevronBack />,
  headerBackTitleVisible: false,
  headerTitle: () => <ModalGrabber />,
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: theme.colors.background, shadowColor: 'transparent' },
  presentation: 'card',
};

export const AddMedicalDataNavigation = () => (
  <Stack.Navigator screenOptions={{ presentation: 'modal', gestureEnabled: true, gestureDirection: 'vertical' }}>
    <Stack.Group screenOptions={cardOptions}>
      <Stack.Screen name="AddMedicalDataHome" component={AddMedicalDataHomeScreen} />
      <Stack.Screen name="Allergies" component={AllergiesScreen} />
      <Stack.Screen name="Medications" component={MedicationsScreen} />
      <Stack.Screen name="SocialHistory" component={SocialHistoryScreen} />
      <Stack.Screen name="DentalHistory" component={DentalHistoryScreen} />
      <Stack.Screen name="MedicalDevices" component={MedicalDevicesScreen} />
      <Stack.Screen name="VisionHistory" component={VisionHistoryScreen} />
      <Stack.Screen name="SurgicalHistory" component={SurgicalHistoryScreen} />
      <Stack.Screen name="BloodPressure" component={BloodPressureScreen} />
      <Stack.Screen name="BloodSugar" component={BloodSugarScreen} />
      <Stack.Screen name="Weight" component={WeightScreen} />
      <Stack.Screen name="Height" component={HeightScreen} />
      <Stack.Screen name="Saturation" component={SaturationScreen} />
      <Stack.Screen name="Diagnosis" component={DiagnosisHistoryScreen} />
      <Stack.Screen name="FamilyHistory" component={FamilyHistoryScreen} />
    </Stack.Group>
    <Stack.Group screenOptions={optionsStack}>
      <Stack.Screen name="MedicalLogs" component={MedicalLogsScreen} />
      <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
      <Stack.Screen name="PrimaryPrevention" component={PrimaryPreventionScreen} />
      <Stack.Screen name="GoalsOfCare" component={GoalsOfCareScreen} />
      <Stack.Screen name="SelectAllergy" component={SelectAllergyScreen} />
      <Stack.Screen name="AddAllergy" component={AddAllergyScreen} />
      <Stack.Screen name="SelectMedication" component={SelectMedicationScreen} />
      <Stack.Screen name="MedicationForm" component={MedicationFormScreen} />
      <Stack.Screen name="SocialHistorySmokingForm" component={SmokingFormScreen} />
      <Stack.Screen name="SocialHistoryAlcoholForm" component={AlcoholFormScreen} />
      <Stack.Screen name="SocialHistoryOccupationForm" component={OccupationFormScreen} />
      <Stack.Screen name="SocialHistoryDrugForm" component={DrugFormScreen} />
      <Stack.Screen name="SelectMedicalDevice" component={SelectMedicalDeviceScreen} />
      <Stack.Screen name="MedicalDeviceForm" component={MedicalDeviceFormScreen} />
      <Stack.Screen name="DentalHistorySelectDiagnosis" component={SelectDentalDiagnosisScreen} />
      <Stack.Screen name="DentalHistorySelectProsthetics" component={SelectProstheticsScreen} />
      <Stack.Screen name="DentalHistoryForm" component={DentalHistoryFormScreen} />
      <Stack.Screen name="VisionHistorySelectEyeWear" component={EyeWearSelectScreen} />
      <Stack.Screen name="VisionHistorySelectDiagnosis" component={VisionDiagnosisSelectScreen} />
      <Stack.Screen name="VisionHistoryForm" component={VisionHistoryFormScreen} />
      <Stack.Screen name="SelectSurgicalHistory" component={SelectSurgicalHistoryScreen} />
      <Stack.Screen name="SurgicalHistoryForm" component={SurgicalHistoryFormScreen} />
      <Stack.Screen name="HearingHistory" component={HearingHistoryScreen} />
      <Stack.Screen name="HearingHistorySelectDiagnosis" component={SelectHearingDiagnosisScreen} />
      <Stack.Screen name="HearingHistorySelectAids" component={SelectHearingAidsAndImplantsScreen} />
      <Stack.Screen name="HearingHistorySelectTests" component={SelectHearingTestsScreen} />
      <Stack.Screen name="HearingHistoryForm" component={HearingHistoryFormScreen} />
      <Stack.Screen name="BloodPressureForm" component={BloodPressureFormScreen} />
      <Stack.Screen name="BloodSugarForm" component={BloodSugarFormScreen} />
      <Stack.Screen name="WeightForm" component={WeightFormScreen} />
      <Stack.Screen name="HeightForm" component={HeightFormScreen} />
      <Stack.Screen name="SaturationForm" component={SaturationFormScreen} />
      <Stack.Screen name="DiagnosisForm" component={DiagnosisFormScreen} />
      <Stack.Screen name="SelectDiagnosis" component={SelectDiagnosisScreen} />
      <Stack.Screen name="FamilyHistoryMember" component={FamilyHistoryMemberScreen} />
      <Stack.Screen name="FamilyMemberForm" component={FamilyMemberFormScreen} />
      <Stack.Screen name="FamilyHistorySelectMedicalHistory" component={FamilyHistorySelectMedicalHistoryScreen} />
      <Stack.Screen name="FamilyHistorySelectDiagnosis" component={FamilyHistorySelectDiagnosisScreen} />
      <Stack.Screen name="FamilyHistoryDiagnosisForm" component={FamilyHistoryDiagnosisFormScreen} />
      <Stack.Screen name="Immunizations" component={ImmunizationScreen} />
      <Stack.Screen name="SelectVaccine" component={SelectVaccineScreen} />
      <Stack.Screen name="VaccineForm" component={VaccineFormScreen} />
      <Stack.Screen name="VaccineCardForm" component={VaccineCardFormScreen} />
      <Stack.Screen name="ADL" component={ADLScreen} />
      <Stack.Screen name="ACP" component={ACPScreen} />

      <Stack.Screen name="ScreeningExams" component={ScreeningExamsScreen} />
      <Stack.Screen name="SelectScreeningExam" component={SelectScreeningExamScreen} />
      <Stack.Screen name="ScreeningExamForm" component={ScreeningExamFormScreen} />

      <Stack.Screen name="PillTrackerIntro" component={IntroScreen} />
      <Stack.Screen name="PillTrackerHome" component={PillTrackerHomeScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
