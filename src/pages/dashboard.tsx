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
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth.authState) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        toast.error("Sessão expirada. Por favor faça login novamente.");
        router.replace("/");
      } else {
        const validate = async () => {
          const user = await api
            .get("/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res);
              dispatch(setToken(token.split("")[1]));
              dispatch(authenticate(true));
            })
            .catch((err) => {
              window.localStorage.removeItem("token");
              toast.error("Sessão expirada. Por favor faça login novamente.");
              router.replace("/");
            });
        };
        validate();
      }
    }
  }, [auth.authState]);

  const logout = () => {
    window.localStorage.removeItem("token");
    router.replace("/");
    toast.success("Sessão encerrada.");
  };

  return (
    <>
      <h1>Hello Dashboard</h1>
      <button onClick={logout}>SAIR</button>
    </>
  );
}
