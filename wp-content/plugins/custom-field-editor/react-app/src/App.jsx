import React, { useState } from 'react';
import TextInputBlock from './components/TextInputBlock/TextInputBlock';  // Импортируем компонент

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <div className="App">
      <h1>My React App</h1>
      {/* Используем компонент TextInputBlock */}
      <TextInputBlock 
        label="Enter your text:" 
        initialValue={inputValue} 
        onChange={handleInputChange} 
      />
      <div>
        <p>You entered: {inputValue}</p>
      </div>

      <TextInputBlock 
        label="Enter your text2:" 
        initialValue={inputValue} 
        onChange={handleInputChange} 
      />
      <div>
        <p>You entered: {inputValue}</p>
      </div>
    </div>
  );
}

export default App;
