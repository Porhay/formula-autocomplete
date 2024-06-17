import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import MainPage from '../pages/Main';

export const publicRoutes = [
  {
    path: ROUTES.MAIN,
    Component: MainPage,
  },
];

const Router = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default Router;
