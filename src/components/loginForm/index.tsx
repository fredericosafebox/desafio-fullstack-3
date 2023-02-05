import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { StyledForm } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import schema from "@/schemas/loginSchema";
import api from "@/connection/axios";
import { IoPerson } from "react-icons/io5";
import { useAppDispatch } from "@/hooks/hooks";
import { authenticate, setToken } from "@/store/reducers/authSlice";
import { goToSignUp } from "@/store/reducers/homeSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  type FormData = yup.InferType<typeof schema>;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchToken = async (data: FormData) => {
    console.log(data);
    const res = await api
      .post("login", data)
      .then((res) => {
        console.log(res.data);
        const token = res.data.token;
        dispatch(setToken(token));
        window.localStorage.setItem("token", token);
        dispatch(authenticate(true));
        toast.success("Seja bem vindo!");
        router.push("/dashboard", "");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Email ou senha inválidos!");
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
          <h1>Welcome</h1>
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
        <div className="app__form--buttonWrapper">
          <button
            onClick={() => dispatch(goToSignUp())}
            type="button"
            className="secondaryButton"
          >
            Registrar
          </button>
          <button type="submit" className="primaryButton">
            Login
          </button>
        </div>
      </StyledForm>
    </motion.div>
  );
}
