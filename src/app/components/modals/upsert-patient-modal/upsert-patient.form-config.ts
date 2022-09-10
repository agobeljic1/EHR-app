import { Validators } from '@angular/forms';
import { countries } from 'src/app/constants/countries';

export const formConfig: { [key: string]: any } = {
  given: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'First name is required',
    },
  },
  family: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Last name is required',
    },
  },
  birthDate: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Birth date is required',
    },
  },
  gender: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'Gender is required',
    },
    options: ['Male', 'Female', 'Other'],
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
    options: countries,
  },
};
