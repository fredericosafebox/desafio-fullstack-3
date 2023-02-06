import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  authenticate,
  setToken,
  unauthorize,
  setUser,
} from "@/store/reducers/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import api from "@/connection/axios";
import { toast } from "react-toastify";
import Profile from "@/components/profile";
import Board from "@/components/board";
import Modal from "@/components/modal";
import ContactForm from "@/components/contactForm";
import ProfileForm from "@/components/profileForm";
import { AnimatePresence } from "framer-motion";
import { setContacts } from "@/store/reducers/authSlice";
import { AxiosError } from "axios";
import EditContactForm from "@/components/editContact";

export default function Dashboard() {
  const router = useRouter();
  const { authState: auth } = useAppSelector((state) => state.auth);
  const {
    modalContact: isContact,
    modalProfile: isProfile,
    modalContactEdit: isEdit,
  } = useAppSelector((state) => state.home);
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
        dispatch(setUser(res.data));
        toast.success("Bem-vindo de volta!");
        return res.data;
      })
      .catch((err) => {
        window.localStorage.removeItem("token");
      });
  };

  const loadContacts = async (token: string) => {
    const contacts = await api
      .get("contacts", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch(setContacts(res.data));
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
        toast.error("Ops! Algo errado aconteceu.");
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
    } else {
      const token = window.localStorage.getItem("token");
      if (!token) {
        router.replace("/");
      } else {
        loadContacts(token);
      }
    }
  }, [auth]);

  return (
    <>
      {auth && (
        <>
          <Profile />
          <Board />
          <AnimatePresence mode="wait">
            {isContact && (
              <Modal key={5}>
                <ContactForm />
              </Modal>
            )}
            {isProfile && (
              <Modal key={6}>
                <ProfileForm />
              </Modal>
            )}
            {isEdit && (
              <Modal key={7}>
                <EditContactForm />
              </Modal>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
