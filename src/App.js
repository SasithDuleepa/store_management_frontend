import logo from './logo.svg';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import './App.css';

import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';

import Pos from './pos/pos';
import Setting from './pages/setting/setting';

function App() {
  return (
    <>
    <Sidebar/>
    
    <div className='app'>
    <Router>
        <Switch>
          <Route exact path="/" component={Pos} />
          <Route exact path="/sale" component={Pos} />
          <Route exact path="/setting" component={Setting} />
        </Switch>
    </Router>
      
  
    </div>
    <Footer/>
    </>
    
  );
}

export default App;
