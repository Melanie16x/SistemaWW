import React, { useState } from 'react';
import '../styles/Asistente.scss';
import { FaPaperPlane } from 'react-icons/fa';

const Asistente = () => {
   // Estado para almacenar los mensajes en el chat
   const [messages, setMessages] = useState([
    { text: 'Hola, ¿cómo estás hoy?', type: 'bot' }  // Mensaje inicial del bot
  ]);

  // Estado para almacenar el texto ingresado por el usuario
  const [input, setInput] = useState('');

  // Función para manejar el envío de mensajes
  const handleSend = () => {
    if (input.trim()) {  // Verifica que el input no esté vacío
      // Actualiza el estado con el nuevo mensaje del usuario
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput('');  // Limpia el campo de entrada

      // Simulación de respuesta del bot
      setTimeout(() => {
        // Actualiza el estado con la respuesta del bot después de 1 segundo
        setMessages([...messages, { text: input, type: 'user' }, { text: '¿Cómo puedo ayudarte?', type: 'bot' }]);
      }, 1000);
    }
  };


  return (
    <div className="asistente">
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
          />
          <button onClick={handleSend}>
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Asistente;
