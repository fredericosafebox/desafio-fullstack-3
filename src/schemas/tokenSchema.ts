import * as yup from "yup";

const tokenSchema = yup.object({
  id: yup.number().required("Invalid token"),
  role: yup
    .string()
    .equals(["ADMIN", "USER"], "Invalid token")
    .required("Invalid token"),
});

export default tokenSchema;

export const headerSchema = yup.object({
  authorization: yup.string().required("Missing authorization headers"),
});
