import './App.css';
import { Switch, Route} from "react-router-dom";
import MoviePage from "./Components/moviePage";
import SearchBar from "./Components/searchBar";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={SearchBar} />
        <Route exact path="/movie/:id" component={MoviePage} />
      </Switch>
    </div>
  );
}

export default App;
