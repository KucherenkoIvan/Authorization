import React from 'react';
import { useState, useEffect } from 'react';
import './style.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch } from 'react-redux';
import { resetAuth } from '../../redux/actionCreators' 

export default function UserPage(props){

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'login', headerName: 'Login', width: 130 },
    { field: 'password', headerName: 'Password', width: 130 },
    { field: 'salt', headerName: 'Salt', width: 130 },
    { field: 'accessLevel', headerName: 'AccessLevel', width: 140},
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async ()=>{
      const response = await fetch('/api/auth/users');
      const data = await response.json();
      setRows(data);
    })();
  });

  const dispatch = useDispatch();
  const click_Handler = () => {
    dispatch(resetAuth());
  };

  return(
    <div className="user_page">
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
              <DataGrid rows={rows} columns={columns} autoPageSize/>
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