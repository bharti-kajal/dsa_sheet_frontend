import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../../validation/loginValidation';
import { ApiEndPoint } from '../../data/Endpoint';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await ApiEndPoint.post(values, 'login');
        if (response.status && response.token) {
        localStorage.setItem("authToken", response.token);
        toast.success("Login successful!");
         onLogin();
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h3 className="login-title">Student Login</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
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
                <ErrorMessage name="email" className="login-error" />
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
                <ErrorMessage name="password"  className="login-error" />
              </div>

              <button type="submit" className="login-submit-btn mt-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              <p className="login-signup-text">
                Don't have an account?{" "}
                <Link to="/sign-up" className="login-signup-link">Click here</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
