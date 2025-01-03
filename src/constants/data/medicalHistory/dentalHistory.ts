import type { DentalHistoryType } from '../../../model/api/medicalHistory/DentalHistory';

export const commonDentalHistoryDiagnosisData = [
  { value: 'Cavities', label: 'Cavities' },
  { value: 'Gingivitis', label: 'Gingivitis' },
  { value: 'Periodontitis', label: 'Periodontitis' },
  { value: 'Halitosis', label: 'Halitosis' },
  { value: 'Misaligned teeth', label: 'Misaligned teeth' },
  { value: 'Bruxism', label: 'Bruxism' },
  { value: 'Tooth Sensitivity', label: 'Tooth Sensitivity' },
  { value: 'Xerostomia', label: 'Xerostomia' },
  { value: 'Sialolithiasis', label: 'Sialolithiasis' },
  { value: 'Fluorosis', label: 'Fluorosis' },
];

const dynamicData = `
Anodontia
Amelogenesis Imperfecta
Dentinogenesis imperfecta
Supernumerary teeth
Abnormalities of tooth size and form
Fluorosis
Mottled teeth
Disturbances in tooth formation
Hereditary disturbances in tooth structure, not elsewhere classified
Disturbances in tooth eruption
Teething syndrome
Embedded teeth
Impacted teeth
Infantile meladontia
Caries limited to enamel
Caries of dentine
Caries of cementum
Arrested dental caries
Odontoclasia
Other dental caries
Excessive attrition of teeth
Abrasion of teeth
Erosion of teeth
Pathological resorption of teeth
Hypercementosis
Ankylosis of teeth
Deposits [accretions] on teeth
Posteruptive colour change of dental hard tissues
Other specified diseases of hard tissue of teeth
Pulpitis
Necrosis of pulp
Pulp degeneration
Abnormal hard tissue formation in pulp
Acute apical periodontitis of pulpal origin
Chronic apical periodontitis
Periapical abscess with sinus
Periapical abscess without sinus
Radicular cyst
Pulp stones
Pericoronitis
Acute gingivitis
Chronic gingivitis
Acute Periodontitis
Chronic Periodontitis
Periodontosis
Other periodontal disease
Denture hyperplasia
Gingival recession
Gingival enlargement
Gingiva and edentulous alveolar ridge lesions associated with trauma
Other specified disorders of the gingiva and edentulous alveolar ridge
Major anomalies of jaw size
Anomalies of jaw-cranial base relationship
Condylar hyperplasia
micrognathism
macrognathism
Anomalies of dental arch relationship
Anomalies of tooth position
Malocclusion, unspecified
Dento-Facial functional abnormalities
Tempero-mandibular joint disorders
Other dento-facial anomalies
Exfoliation of teeth due to systemic disorders
Hypophosphatasia
Scurvy
Loss of teeth due to extraction,accident or local periodontal disease
Atrophy of edentulous alveolar ridge
Retained dental root
Other specified disorders of teeth and supporting structures
Disorders of teeth and supporting structures, unspecified
Developmental odontogenic cysts
Developmental non-odontogenic cysts of oral origin
Naso-palatinal cyst
Dermoid cyst
Aneurismal bone cyst
Other cysts of the jaws
Other cysts of oral region, not elsewhere classified
Cysts of oral region, unspecified
Developmental disorders of the jaws
Giant cell granuloma, central
Osteomyelitis of Jaw
Dry socket
Inflammatory conditions of the jaws
Alveolitis of the jaws
Other specified diseases of the jaws
Atrophy of the salivary glands
Hypertrophy of the salivary glands
Sialoadenitis
Abscess of the salivary gland
Fistula of the salivary gland
Sialolithiasis
Mikulicz Syndrome
Salivary calculus
Mucocele of the salivary gland
Xerostomia
Disturbance of salivary secretion
Other diseases of the salivary glands
Recurrent oral apthae
Other forms of stomatitis
Cellulitis and abscess of the mouth
Diseases of the lips
Cheek and lip biting
Leukoplakia and other disturbances of the oral epithelium, including the tongue
Hairy Leukoplakia
Granuloma and granuloma-like lesions of the oral mucosa
Oral submucous fibrosis
Pyogenic granuloma
Angular Chelitis
Irritative hyperplacia of the oral mucosa
Glossitis
Geographic Tongue
Median Rhomboid Glossitis
Hypertrophy of papillae
Atrophy of papillae
Plicated Tongue
Glossodynia
Other diseases of the tongue
Scrotal, Fissured tongue
Black Hairy Tongue
Ulcer of tongue
Abscess of tongue
Fracture of tooth (traumatic)
Fracture of the mandible
Discolouration of tooth
Foreign body in respiratory tract
Foreign body in alimentary tract
Hemorrhage
Hematoma
Paraesthesia of the tongue or lip
Bruxism
Temporomandibular joint (TMJ) pain
Acute Maxillary Sinusitis
Paraesthesia
Toothache
Congenital malformation of lips
Paraesthesia
Ankyloglossia
Avulsed tooth
`
  .trim()
  .split('\n');

export const dynamicDentalHistoryDiagnosisData = dynamicData.map((item) => ({
  value: item,
  label: item,
}));

export const commonDentalHistoryProstheticsData = [
  { value: 'Braces', label: 'Braces' },
  { value: 'Dentures', label: 'Dentures' },
  { value: 'Dental Implants', label: 'Dental Implants' },
  { value: 'Crowns (Dental Caps)', label: 'Crowns (Dental Caps)' },
  { value: 'Veneers', label: 'Veneers' },
  { value: 'Removable Partial Dentures', label: 'Removable Partial Dentures' },
  { value: 'Implant-Supported Dentures', label: 'Implant-Supported Dentures' },
  { value: 'Orthodontic Aligners', label: 'Orthodontic Aligners' },
  { value: 'Inlays and Onlays', label: 'Inlays and Onlays' },
];

export const dentalHistoryItemApiKeys = {
  date: 'Date',
  attachments: 'Attachments',
  explanation: 'Explanation',
  name: 'Name',
  type: 'Type',
  isCommonName: 'IsCommonName',
};

export const dentalHistoryTypeFromSectionName: { [key: string]: DentalHistoryType } = {
  dentalDiagnosis: 'Diagnosis',
  dentalProthetics: 'Prothetics',
  dentalOntograms: 'Ontogram',
};
