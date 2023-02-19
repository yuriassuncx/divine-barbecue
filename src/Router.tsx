import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Foods } from './pages/Foods';
import { PrivateRoute } from './utils/PrivateRoute';
import { FoodsAdmin } from './pages/FoodsAdmin';
import { Login } from './pages/Login';
import { NewFood } from './components/NewFood';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cardapios' element={<Menu />} />
      <Route path='/cardapios/:slug' element={<Foods />} />
      <Route path='/login' element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path='/admin/cardapios' element={<Menu />} />
        <Route path='/admin/cardapios/:slug' element={<FoodsAdmin />} />
        <Route path='/admin/comidas' element={<NewFood />} />
      </Route>
    </Routes>
  )
}
