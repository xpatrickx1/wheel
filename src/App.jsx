import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { Wheel } from './components/Wheel';
import Dashboard from './pages/Dashboard';
import WidgetPage from './pages/WidgetPage';
import { Wheeltest } from './pages/Wheeltest';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/wheel" element={<Wheel />} />
        <Route path="/dashboard" element={<Dashboard />} />


        {/* окремий віджет за slug */}
        <Route path="/widgets/:slug" element={<WidgetPage />} />
        <Route path="/wheeltest" element={<Wheeltest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
