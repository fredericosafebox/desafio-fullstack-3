import * as yup from "yup";

export const newContactSchema = yup.object({
  fullName: yup
    .string()
    .max(120, "Nome não pode ser maior que 120")
    .required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.number().required("Telefone é obrigatório"),
});

export const readContactSchema = yup.object({
  id: yup.number(),
  fullName: yup.string(),
  email: yup.string(),
  phone: yup.number(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

export const updatedContactSchema = yup.object({
  fullName: yup.string().max(120, "Nome não pode ser maior que 120"),
  email: yup.string().email("Email inválido"),
  phone: yup.number(),
});
