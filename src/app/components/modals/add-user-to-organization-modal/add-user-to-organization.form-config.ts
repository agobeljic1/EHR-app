import { Validators } from '@angular/forms';

export const formConfig: { [key: string]: any } = {
  user: {
    attributes: [undefined, [Validators.required]],
    errorConfig: {
      required: 'User is required',
    },
  },
};
