import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UsersList from './usersList';
import UserDetailsPage from './userDetailsPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={UsersList} />
          <Route path="/:username" children={<UserDetailsPage />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
