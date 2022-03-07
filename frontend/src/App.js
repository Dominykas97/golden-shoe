import './App.css';
import React, { useState, useEffect } from 'react';
import { SmallShoe } from './SmallShoe';

function App() {
  useEffect(() => {
    console.log("loaded");
    getShoes();
  }, []);

  const [shoes, setShoes] = React.useState([]);
  const getShoes = async () => {
    const response = await fetch('/shoes').then((response) => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }
      return response;
    });
    const shoes = await response.json();
    console.log(shoes);
    setShoes(shoes);
  };
  return (
    <div className="app">
      <h1>Golden Shoe</h1>

      {shoes && (
        Object.keys(shoes).length === 0
          ? <p>No shoes</p>
          :
          <div>
            {Object.values(shoes).map(function (shoeData, idx) {
              return <SmallShoe shoeData={shoeData}></SmallShoe>
            })}
          </div>
      )}

    </div>
  );
}

export default App;
