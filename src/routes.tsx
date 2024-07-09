import {Route, Routes } from 'react-router-dom/';
import { Hymn } from './components/Hymn';
import { Edit } from './components/Edit';
import { AddVerse } from './components/AddVerse';
import { ViewHymn } from './components/viewHymn';

const routes = () => {
    return (
        <Routes>
          <Route path="/" element={<Hymn />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/addVerse" element={<AddVerse />} />
          <Route path="/view/:id/:book" element={<Hymn />} />
        </Routes>
    );
  };
  
  export default routes;
