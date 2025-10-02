
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Page from './components/UI/Page/Page'
import Home from './components/Home/Home'
import PageNotFound from './components/UI/Page/PageNotFound'
import Agents from './components/Agents/Agents'
import Weapons from './components/Weapons/Weapons'
import WeaponSkins from './components/Weapons/WeaponSkins'
import { useState } from 'react';
export default function App() {
  const [agent, setAgent] = useState(null);
  const [weapon, setWeapon] = useState(null);
  return (
    <>
      <Page />
      <Routes>
        <Route path='/' element={<Home setAgent={setAgent} />} />
        <Route path='/agents' element={<Agents agent={agent} />} />
        <Route path='/weapons' element={<Weapons setWeapon={setWeapon}/>} />
        <Route path='/weapons/skins' element={<WeaponSkins weapon={weapon}/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
};