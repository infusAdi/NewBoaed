import { withFormik } from "formik";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  UserName: Yup.string().min(2).max(25).required("This field is required"),
  Password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(/\d/, "Password should contain at least one number") // this is to make password unique with atleast one number.
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ), // this is to make password unique with atleast one special character.
});

export default withFormik({
  mapPropsToValues: () => ({
    UserName: "",
    Password: "",
  }),
  validationSchema: validateSchema,
  validateOnMount: true,
  handleSubmit: (values, { resetForm }) => {
    console.log(values);
    // resetForm();
  },
});
