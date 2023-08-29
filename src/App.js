import logo from './logo.svg';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import './App.css';

import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';

import Pos from './pages/pos/pos';
import Setting from './pages/setting/setting';
import Catergory from './pages/setting/catergory/catergory';
import Items from './pages/setting/items/items';
import Stock from './pages/stock/stock';
import Customer from './pages/customers/customer';
import ReturnBill from './pages/returnBill/returnBill';
import Email from './pages/email/email';

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
          <Route exact path="/setting/catergory" component={Catergory}/>
          <Route exact path="/setting/items" component={Items}/>
          <Route exact path="/stock" component={Stock}/>
          <Route exact path="/customer" component={Customer}/>
          <Route exact path="/return" component={ReturnBill}/>
          <Route exact path="/email" component={Email}/>
        </Switch>
    </Router>
      
  
    </div>
    <Footer/>
    </>
    
  );
}

export default App;
