export interface Allergy {
  id: string;
  onsetDateTime: string;
  recordedDate: Date;
  category: string;
  criticality: string;
  clinicalStatus: string;
  encounterId: string;
  recorder: string;
}
