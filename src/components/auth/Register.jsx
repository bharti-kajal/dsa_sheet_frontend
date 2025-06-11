import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema } from '../../validation/registerValidation';
import { ApiEndPoint } from '../../data/Endpoint';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await ApiEndPoint.post(values, 'sign-up');
      toast.success(response.message);
      resetForm();
      setTimeout(() => navigate('/'), 800);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h3 className="login-title">Create an account</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <div>
                <label htmlFor="name" className="login-form-label">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="login-form-input"
                  placeholder="Enter your name"
                  autoComplete="off"
                />
                <p class="text-danger"><ErrorMessage name="name"  className="login-error" /></p>
              </div>

              <div>
                <label htmlFor="email" className="login-form-label">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="login-form-input"
                  placeholder="Enter your email"
                  autoComplete="new-email"
                />
                <p class="text-danger"><ErrorMessage name="email" className="login-error" /></p>
              </div>

              <div>
                <label htmlFor="password" className="login-form-label">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="login-form-input"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                />
                <p class="text-danger"><ErrorMessage name="password"  className="login-error" /></p>
              </div>

              <button type="submit" className="login-submit-btn mt-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              <p className="login-signup-text">
                Already have an account?{" "}
                <Link to="/" className="login-signup-link">Click here</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
