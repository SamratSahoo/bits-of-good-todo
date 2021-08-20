import TodoPage from "./components/TodoPage";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="App">
          <Route path="/" component={TodoPage} exact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;