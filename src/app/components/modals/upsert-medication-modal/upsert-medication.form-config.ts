import { Validators } from '@angular/forms';

export const formConfig: { [key: string]: any } = {
  code: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Name is required',
    },
  },
  status: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Status is required',
    },
    options: ['Active', 'Inactive', 'Entered in error'],
  },
  amount: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Amount is required',
    },
  },
  form: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Form is required',
    },
    options: ['Powder', 'Tablets', 'Capsule'],
  },
};
