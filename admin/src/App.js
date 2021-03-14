import Auth from './components/auth/Auth';
import { useSelector } from 'react-redux';
import './App.scss';

function App() {
  const isAuthorized = useSelector(state => !!state.auth.token);
  return (
    <div className="App">
      {!isAuthorized &&
        (<Auth/>)
      }
    </div>
  );
}

export default App;
