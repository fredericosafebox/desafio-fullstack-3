import Head from "next/head";
import LoginForm from "@/components/loginForm";
import RegisterForm from "@/components/registerForm";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { AnimatePresence } from "framer-motion";
import {
  unauthorize,
  setToken,
  authenticate,
  setUser,
} from "@/store/reducers/authSlice";
import { useEffect } from "react";
import api from "@/connection/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Home() {
  const auth = useAppSelector((state) => state.auth.authState);
  const view = useAppSelector((state) => state.home.view);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        dispatch(unauthorize());
      } else {
        const validate = async () => {
          const user = await api
            .get("/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              dispatch(setUser(res.data));
              dispatch(setToken(token));
              dispatch(authenticate(true));
              toast.success("Bem-vindo de volta!");
              router.replace("/dashboard");
            })
            .catch((err) => {
              window.localStorage.removeItem("token");
              dispatch(unauthorize());
              toast.error("Sessão expirada. Por favor faça login novamente.");
            });
        };
        validate();
      }
    }
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AnimatePresence mode="wait">
        {view === "SIGNIN" && <LoginForm key={3} />}
        {view === "SIGNUP" && <RegisterForm key={4} />}
      </AnimatePresence>
    </>
  );
}
