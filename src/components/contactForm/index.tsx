import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/connection/axios";
import { StyledForm } from "./styles";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import { manageContactModal } from "@/store/reducers/homeSlice";
import { newContactSchema } from "@/schemas/contactSchema";
import { setUser, unauthorize, setContacts } from "@/store/reducers/authSlice";
import { AxiosError } from "axios";

export default function ContactForm() {
  const { token, user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: yupResolver(newContactSchema),
  });

  type FormData = yup.InferType<typeof newContactSchema>;
  const dispatch = useAppDispatch();

  const fetchToken = async (data: FormData) => {
    const res = await api
      .post("contacts", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        await api
          .get("contacts", { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            dispatch(setContacts(res.data));
          });
        dispatch(manageContactModal(false));
        toast.success("Contato cadastrado!");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Ops! Algo deu errado.");
        }
        //dispatch(manageContactModal(false));
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
          <h1>Cadastre um contato</h1>
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
            placeholder="email@email.com"
          />
          {errors.email && (
            <span className="form__errors">{errors.email.message}</span>
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
            placeholder="Exemplo Exemplo"
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
            placeholder="9999 9999"
          />
          {errors.phone && (
            <span className="form__errors">{errors.phone.message}</span>
          )}
        </div>
        <div className="app__form--buttonWrapper">
          <button
            onClick={() => dispatch(manageContactModal(false))}
            type="button"
            className="secondaryButton"
          >
            Cancelar
          </button>
          <button type="submit" className="primaryButton">
            Cadastrar
          </button>
        </div>
      </StyledForm>
    </motion.div>
  );
}
