import { withFormik } from "formik";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  Password: Yup.string()
    .required("This field is required")
    .min(8, "Password must be 8 or more characters")
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
  ConfirmPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("Password"), null], "Passwords must match"),
});

const ResetPasswordEnhancer = withFormik({
  mapPropsToValues: () => ({
    Password: "",
    ConfirmPassword: "",
    UserName: "-",
  }),
  validationSchema: validateSchema,
  validateOnMount: true,
  handleSubmit: (values, { resetForm }) => {
    console.log(values);
  },
});

export default ResetPasswordEnhancer;
