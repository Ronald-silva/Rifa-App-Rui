import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [confirmedNumbers, setConfirmedNumbers] = useState([]);
  const [notification, setNotification] = useState("");

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleNumberClick = (number) => {
    // Permite selecionar um número se ele não estiver confirmado
    if (!confirmedNumbers.includes(number)) {
      setSelectedNumber(number);
    }
  };

  const handleSubmit = () => {
    if (selectedNumber && name && whatsapp) {
      // Adiciona o número à lista de números confirmados
      setConfirmedNumbers([...confirmedNumbers, selectedNumber]);
      setNotification(`Número ${selectedNumber} comprado por ${name}.`);
      sendWhatsappNotification();

      // Reseta os campos após a compra
      setSelectedNumber(null);
      setName("");
      setWhatsapp("");
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const sendWhatsappNotification = () => {
    const whatsappMessage = `Olá ${name}, você escolheu o número ${selectedNumber} na nossa rifa! O valor a pagar é R$10,00.`;
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="app">
      <h1>Rifa Beneficente</h1>
      <div className="grid">
        {numbers.map((number) => (
          <div
            key={number}
            className={`number ${
              confirmedNumbers.includes(number) ? "confirmed" : selectedNumber === number ? "selected" : ""
            }`}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="form">
        <h2>Escolha um número:</h2>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="WhatsApp com código de país e DDD"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <button onClick={handleSubmit}>Comprar Número</button>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default App;
