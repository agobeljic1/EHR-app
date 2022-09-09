import { Validators } from '@angular/forms';

export const formConfig: { [key: string]: any } = {
  firstName: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'First name is required',
    },
  },
  lastName: {
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
  emailAddress: {
    attributes: [undefined, [Validators.required, Validators.email]],
    errorConfig: {
      required: 'Email address is required',
      email: 'Email address needs to be a valid email',
    },
  },
  password: {
    attributes: [undefined, [Validators.required, Validators.minLength(8)]],
    errorConfig: {
      required: 'Password is required',
      minlegth: 'Password needs to have at least 8 characters',
    },
  },
};
