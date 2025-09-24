
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Page from './components/UI/Page/Page'
import Home from './components/Home/Home'
import UserCard from './components/Users/User'
import ProductCard from './components/ProductCard/ProductCard'
import UserDetail from './components/Users/UserDetail'
import PageNotFound from './components/UI/Page/PageNotFound'
export default function App() {
  return (
    <>
      <Page />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductCard />} />
        <Route path='/users' element={<UserCard />} >
          <Route path='/users/:id' element={<UserDetail />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
};