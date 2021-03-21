import React from 'react';
import { useState, useEffect } from 'react';
import './style.scss';

import {
  AppBar,
  Toolbar,
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
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch } from 'react-redux';
import { resetAuth } from '../../redux/actionCreators';

export default function UserPage(props){
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'login', headerName: 'Login', width: 130 },
    { field: 'password', headerName: 'Password', width: 130 },
    { field: 'salt', headerName: 'Salt', width: 130 },
    { field: 'accessLevel', headerName: 'AccessLevel', width: 140},
  ];

  const [rows, setRows] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [focsedOn, setFocused] = useState('');
  const [inputData, setInputData] = useState({ 
    login: '',
    password: '',
    accessLevel: '',
  });

  const closeModalHandler = e => {
    setModalState(false);
  };

  const rowClickHandler = e => {
    console.log(e);
    setSelectedRow(e.row);
    setModalState(true);
  }

  const focusHandler = e => {
    setFocused(e.target.id);
  }

  const blurHandler = e => {
    setFocused('');
  }

  const changeHandler = e => {
    setInputData({ ...inputData, [e.target.id] : e.target.value})
  }

  useEffect(() => {
    (async ()=>{
      const response = await fetch('/api/auth/users');
      const data = await response.json();
      setRows(data);
    })();
  }, []);

  const dispatch = useDispatch();
  const click_Handler = () => {
    dispatch(resetAuth());
  };

  return (
    <div className="user_page">
        <Modal open={modalState} onClose={closeModalHandler}>
          <div className="user_editModal">
            <IconButton className="user_icon" onClick={closeModalHandler}>
              <CancelTwoToneIcon color="action" className="white-text" />
            </IconButton>
            <div className="auth_div blackShadow">
              <Typography variant="h6">
              Редактирование
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
                <NativeSelect id="accessLevel" >
                  <option value="user" selected={selectedRow?.accessLevel === 'user'}>user</option>
                  <option value="admin" selected={selectedRow?.accessLevel === 'admin'}>admin</option>
                </NativeSelect>
              </FormControl>

              <div className="user_editModal_buttons">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Сохранить
                </Button>
                <IconButton>
                  <DeleteTwoToneIcon color="action" />
                </IconButton>
              </div>
            </div>
          </div>
        </Modal>
        <AppBar position="sticky">
          <Toolbar className="user_AppBar">
            <Typography variant="h6">
              {props.login}
            </Typography>
            <Button color="inherit" onClick={click_Handler}>Выйти</Button>
          </Toolbar>
        </AppBar>
        {
          props.accessLevel === "admin" ? 
          (
            <div className="user_table">
              <DataGrid rows={rows} columns={columns} autoPageSize onRowClick={rowClickHandler} />
            </div>
          ) 
          : 
          (        
            <div className="user_content">
              <img className="user_img" src="https://sun9-22.userapi.com/impf/c853528/v853528551/65da/32yObb4V8As.jpg?size=750x1334&quality=96&sign=9fd1b763425796a111749818bb5dfb4a&type=album" alt="Картинка"/>
            </div>
          )
        }
    </div>
  );
}