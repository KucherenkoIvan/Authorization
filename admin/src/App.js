import Auth from "./components/auth/Auth";
import UserPage from "./components/userPage/UserPage";
import { useSelector } from "react-redux";
import "./App.scss";

function App() {
  const accessLevel = useSelector((state) => state.auth.data?.accessLevel);
  const login = useSelector((state) => state.auth.data?.login);

  const isAuthorized = !!accessLevel;

  return (
    <div className="App">
      {isAuthorized ? (
        <UserPage accessLevel={accessLevel} login={login} />
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
