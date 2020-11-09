import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";

function App() { // The App component will decide which page to render, based on the url
  function getPage() {
    const route = window.location.pathname;
    if (route === "/about") return <AboutPage />;
    return <HomePage />;
  }
  return (
    <div className="container-fluid">
      <Header />
      {getPage()}
    </div>
  );
}

export default App;
