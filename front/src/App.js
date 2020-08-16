import React from 'react';
import './App.css';
import MyMap from "./components/MyMap";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyMap api_key={process.env.REACT_APP_GOOGLE_MAP_API_KEY}/>
      </header>
    </div>
  );
}

export default App;
