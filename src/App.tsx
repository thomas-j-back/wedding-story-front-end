import { useState } from 'react'

import { Routes, Route } from 'react-router-dom';
import './App.css'
import StartPage from './pages/StartPage';
import WeddingForm from './pages/WeddingForm';
import BasicDetails from './pages/weddingFormSteps/BasicDetails';
import StyleSelect from './pages/weddingFormSteps/StyleSelect';
import CoupleUpload from './pages/weddingFormSteps/CoupleUpload';
import RelationshipStoryBuild from './pages/RelationshipStoryBuild';

function App() {

  return (
    // <Routes>
    //   <Route path="/" element={<StartPage />} />
    //   <Route path="/form" element={<WeddingForm />}>
    //     <Route index element={<BasicDetails />} />
    //     <Route path="style_select" element={<StyleSelect />} />
    //     <Route path="couple_style" element={<CoupleUpload />} />
    //   </Route>
    //   <Route path="/relationship_story" element={<RelationshipStoryBuild />} />
    // </Routes>
  )
}

export default App
