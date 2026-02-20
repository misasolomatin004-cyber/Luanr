/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import SplashScreen from './pages/SplashScreen';
import AuthScreen from './pages/AuthScreen';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/shop" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}
