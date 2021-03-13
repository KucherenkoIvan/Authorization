import React from 'react';
import {useState} from 'react';
import './style.scss';
/*
*/
export default function Auth(props){
  return(
    <div>
      <label>
        Логин
      </label>
      <input />

      <label>
        Пароль
      </label>
      <input />
      
      <button>
        Войти
      </button>
    </div>
  );
}