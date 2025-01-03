import type { FieldConfigItem } from '../../../model/form/autoForm/autoForm';

export const commonVisionHistoryEyeWearData = [
  { value: 'Glasses', label: 'Glasses' },
  { value: 'Contacts', label: 'Contacts' },
];

export const commonVisionHistoryDiagnosis = [
  { value: 'Presbyopia', label: 'Presbyopia' },
  { value: 'Macular Degeneration', label: 'Macular Degeneration' },
  { value: 'Cataracts', label: 'Cataracts' },
  { value: 'Diabetic Retinopathy', label: 'Diabetic Retinopathy' },
  { value: 'Glaucoma', label: 'Glaucoma' },
  { value: 'Amblyopia', label: 'Amblyopia' },
  { value: 'Colorblindness', label: 'Colorblindness' },
  { value: 'Dry eyes', label: 'Dry eyes' },
  { value: 'Blind', label: 'Blind' },
];

const dataDynamicVisionHistoryDiagnosis = `
Acute atopic conjunctivitis
Anatomical narrow angle
Chronic iridocyclitis
Exudative retinopathy
Exudative retinopathy, bilateral
Filamentary keratitis
Flat anterior chamber hypotony of eye
Focal chorioretinal inflammation, macular or paramacular
Focal chorioretinal inflammation of posterior pole
Focal chorioretinal inflammation, peripheral
Folds and rupture in Bowman's membrane
Folds in Descemet's membrane
Foreign body in conjunctival sac
Foreign body in cornea
Foreign body on external eye
Foster-Kennedy syndrome
Fourth [trochlear] nerve palsy
Fuchs' heterochromic cyclitis
Generalized contraction of visual field
Ghost vessels (corneal)
Glaucoma secondary to eye inflammation
Glaucoma secondary to eye trauma
Glaucoma secondary to drugs
Glaucoma with increased episcleral venous pressure
Gluteal tendinitis
Goniosynechiae
Harada's disease
Hemophthalmos
Homonymous bilateral field defects
Horseshoe tear of retina without detachment
Hypermetropia
Hypersecretion glaucoma
Hypertensive retinopathy
Hypertrichosis
Hyphema
Hypopyon
Idiopathic cysts of iris, ciliary body or anterior chamber
Implant cysts of iris, ciliary body or ant chamber
Infantile and juvenile cataract
Conjunctiva and corneal abrasion
Intermittent angle-closure glaucoma
Intermittent exophthalmos
Intermittent monocular esotropia
Internal ophthalmoplegia (complete) (total)
Iridoschisis
Iris atrophy (essential) (progressive)
Astigmatism
Ischemic optic neuropathy
Marginal corneal ulcer
Mechanical complication of prosthetic orbit
Mechanical ptosis of eyelid
Mechanical strabismus
Microcystoid degeneration of retina
Minor opacity of cornea
Miotic pupillary cyst
Monocular esotropia
Monocular esotropia with A pattern
Monocular esotropia with other noncomitancies
Monocular esotropia with V pattern
Monocular exotropia
Monocular exotropia with A pattern
Monocular exotropia with other noncomitancies
Monocular exotropia with V pattern
Mooren's corneal ulcer
Multiple defects of retina without detachment
Mycotic corneal ulcer
Myogenic ptosis of bilateral eyelids
Myopia
Neurotrophic keratoconjunctivitis
Nodular corneal degeneration
Nodular episcleritis
Nonexudative age-related macular degeneration
Ocular hypertension
Ophthalmia nodosa
Optic nerve hypoplasia
Optic papillitis
Orbital myositis
Pannus (corneal)
Panophthalmitis (acute)
Panuveitis
Perforated corneal ulcer
Peripheral corneal degeneration
Pseudomembranous conjunctivitis
Pseudopapilledema of optic disc
Pseudopterygium of conjunctiva
Pulsating exophthalmos
Punctate keratitis
Pupillary abnormalities
Pupillary membranes
Recession of chamber angle
Refractive amblyopia
Regular astigmatism
Retinal artery branch occlusion
Retinal telangiectasis
Retinal vasculitis
Retrobulbar neuritis
Retrolental fibroplasia
Rupture in Descemet's membrane
Scarring of conjunctiva
Scleral ectasia
Scleromalacia perforans
Sclerosing keratitis
Secondary cataract
Secondary lacrimal gland atrophy
Serous choroidal detachment
Serous conjunctivitis, except viral
Serous detachment of retinal pigment epithelium
Serous retinal detachment
Sixth [abducent] nerve palsy
Soemmering's ring
Solar retinopathy
Hordeolum externum
Hordeolum internum
Madarosis
Mechanical ectropion of eyelid
Mechanical entropion of eyelid
Mechanical lagophthalmos
Coloboma
Cysticercosis
Focal chorioretinal inflammation
Granuloma of eye
Myopathy of extraocular muscles
Hypotony of eye
Keratoconjunctivitis sicca
Keratoconjunctivitis
`
  .trim()
  .split('\n');

export const dynamicVisionHistoryDiagnosis = dataDynamicVisionHistoryDiagnosis.map((item) => ({
  value: item,
  label: item,
}));

export const locationFieldDataPrimary = [
  {
    value: 'EyeLeft',
    label: 'Left Eye',
  },
  {
    value: 'EyeRight',
    label: 'Right Eye',
  },
  {
    value: 'BothEyes',
    label: 'Both Eyes',
  },
];

