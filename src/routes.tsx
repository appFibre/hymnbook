import {Route, Routes } from 'react-router-dom/';
import { Index } from './components/Index';
import { AddVerse } from './components/AddVerse';

const routes = () => {
    return (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/edit" element={<Index />} />
          {/* <Route path="/edit" element={<Edit />} /> */}
          <Route path="/addVerse" element={<AddVerse />} />
          <Route path="/view/:id" element={<Index />} />
          <Route path="/edit/:id" element={<Index />} />
        </Routes>
    );
  };
  
  export default routes;
