import React from "react";
import { useFirebaseApp } from "reactfire";
import { BrowserRouter, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home";

function App() {
  const firebase = useFirebaseApp();
  console.log(firebase);
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    </>
  );
}

export default App;
