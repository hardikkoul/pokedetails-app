import './App.css';
import React, { useState } from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return(
    <div className="App">
      <h1>PokeDex by Hardik</h1>
      <input type="text" placeholder="Enter Pokemon Name" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)}/>

      <button onClick={fetchPokemonData}>Search</button>

      {pokemonData && (
  <div>
    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Abilities</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{pokemonData.name}</td>
        <td>
          {pokemonData.types.map((typeData) => (
            <span key={typeData.slot}>{typeData.type.name} </span>
          ))}
        </td>
        <td>
  {pokemonData.abilities.map((abilityData, index) => (
    <span key={abilityData.slot}>
      {abilityData.ability.name}
      {index !== pokemonData.abilities.length - 1 && ", "}
    </span>
  ))}
</td>

      </tr>
    </tbody>
  </table>
  </div>
)}

    </div>
  );
}

export default App;
