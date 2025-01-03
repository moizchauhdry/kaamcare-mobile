export const commonHearingHistoryDiagnosisData = [
  {
    label: 'Acoustic Neuroma',
    value: 'Acoustic Neuroma',
  },
  {
    label: 'Cholesteatoma',
    value: 'Cholesteatoma',
  },
  {
    label: 'Conductive Hearing Loss',
    value: 'Conductive Hearing Loss',
  },
  {
    label: 'Deaf',
    value: 'Deaf',
  },
  {
    label: "Ménière's Disease",
    value: "Ménière's Disease",
  },
  {
    label: 'Otosclerosis',
    value: 'Otosclerosis',
  },
  {
    label: 'Presbyacusis',
    value: 'Presbyacusis',
  },
  {
    label: 'Sensorineural Hearing Loss',
    value: 'Sensorineural Hearing Loss',
  },
  {
    label: 'Tinnitus',
    value: 'Tinnitus',
  },
  {
    label: 'Vestibular Schwannoma',
    value: 'Vestibular Schwannoma',
  },
];

export const dynamicHearingHistoryDiagnosisData = [
  { value: 'Acute actinic otitis externa', label: 'Acute actinic otitis externa' },
  { value: 'Conductive and sensorineural hearing loss', label: 'Conductive and sensorineural hearing loss' },
  { value: 'Foreign body in ear', label: 'Foreign body in ear' },
  { value: 'Hyperacusis', label: 'Hyperacusis' },
  { value: 'Impacted cerumen', label: 'Impacted cerumen' },
  {
    value: 'Intrinsic cartilaginous obstruction of Eustachian tube',
    label: 'Intrinsic cartilaginous obstruction of Eustachian tube',
  },
  { value: "Meniere's disease", label: "Meniere's disease" },
  { value: 'Mucosal cyst of postmastoidectomy cavity', label: 'Mucosal cyst of postmastoidectomy cavity' },
  { value: 'Multiple perforations of tympanic membrane', label: 'Multiple perforations of tympanic membrane' },
  { value: 'Otalgia', label: 'Otalgia' },
  { value: 'Otitis externa', label: 'Otitis externa' },
  { value: 'Otitis media', label: 'Otitis media' },
  { value: 'Otosclerosis', label: 'Otosclerosis' },
  { value: 'Pulsatile tinnitus', label: 'Pulsatile tinnitus' },
];

export const commonHearingHistoryHearingAidsData = [
  {
    label: 'Cochlear implant',
    value: 'Cochlear implant',
  },
  {
    label: 'Behind-the-ear (BTE)',
    value: 'Behind-the-ear (BTE)',
  },
  {
    label: 'In-the-ear (ITE)',
    value: 'In-the-ear (ITE)',
  },
  {
    label: 'Receiver-in-the-ear (RITE)',
    value: 'Receiver-in-the-ear (RITE)',
  },
  {
    label: 'In-the-canal (ITC)',
    value: 'In-the-canal (ITC)',
  },
  {
    label: 'CROS/BiCROS',
    value: 'CROS/BiCROS',
  },
];

export const commmonHearingHistoryHearingTestsData = [
  {
    label: 'Audiometry',
    value: 'Audiometry',
  },
  {
    label: 'Auditory brainstem response (ABR)',
    value: 'Auditory brainstem response (ABR)',
  },
  {
    label: 'Immittance tests',
    value: 'Immittance tests',
  },
  {
    label: 'Otoacoustic emissions (OAE)',
    value: 'Otoacoustic emissions (OAE)',
  },
  {
    label: 'Speech perception test',
    value: 'Speech perception test',
  },
  {
    label: 'Tympanometry',
    value: 'Tympanometry',
  },
];

export const hearingHistoryLocationData = [
  {
    value: 'LeftEar',
    label: 'Left ear',
  },
  {
    value: 'RightEar',
    label: 'Right ear',
  },
  {
    label: 'Both ears',
    value: 'BothEars',
  },
];

export const hearingHistoryApiNames = {
  hearingDiagnosis: 'diagnosis',
  hearingTests: 'test',
  hearingAidsCochlearImplants: 'aid-cochlear-implant',
};

export const hearingHistoryItemApiKeys = {
  diagnosisDate: 'Date',
  attachments: 'Attachments',
  explanation: 'Explanation',
  location: 'Locations',
  name: 'Name',
  isCommonName: 'IsCommonName',
};
