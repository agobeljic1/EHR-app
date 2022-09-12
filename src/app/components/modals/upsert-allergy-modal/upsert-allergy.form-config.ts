import { Validators } from '@angular/forms';

export const formConfig: { [key: string]: any } = {
  onsetDateTime: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Discovered date is required',
    },
  },
  category: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Category is required',
    },
    options: ['Food', 'Medication', 'Environment', 'Biologic'],
  },
  criticality: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Criticality is required',
    },
    options: ['Low', 'High', 'Unable to assess'],
  },
  clinicalStatus: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Clinical status is required',
    },
    options: ['Active', 'Inactive', 'Resolved'],
  },
  note: {
    attributes: [undefined, []],
    errorConfig: {},
    rows: 6,
  },
};
