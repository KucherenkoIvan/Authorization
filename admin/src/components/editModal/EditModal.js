import React from "react";
import { useState, useEffect } from "react";

import {
  Typography,
  Button,
  Modal,
  Input,
  InputLabel,
  FormControl,
  NativeSelect,
  IconButton,
} from "@material-ui/core";

import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { useDispatch, useSelector } from "react-redux";
import {
  initModalStore,
  loadUsers,
  setInModalStore,
} from "../../redux/actionCreators";
import { useHttp } from "../../hooks/useHttp";

export default function EditModal() {
  const dispatch = useDispatch();
  const { patch, del, post } = useHttp();

  const [errors, setErrors] = useState([]);
  const isOpen = useSelector((state) => state.modals?.editModal?.isOpen);
  const selectedRow = useSelector(
    (state) => state.modals?.editModal?.selectedRow
  );

  const [focsedOn, setFocused] = useState("");
  const [inputData, setInputData] = useState({
    login: "",
    password: "",
    accessLevel: "user",
  });

  const closeHandler = () => {
    setFocused("");
    setErrors([]);
    setInputData({
      login: "",
      password: "",
      accessLevel: "user",
    });
    dispatch(
      setInModalStore({
        key: "editModal",
        value: {
          isOpen: false,
          selectedRow: null,
        },
      })
    );
  };

  const focusHandler = (e) => {
    setFocused(e.target.id);
  };

  const blurHandler = (e) => {
    setFocused("");
  };

  const changeHandler = (e) => {
    setErrors([]);
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const saveClickHandler = async () => {
    // PATCH /api/auth/edit {login, password, id, accesLevel}
    const err = [];
    if (selectedRow) {
      const preparedData = { ...inputData, id: selectedRow.id };
      try {
        await patch("/api/auth/edit", preparedData);
      } catch (e) {
        // добавить ошибку
        err.push(e);
      }
    } else {
      try {
        await post("/api/auth/register", inputData);
      } catch (e) {
        // добавить ошибку
        err.push(e);
      }
    }
    if (err.length) {
      setErrors(err);
    } else {
      dispatch(loadUsers());
      closeHandler();
    }
  };

  const deleteClickHandler = async () => {
    if (selectedRow) {
      try {
        const _ = await del(`/api/auth/delete/?id=${selectedRow.id}`, { id: selectedRow.id });
        dispatch(loadUsers());
        closeHandler();
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    dispatch(
      initModalStore({
        key: "editModal",
        value: {
          isOpen: false,
          selectedRow: null,
        },
      })
    );
  }, []);

  return (
    <Modal open={isOpen} onClose={closeHandler}>
      <div className="user_editModal">
        <IconButton className="user_icon" onClick={closeHandler}>
          <CancelTwoToneIcon color="action" className="white-text" />
        </IconButton>
        <div
          className={`auth_div ${errors.length ? "redShadow" : "blackShadow"}`}
        >
          <Typography variant="h6">
            {selectedRow ? "Редактирование" : "Новый пользователь"}
          </Typography>

          <FormControl>
            <InputLabel htmlFor="login" error={!!errors.length}>
              {focsedOn === "login" || !!inputData.login
                ? "Логин"
                : selectedRow?.login || "Логин"}
            </InputLabel>
            <Input
              className="form_control"
              type="text"
              id="login"
              placeholder={selectedRow?.login || "let-me-in"}
              onChange={changeHandler}
              required
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password" error={!!errors.length}>
              Пароль
            </InputLabel>
            <Input
              className="form_control"
              type="password"
              id="password"
              placeholder="Только не Qwerty123"
              onChange={changeHandler}
              required
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="accessLevel">Уровень доступа</InputLabel>
            <NativeSelect
              id="accessLevel"
              onChange={changeHandler}
              error={!!errors.length}
            >
              <option
                value="user"
                selected={selectedRow?.accessLevel === "user"}
              >
                user
              </option>
              <option
                value="admin"
                selected={selectedRow?.accessLevel === "admin"}
              >
                admin
              </option>
            </NativeSelect>
          </FormControl>

          <div className="user_editModal_buttons">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={saveClickHandler}
              className="user_editModal_buttons_btn"
            >
              Сохранить
            </Button>
            {selectedRow && (
              <IconButton onClick={deleteClickHandler}>
                <DeleteTwoToneIcon color="action" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
