import React from "react";
import { useState, useEffect } from "react";
import EditModal from "../editModal/EditModal";
import "./style.scss";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

import { DataGrid } from "@material-ui/data-grid";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsers,
  resetAuth,
  setInModalStore,
} from "../../redux/actionCreators";

export default function UserPage(props) {
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "login", headerName: "Login", width: 130 },
    { field: "password", headerName: "Password", width: 130 },
    { field: "salt", headerName: "Salt", width: 130 },
    { field: "accessLevel", headerName: "AccessLevel", width: 140 },
  ];
  const rows = useSelector((state) => state.users.rows);

  const rowClickHandler = (e) => {
    dispatch(
      setInModalStore({
        key: "editModal",
        value: {
          isOpen: true,
          selectedRow: e?.row,
        },
      })
    );
  };

  const click_Handler = () => {
    dispatch(resetAuth());
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <div className="user_page">
      <EditModal />

      <AppBar position="sticky">
        <Toolbar className="user_AppBar">
          <Typography variant="h6">{props.login}</Typography>
          <IconButton onClick={rowClickHandler}>
            <AddCircleTwoToneIcon className="white-text" />
          </IconButton>
          <Button color="inherit" onClick={click_Handler}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      {props.accessLevel === "admin" ? (
        <div className="user_table">
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize
            onRowClick={rowClickHandler}
          />
        </div>
      ) : (
        <div className="user_content">
          <img
            className="user_img"
            src="https://sun9-22.userapi.com/impf/c853528/v853528551/65da/32yObb4V8As.jpg?size=750x1334&quality=96&sign=9fd1b763425796a111749818bb5dfb4a&type=album"
            alt="Картинка"
          />
        </div>
      )}
    </div>
  );
}
