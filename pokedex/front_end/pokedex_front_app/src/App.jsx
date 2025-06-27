import React from 'react';
import PcContainer from './components/PcContainer';  // <-- c’est le parent

import './App.css';

function App() {
  return (
   <>
       <header
        style={{
          width: '100%',
          padding: '15px 0',
          textAlign: 'center',

          userSelect: 'none',
          marginTop: '20px',
          marginBottom: '50px', 
        }}
      >
        <h1
          style={{
            fontFamily: 'PokemonFont, sans-serif',
            fontSize: 'clamp(30px, 6vw, 65px)',
            margin: 0,
            color: '#000',
            textShadow: '2px 2px 0 #000',
          }}
        >
          POPOKEDEX
        </h1>
      </header>

     <main>
        <PcContainer />
      </main>
    </>
  );
}

export default App;
