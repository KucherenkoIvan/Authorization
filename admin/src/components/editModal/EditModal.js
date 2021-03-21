import React from 'react';
import { useState, useEffect } from 'react';

import {
  Typography,
  Button,
  Modal,
  Input,
  InputLabel,
  FormControl,
  NativeSelect,
  IconButton,
} from '@material-ui/core';

import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { initModalStore, loadUsers, setInModalStore } from '../../redux/actionCreators';
import { useHttp } from '../../hooks/useHttp';

export default function EditModal(){
  const dispatch = useDispatch();
  const { patch, del, post } = useHttp();

  const isOpen = useSelector(state => state.modals?.editModal?.isOpen);
  const selectedRow = useSelector(state => state.modals?.editModal?.selectedRow);

  const [focsedOn, setFocused] = useState('');
  const [inputData, setInputData] = useState({ 
    login: '',
    password: '',
    accessLevel: 'user',
  });

  const closeHandler = () => {
    setFocused('');
    setInputData({
      login: '',
      password: '',
      accessLevel: 'user',
    });
    dispatch(
      setInModalStore({
        key: 'editModal',
        value: {
          isOpen: false,
          selectedRow: null,
        }
      })
    )
  };

  const focusHandler = e => {
    setFocused(e.target.id);
  };

  const blurHandler = e => {
    setFocused('');
  };

  const changeHandler = e => {
    console.log(e.target.id, e.target.value)
    setInputData({ ...inputData, [e.target.id] : e.target.value})
  };

  const saveClickHandler = async () => {
    // PATCH /api/auth/edit {login, password, id, accesLevel}
    if (selectedRow) {
      const preparedData = { ...inputData, id: selectedRow.id };
      console.log(preparedData)
      await patch('/api/auth/edit', preparedData);
    } else {
      await post('/api/auth/register', inputData);
    }
    dispatch(loadUsers());
    closeHandler();
  };

  const deleteClickHandler = () => {
    if (selectedRow) {
      del('/api/auth/delete', { id: selectedRow.id });
      dispatch(loadUsers());
      closeHandler();
    }
  };

  useEffect(() => {
    dispatch(
      initModalStore({
        key: 'editModal',
        value: {
          isOpen: false,
          selectedRow: null,
        }
      })
    )
  }, []);

  return (
    <Modal open={isOpen} onClose={closeHandler}>
      <div className="user_editModal">
        <IconButton className="user_icon" onClick={closeHandler}>
          <CancelTwoToneIcon color="action" className="white-text" />
        </IconButton>
        <div className="auth_div blackShadow">
          <Typography variant="h6">
            {selectedRow ? "Редактирование" : "Новый пользователь"}
          </Typography>

          <FormControl>
            <InputLabel htmlFor="login">
              {focsedOn === 'login' || !!inputData.login ? "Логин" : selectedRow?.login || "Логин"}
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
            <InputLabel htmlFor="password">
              Пароль
            </InputLabel>
            <Input
              className="form_control"
              type="text"
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
            <NativeSelect id="accessLevel" onChange={changeHandler}>
              <option value="user" selected={selectedRow?.accessLevel === 'user'}>user</option>
              <option value="admin" selected={selectedRow?.accessLevel === 'admin'}>admin</option>
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
            {selectedRow && 
              (
                <IconButton onClick={deleteClickHandler}>
                  <DeleteTwoToneIcon color="action" />
                </IconButton>
              )
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}