export const locationFieldDataSecondary = [
  {
    value: 'LeftOrbit',
    label: 'Left Orbit',
  },
  {
    value: 'RightOrbit',
    label: 'Right Orbit',
  },
  {
    value: 'BothOrbits',
    label: 'Both Orbit',
  },
];

export const radioButtonToggleAreaField = [
  {
    id: 'upper-eyelid-1',
    label: 'Upper Eyelid',
    value: 'Upper Eyelid',
  },
  {
    id: 'lower-eyelid-1',
    label: 'Lower Eyelid',
    value: 'Lower Eyelid',
  },
];

export const multiselectAreaFieldColobomaData = [
  { value: 'Iris', label: 'Iris' },
  { value: 'Lense', label: 'Lense' },
  { value: 'Optic Disk', label: 'Optic Disk' },
];

export const multiselectAreaFieldFocalData = [
  { value: 'Posterior pole', label: 'Posterior pole' },
  { value: 'Juxtapapillary', label: 'Juxtapapillary' },
];

export const multiselectDueToFieldHypotomyData = [
  { value: 'Ocular fistula', label: 'Ocular fistula' },
  { value: 'Other causes', label: 'Other causes' },
];

export const multiselectDueToFieldKeratoData = [
  { value: 'Acanthamoeba', label: 'Acanthamoeba' },
  { value: 'Adenovirus', label: 'Adenovirus' },
  { value: 'Other causes', label: 'Other causes' },
];

const secondaryNames = [
  'Hordeolum externum',
  'Hordeolum internum',
  'Madarosis',
  'Mechanical ectropion of eyelid',
  'Mechanical entropion of eyelid',
  'Mechanical lagophthalmos',
];

const tertiaryNames = ['Granuloma of eye', 'Myopathy of extraocular muscles'];

export const getLocationFieldData = (name: string) =>
  tertiaryNames.includes(name) ? locationFieldDataSecondary : locationFieldDataPrimary;

export const getVisionHistoryFieldConfig = (name: string) => {
  const config = fieldConfigs[name];

  if (config) {
    return config;
  }

  if (tertiaryNames.includes(name)) {
    return fieldConfigs.tertiary;
  }

  if (secondaryNames.includes(name)) {
    return fieldConfigs.secondary;
  }

  return undefined;
};

export const fieldConfigs: { [key: string]: null | FieldConfigItem[] } = {
  primary: null,
  secondary: [
    {
      name: 'area',
      label: 'Area',
      data: radioButtonToggleAreaField,
      type: 'radiobutton-toggle',
      alert: {
        title: 'Confirm your area change',
        description: `Please note that this action will reset your entered data specific to the Area.\n\nTo proceed with the change and lose the current data, select 'Confirm'. If you wish to keep your current data, select 'Cancel'.`,
        proceed: 'Yes, disable',
        cancel: 'Cancel',
        isSourceInfo: true,
        alertType: 'danger',
      },
      toggleData: {
        name: 'supportingToggle',
        label: 'Area',
        alert: {
          title: 'Confirm disabling area',
          description: `You are about to disable the 'Area' option. Please be aware that this action will result in the loss of any data you have entered for this field.\n\nTo confirm and proceed with disabling the area, resulting in data loss, select 'Yes, disable'. If you wish to retain the area field and your data, select 'Cancel'.`,
          proceed: 'Yes, change',
          cancel: 'Cancel',
          alertType: 'danger',
        },
      },
    },
  ],
  tertiary: [
    {
      name: 'toggle',
      label: 'Affecting Lacrimal Passage',
      type: 'toggle',
    },
  ],
  Coloboma: [
    {
      name: 'area',
      label: 'Area',
      data: multiselectAreaFieldColobomaData,
      type: 'multiselect',
    },
  ],
  Cysticercosis: [
    {
      name: 'toggle',
      label: 'Affecting Central Nervous System (CNS)',
      type: 'toggle',
    },
  ],
  'Focal chorioretinal inflammation': [
    {
      name: 'area',
      label: 'Area',
      data: multiselectAreaFieldFocalData,
      type: 'multiselect',
    },
  ],
  'Hypotony of eye': [
    {
      name: 'dueTo',
      label: 'Due to',
      data: multiselectDueToFieldHypotomyData,
      type: 'multiselect',
    },
  ],
  'Keratoconjunctivitis sicca': [
    {
      name: 'toggle',
      label: "Due to Sjogren's",
      type: 'toggle',
    },
  ],
  Keratoconjunctivitis: [
    {
      name: 'dueTo',
      label: 'Due to',
      data: multiselectDueToFieldKeratoData,
      type: 'multiselect',
    },
  ],
};

export const visionHistoryApiNames = {
  eyeWears: 'eye-wear',
  visionDiagnosis: 'diagnosis',
};

export const visionHistoryItemApiKeys = {
  diagnosisDate: 'Date',
  attachments: 'Attachments',
  explanation: 'Explanation',
  location: 'Locations',
  extraInformation: 'ExtraInformation',
  area: 'Area',
  dueTo: 'DueTo',
  name: 'Name',
  isCommonName: 'IsCommonName',
};

export const visionHistoryEyeWearApiKeys = {
  diagnosisDate: 'Date',
  attachments: 'Attachments',
  explanation: 'Explanation',
  name: 'Kind',
  isCommonName: 'IsCommonName',
};
