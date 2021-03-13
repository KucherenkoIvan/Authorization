import React from 'react';
import {useState} from 'react';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import './style.scss';
/*
*/
export default function Auth(props){
  const [value, setValue] = useState({
    user_name: "",
    user_password: ""
  });

  const onChange = e => setValue({
    ...value,
    [e.target.id]: e.target.value
  })

  console.log(value);

  return(
    <div className="auth_div">
      <Typography className="auth_title" variant="h5" color="primary">
        Авторизация
      </Typography>
      <FormControl>
        <InputLabel htmlFor="user_name">
          Логин
        </InputLabel>
        <Input className="form_control" type="text" id="user_name" placeholder="Ваш логин" onChange={onChange}/>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="user_password">
          Пароль
        </InputLabel>
        <Input className="form_control" type="password" id="user_password" placeholder="Ваш пароль" onChange={onChange}/>
      </FormControl>

      
      <Button variant="contained" color="primary">
        Войти
      </Button>
    </div>
  );
}