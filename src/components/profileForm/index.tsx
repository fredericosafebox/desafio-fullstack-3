import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/connection/axios";
import { StyledForm } from "./styles";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import { manageProfileModal } from "@/store/reducers/homeSlice";
import { updateProfileSchema } from "../../schemas/profileSchema";
import { setUser, unauthorize } from "@/store/reducers/authSlice";
import { AxiosError } from "axios";

export default function ProfileForm() {
  const { token, user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.fullName,
      phone: user?.phone,
      email: user?.email,
    },
  });

  type FormData = yup.InferType<typeof updateProfileSchema>;
  const dispatch = useAppDispatch();

  const fetchToken = async (data: FormData) => {
    const res = await api
      .patch("profile", data, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch(setUser(res.data));
        dispatch(manageProfileModal(false));
        toast.success("Dados atualizados com sucesso!");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Ops! Algo deu errado.");
        }
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
          <h1>Atualize seus dados</h1>
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
            placeholder={user?.email}
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
            placeholder="*****"
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
            placeholder={user?.fullName}
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
            placeholder={user?.phone?.toString()}
          />
          {errors.phone && (
            <span className="form__errors">{errors.phone.message}</span>
          )}
        </div>
        <div className="app__form--buttonWrapper">
          <button
            onClick={() => dispatch(manageProfileModal(false))}
            type="button"
            className="secondaryButton"
          >
            Cancelar
          </button>
          <button type="submit" className="primaryButton">
            Atualizar
          </button>
        </div>
      </StyledForm>
    </motion.div>
  );
}
