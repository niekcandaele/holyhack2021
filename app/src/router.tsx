import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, PageNotFound, Discover, Statistics, Frame, Movie, Series, Actor, Editor } from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Frame />} path="/view">
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Discover />} path="/discover" />
        <Route element={<Statistics />} path="/statistics" />
        <Route element={<Movie />} path="/movie/:id" />
        <Route element={<Series />} path="/series/:id" />
        <Route element={<Editor/>} path="/editor" />
        <Route element={<Actor/>} path="/actor/:id"/>
      </Route>
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
