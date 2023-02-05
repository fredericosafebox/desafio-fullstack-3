import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  authenticate,
  setToken,
  unauthorize,
} from "@/store/reducers/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import api from "@/connection/axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth.authState);
  const dispatch = useAppDispatch();

  const validate = async (token: string) => {
    if (!token) {
      return router.replace("/");
    }
    return await api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(authenticate(true));
        dispatch(setToken(token));
        toast.success("Bem-vindo de volta!");
        return res.data;
      })
      .catch((err) => {
        window.localStorage.removeItem("token");
      });
  };

  useEffect(() => {
    if (!auth) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        router.replace("/");
      } else {
        const fetchProfile = async () => {
          const user = await validate(token!);
          if (!user) {
            window.localStorage.removeItem("token");
            toast.error("Sessão expirada. Por favor faça login novamente.");
            router.replace("/");
          }
        };
        fetchProfile();
      }
    }
  }, [auth]);

  const logout = () => {
    window.localStorage.removeItem("token");
    toast.success("Sessão encerrada.");
    dispatch(unauthorize());
  };

  return (
    <>
      {auth && <h1>Hello Dashboard</h1>}
      <button onClick={() => logout()}>SAIR</button>
    </>
  );
}
