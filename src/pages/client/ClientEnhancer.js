import { withFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  ClientName: Yup.string().required("This field is required."),
  ClientNumber: Yup.string(),
  TestingOfficeId: Yup.string().required("This field is required"),
  ClientCountryId: Yup.string(),
  FirstName: Yup.string(),
  LastName: Yup.string(),
  Phone: Yup.string().matches(/^[0-9+,]+$/, "Only numbers, + and , allowed"),
  Email: Yup.string().matches(
    /^[\w-äöüÄÖÜß\.]+@([\w-äöüÄÖÜß]+\.)+[\w-äöüÄÖÜß]{2,4}$/,
    "Please enter a valid email."
  ),
  Remarks: Yup.string().max(255),
  Field1: Yup.string().max(255),
  Field2: Yup.string().max(255),
  Field3: Yup.string().max(255),
  Address: Yup.object().shape({
    Street1: Yup.string(),
    Street2: Yup.string(),
    PostCode: Yup.string(),
    Location: Yup.string(),
  }),
});

const ClientEnhancer = withFormik({
  mapPropsToValues: () => ({
    TestingOfficeId: "",
    ClientName: "",
    ClientNumber: "",
    ClientCountryId: "",
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Remarks: "",
    Field1: "",
    Field2: "",
    Field3: "",
    Address: {
      Street1: "",
      Street2: "",
      PostCode: "",
      Location: "",
    },
  }),
  validationSchema,
  validateOnMount: true,
  handleSubmit: (values, { resetForm }) => {
    console.log(values);
    // Add form submission logic here
    // resetForm();
  },
});

export default ClientEnhancer;
