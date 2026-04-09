import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/not-found/page';
import LandingPage from './pages/landing/page';

function App() {

  return (
    <div 
      className="relative flex flex-col w-screen h-screen overflow-hidden"
    >
      <BrowserRouter basename="/react01/">
          <Routes>
            <Route path='/' element={<LandingPage />}/>

            {/* 에러 페이지 */}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
