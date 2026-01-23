import React from "react";
import {Routes,Route } from "react-router-dom";
import Client from "./layout/client";
import List from "./pages/List";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
function App() {
  return (
    <>
     <Routes>
       <Route path="/" element={<Client/>}>
          <Route path="list" element={<List/>}/>
          <Route path="edit/:id" element={<Edit/>}/>
           <Route path="add" element={<Add/>}/>
       </Route>
     </Routes>
    </>
  );
}

export default App;
