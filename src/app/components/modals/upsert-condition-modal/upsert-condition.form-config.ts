import { Validators } from '@angular/forms';

export const formConfig: { [key: string]: any } = {
  status: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Status is required',
    },
    rows: 6,
  },
  severity: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Severity is required',
    },
    options: ['Severe', 'Moderate', 'Mid'],
  },
};
