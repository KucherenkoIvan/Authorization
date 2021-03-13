import React from 'react';
import {useState} from 'react';
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
    [e.target.name]: e.target.value
  })

  console.log(value);
  
  return(
    <div className="auth_div">
      <h3 className="title_auth">
        Авторизация
      </h3>
      <label>
        Логин
      </label>
      <input className="form_control" type="text" name="user_name" placeholder="Ваш логин" onChange={onChange}/>
      
      <label>
        Пароль
      </label>
      <input className="form_control" type="password" name="user_password" placeholder="Ваш пароль" onChange={onChange}/>
      
      <button className="btn">
        Войти
      </button>
    </div>
  );
}