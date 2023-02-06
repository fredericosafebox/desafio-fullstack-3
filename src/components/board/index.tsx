import { StyledBoard } from "./styles";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import {
  IoPerson,
  IoMail,
  IoPhonePortrait,
  IoTrash,
  IoPencil,
} from "react-icons/io5";
import { useEffect } from "react";
import api from "@/connection/axios";
import { toast } from "react-toastify";
import { setContacts } from "@/store/reducers/authSlice";
import { selectContact, editContact } from "@/store/reducers/homeSlice";
import { AxiosError } from "axios";

export default function Board() {
  const { contacts, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {}, [contacts]);

  return (
    <StyledBoard>
      <div className="app__board--header">
        <h1>Meus contatos</h1>
      </div>
      <ul>
        {contacts.map(({ id, email, phone, fullName }) => {
          const openEditor = (id: number) => {
            dispatch(selectContact(id));
            dispatch(editContact(true));
          };
          const deleteContact = async () => {
            await api
              .delete(`contacts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(async (res) => {
                toast.success("Contato deletado!");
                await api
                  .get("contacts", {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => {
                    dispatch(setContacts(res.data));
                  })
                  .catch((err) => {
                    if (err instanceof AxiosError) {
                      toast.error(err.response?.data.message);
                    }
                    toast.error("Ops! Algo errado aconteceu.");
                  });
              });
          };
          return (
            <li key={id} className="app__contact">
              <h6>
                {" "}
                <IoPerson size={16} />
                Nome: <span>{fullName}</span>
              </h6>
              <h6>
                {" "}
                <IoMail size={16} />
                Email: <span>{email}</span>
              </h6>
              <h6>
                {" "}
                <IoPhonePortrait size={16} />
                Tel.: <span>{phone}</span>
              </h6>
              <div className="app__contact--buttons">
                <button onClick={() => openEditor(id)}>
                  <IoPencil size={16} />
                </button>
                <button onClick={deleteContact}>
                  <IoTrash size={16} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </StyledBoard>
  );
}
