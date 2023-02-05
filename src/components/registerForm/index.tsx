import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserSchema } from "@/schemas/user.schema";
import api from "@/connection/axios";
import { IoPerson } from "react-icons/io5";
import { StyledForm } from "./styles";
import { useAppDispatch } from "@/hooks/hooks";
import { goToSignIn } from "@/store/reducers/homeSlice";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(createUserSchema) });

  type FormData = yup.InferType<typeof createUserSchema>;
  const dispatch = useAppDispatch();

  const fetchToken = async (data: FormData) => {
    const res = await api
      .post("users", data)
      .then((res) => {
        toast.success("Conta criada!");
        dispatch(goToSignIn());
      })
      .catch((error) => {
        toast.error("Ops! Algo deu errado.");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
      transition={{ duration: 1 }}
    >
      <StyledForm onSubmit={handleSubmit(fetchToken)} className="app__form">
        <div className="app__form--contentWrapper">
          <IoPerson size={48} className="welcome__icon" />
          <h1>Cadastre-se</h1>
        </div>
        <div className="app__form--contentWrapper">
          <label className="app__form--label" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="off"
            className="app__form--field"
            type="text"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="form__errors">{errors.email.message}</span>
          )}
        </div>
        <div className="app__form--contentWrapper">
          <label className="app__form--label" htmlFor="password">
            Senha
          </label>
          <input
            autoComplete="off"
            type="password"
            id="password"
            {...register("password")}
            className="app__form--field"
          />
          {errors.password && (
            <span className="form__errors">{errors.password.message}</span>
          )}
        </div>
        <div className="app__form--contentWrapper">
          <label className="app__form--label" htmlFor="fullName">
            Nome completo
          </label>
          <input
            autoComplete="off"
            type="text"
            id="fullName"
            {...register("fullName")}
            className="app__form--field"
          />
          {errors.fullName && (
            <span className="form__errors">{errors.fullName.message}</span>
          )}
        </div>
        <div className="app__form--contentWrapper">
          <label className="app__form--label" htmlFor="phone">
            Telefone
          </label>
          <input
            autoComplete="off"
            type="phone"
            id="phone"
            {...register("phone")}
            className="app__form--field"
          />
          {errors.phone && (
            <span className="form__errors">{errors.phone.message}</span>
          )}
        </div>
        <div className="app__form--buttonWrapper">
          <button
            onClick={() => dispatch(goToSignIn())}
            type="button"
            className="secondaryButton"
          >
            Voltar
          </button>
          <button type="submit" className="primaryButton">
            Cadastrar
          </button>
        </div>
      </StyledForm>
    </motion.div>
  );
}
