import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, PageNotFound } from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
