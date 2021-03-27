import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, PageNotFound, Discover, Statistics, Frame, Movie, Show , Editor } from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Frame />} path="/">
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Discover />} path="/discover" />
        <Route element={<Statistics />} path="/statistics" />
        <Route element={<Movie />} path="/movie/:id" />
        <Route element={<Show />} path="/show/:id" />
        <Route element={<Editor/>} path="/editor" />
      </Route>
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
