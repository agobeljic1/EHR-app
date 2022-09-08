import { Validators } from '@angular/forms';

export const formConfig: { [key: string]: any } = {
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
