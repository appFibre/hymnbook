import {Route, Routes } from 'react-router-dom/';
import { Index } from './components/Index';
import { Edit } from './components/Edit';
import { AddVerse } from './components/AddVerse';
import { ViewHymn } from './components/viewHymn';

const routes = () => {
    return (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/edit" element={<Index />} />
          {/* <Route path="/edit" element={<Edit />} /> */}
          <Route path="/addVerse" element={<AddVerse />} />
          <Route path="/view/:book/:id" element={<Index />} />
          <Route path="/edit/:book/:id" element={<Index />} />
        </Routes>
    );
  };
  
  export default routes;
