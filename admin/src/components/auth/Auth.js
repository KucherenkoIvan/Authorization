import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, resetAuth } from '../../redux/actionCreators';
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from '@material-ui/core';
import './style.scss';

export default function Auth(props) {
  const dispatch = useDispatch();
  const error = useSelector(state => !!state.auth.error);

  const [value, setValue] = useState({
    user_name: "",
    user_password: ""
  });

  const onChange = e => {
    if (error) {
      dispatch(resetAuth());
    }

    setValue({
      ...value,
      [e.target.id]: e.target.value
    })
  }

  const onClick = () => {
    dispatch(logIn({ login: value.user_name, password: value.user_password }));
  }

  const onClickEnter = e => {
    if (e.code?.includes("Enter")) {
      onClick();
    }
  }

  return (
    <div className={`auth_div ${error ? "redShadow" : "blackShadow"}`} onKeyDownCapture={onClickEnter}>
      <Typography className="auth_title" variant="h5" color="primary">
        Вход в систему
      </Typography>
      <FormControl>
        <InputLabel htmlFor="user_name">
          Логин
        </InputLabel>
        <Input
          className="form_control"
          type="text"
          id="user_name"
          placeholder="Ваш логин"
          onChange={onChange}
          required
          error={error}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="user_password">
          Пароль
        </InputLabel>
        <Input
          className="form_control"
          type="password"
          id="user_password"
          placeholder="Ваш пароль"
          onChange={onChange}
          error={error}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={onClick}>
        Войти
      </Button>
    </div>
  );
}