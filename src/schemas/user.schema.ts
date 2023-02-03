import * as yup from "yup";

export const createUserSchema = yup.object({
  fullName: yup
    .string()
    .max(20, "Nome não pode ser maior que 120")
    .required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve conter no mínimo 8 caracteres")
    .max(20, "Senha deve conter no máximo 20 caracteres")
    .required("Senha é obrigatório"),
  phone: yup.number().required("Telefone é obrigatório"),
});

export const readUserSchema = yup.object({
  id: yup.number(),
  fullName: yup.string(),
  email: yup.string(),
  phone: yup.number(),
});

export const updateUserSchema = yup.object({
  fullName: yup.string().max(120, "Nome não pode ser maior que 20"),
  email: yup.string().email("Email inválido"),
  password: yup
    .string()
    .min(8, "Senha deve conter no mínimo 8 caracteres")
    .max(20, "Senha deve conter no máximo 20 caracteres"),
  phone: yup.number(),
  visibility: yup
    .string()
    .equals(["VISIBLE", "INVISIBLE"], "Invalid Visibility Option"),
});
