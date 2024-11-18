import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { PartnerSalesHistory } from './components/pages/PartnerSalesHistory/PartnerSalesHistory';
import { PartnersData } from './components/pages/PartnersData/PartnersData';
import { AmountMaterial } from './components/pages/AmountMaterial/AmountMaterial';

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Link to='/partners-data'>Данные партнеров</Link>
        <Link to='/partners-data-history'>Данные истории партнеров</Link>
        <Link to='/amount-material'>Метод с расчетом количества материала</Link>
        <Routes>
          <Route
            element={<PartnersData />}
            path='/partners-data'>
          </Route>
          <Route
            element={<PartnerSalesHistory />}
            path='/partners-data-history'>
          </Route>

          <Route
            element={<AmountMaterial />}
            path='/amount-material'>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
