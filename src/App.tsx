import './styles/App.scss';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
