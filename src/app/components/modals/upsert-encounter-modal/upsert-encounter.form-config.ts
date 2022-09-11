import { Validators } from '@angular/forms';
import { countries } from 'src/app/constants/countries';

export const formConfig: { [key: string]: any } = {
  patient: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Patient is required',
    },
  },
  status: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Status is required',
    },
    options: [
      'Planned',
      'Arrived',
      'Triaged',
      'In progress',
      'On leave',
      'Finished',
      'Cancelled',
    ],
  },
  priority: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Priority is required',
    },
    options: [
      'ASAP',
      'Callback results',
      'Elective',
      'Emergency',
      'Preop',
      'Routine',
      'Rush reporting',
      'Stat',
      'Timing critical',
      'Use as directed',
      'Urgent',
    ],
  },
  periodStart: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Start date is required',
    },
  },
  periodEnd: {
    attributes: [undefined, []],
    errorConfig: {
      required: 'End date is required',
    },
  },
};
