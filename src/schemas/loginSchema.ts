import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
});

export default loginSchema;
