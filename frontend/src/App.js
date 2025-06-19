import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import store from './redux/store';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>         {/* ✅ Only one BrowserRouter */}
        <Navbar />
        <div className="container mx-auto mt-4">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
