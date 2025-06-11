import * as Yup from 'yup';
import { ApiEndPoint } from '../data/Endpoint';

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters.')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .test('email-exists', 'Email is already in use.', async (value) => {
      if (!value) return true;
      try {
        const res = await ApiEndPoint.emailExist(value);
        return !res.exists;
      } catch {
        return true; 
      }
    }),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
      'Password must be at least 8 characters, include one uppercase letter, one digit, and one special character.'
    )
    .required('Password is required'),
});
