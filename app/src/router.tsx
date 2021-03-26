import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, PageNotFound, Discover, Statistics, Frame } from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Frame />} path="/dashboard">
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Discover />} path="/statistics" />
        <Route element={<Statistics />} path="/discover" />
      </Route>
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
