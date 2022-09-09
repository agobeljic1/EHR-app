import { Validators } from '@angular/forms';

export const formConfig: { [key: string]: any } = {
  name: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Name is required',
    },
  },
  line: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Street is required',
    },
  },
  city: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'City is required',
    },
  },
  country: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Country is required',
    },
  },
};
