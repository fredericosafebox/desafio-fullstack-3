import { ChangeEvent, useEffect } from "react";
import { StyledSwitch } from "./styles";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { setUser, unauthorize } from "@/store/reducers/authSlice";
import api from "@/connection/axios";
import { toast } from "react-toastify";

export default function CustomSwitch() {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handle = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      console.log("marcado");
      await api
        .patch(
          "profile",
          { visibility: "VISIBLE" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(setUser(res.data));
          toast.success("Visibilidade da conta alterada");
        })
        .catch((err) => {
          dispatch(unauthorize());
          toast.error("Sessão expirada");
        });
    } else {
      console.log("desmarcado");
      await api
        .patch(
          "profile",
          { visibility: "INVISIBLE" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(setUser(res.data));
          toast.success("Visibilidade da conta alterada");
        })
        .catch((err) => {
          dispatch(unauthorize());
          toast.error("Sessão expirada");
        });
    }
  };
  return (
    <StyledSwitch htmlFor="switch" className="customSwitch">
      <div className="switch__button">
        {user && user.visibility === "VISIBLE" ? (
          <IoEye size={20} />
        ) : (
          <IoEyeOff size={20} />
        )}
      </div>
      <input
        type="checkbox"
        onChange={handle}
        id="switch"
        className="switch"
        defaultChecked={user && user.visibility === "VISIBLE" ? true : false}
      />
      <p>
        {user && user.visibility === "VISIBLE"
          ? "Conta visível"
          : "Conta oculta"}
      </p>
    </StyledSwitch>
  );
}
