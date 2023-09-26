import { Route, Routes } from 'react-router-dom';
import ProductList from '../../pages/product-list/product-list';
import Product from '../../pages/product/product';
import Login from '../../pages/login/login';
import Registration from '../../pages/registration/registration';
import NotFound from '../../pages/not-found/not-found';
import AddItem from '../../pages/add-item/add-item';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../utils/browser-history';
import { useAppSelector } from '../../hooks';


function App(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<ProductList />}
        />
        <Route
          path={AppRoute.Product}
          element={<Product />}
        />
        <Route
          path={`${AppRoute.Add}/:index`}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <AddItem />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Registration}
          element={<Registration />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
