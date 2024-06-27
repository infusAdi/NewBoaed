import { withFormik } from "formik";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
    UserName : Yup.string().min(2).max(25).required("This field is required"),
})

const ForgetPasswordEnhancer = withFormik({
    mapPropsToValues: () => ({
        UserName: "",
        Password: "-",
    }),
    validationSchema : validateSchema,
    validateOnMount : true,
    handleSubmit: (values,{resetForm}) => {
        console.log(values);
    }
})

export default ForgetPasswordEnhancer;