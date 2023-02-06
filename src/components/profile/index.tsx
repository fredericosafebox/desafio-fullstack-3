import { StyledProfile } from "./styles";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import {
  IoPerson,
  IoMail,
  IoPhonePortrait,
  IoCalendar,
  IoRefresh,
} from "react-icons/io5";
import CustomSwitch from "../switch";
import { unauthorize } from "@/store/reducers/authSlice";
import { toast } from "react-toastify";
import {
  manageContactModal,
  manageProfileModal,
} from "@/store/reducers/homeSlice";

export default function Profile() {
  const { authState: auth, user } = useAppSelector((state) => state.auth);
  const created = new Date(user!.createdAt!).toLocaleDateString("pt-Br");
  const updated = new Date(user!.updatedAt!).toLocaleDateString("pt-Br");
  const dispatch = useAppDispatch();
  const logout = () => {
    window.localStorage.removeItem("token");
    toast.success("Sessão encerrada.");
    dispatch(unauthorize());
  };

  return (
    <StyledProfile>
      <h1>Seus dados</h1>
      <div className="app__profile--card">
        <h3>
          <IoPerson size={24} /> Nome completo: <span>{user?.fullName}</span>
        </h3>
        <h3>
          <IoMail size={24} /> Email: <span>{user?.email}</span>
        </h3>
        <h3>
          <IoPhonePortrait size={24} /> Telefone: <span>{user?.phone}</span>
        </h3>
        <h3>
          <IoCalendar size={24} /> Conta criada em: <span>{created}</span>
        </h3>
        <h3>
          <IoRefresh size={24} /> Última alteração em: <span>{updated}</span>
        </h3>

        <CustomSwitch />
      </div>
      <div className="app__profile--buttons">
        <button
          type="button"
          onClick={() => dispatch(manageProfileModal(true))}
          className="profile__primary"
        >
          Alterar dados
        </button>
        <button
          onClick={() => dispatch(manageContactModal(true))}
          className="profile__secondary"
          type="button"
        >
          Adcionar contato
        </button>
        <button className="profile__link" onClick={logout}>
          Sair
        </button>
      </div>
    </StyledProfile>
  );
}
