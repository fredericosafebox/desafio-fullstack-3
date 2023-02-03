import * as yup from "yup";

export const profileSchema = yup.object({
  id: yup.number(),
  fullName: yup.string(),
  email: yup.string().email(),
  updatedAt: yup.date(),
  createdAt: yup.date(),
  role: yup.string(),
  visibility: yup.string(),
  phone: yup.number(),
});

export const updateProfileSchema = yup.object({
  fullName: yup.string().max(20, "Nome não pode ser maior que 120"),
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
