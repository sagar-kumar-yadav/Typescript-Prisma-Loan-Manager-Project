import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../validation/login.schema";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/auth.api";
import { setAuth } from "../../services/token.service";
import { roleRedirect } from "../../utils/roleRedirect";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    const res = await loginApi(values);
    const { token, user } = res.data;

    setAuth(token, user.role);
    roleRedirect(user.role, navigate);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <h2>Login</h2>
        <Field name="email" placeholder="Email" />
        <ErrorMessage name="email" />
        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default Login;
