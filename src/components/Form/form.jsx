import { useState } from "react";
import React from "react";
import "./form.css";

const preguntas = [
  "¿What is your name?",
  "¿What is your last name?",
  "¿How old are you?",
  "¿Where do you live?",
  "Enter your email address",
  "Enter your phone number",
  "Enter a password",
];

const placeholders = {
  name: "Name",
  lastName: "Last Name",
  age: "Select your age range",
  city: "Your city",
  email: "youremail@example.com",
  phone: "Your phone number (10 digits)",
  password: "********",
};

const Form = () => {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({
    name: "",
    lastName: "",
    age: "",
    city: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setRespuestas({
      ...respuestas,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const currentQuestion = Object.keys(respuestas)[paso];

    if (respuestas[currentQuestion].trim() === "") {
      alert("Por favor, responde la pregunta antes de continuar.");
      return;
    }

    if (currentQuestion === "email" && !respuestas[currentQuestion].includes("@")) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (currentQuestion === "password" && !/[A-Z]/.test(respuestas[currentQuestion])) {
      alert("La contraseña debe contener al menos una letra mayúscula.");
      return;
    }

    if (currentQuestion === "phone" && !/^\d{10}$/.test(respuestas[currentQuestion])) {
      alert("Por favor, ingresa un número de teléfono válido de 10 dígitos.");
      return;
    }

    setPaso(paso + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", respuestas);
  };

  return (
    <form onSubmit={handleSubmit}>
      {paso < preguntas.length ? (
        <>
          <label>{preguntas[paso]}</label>
          {paso === 2 ? (
            <select
              name="age"
              value={respuestas.age}
              onChange={handleChange}
              required
            >
              <option value="">{placeholders.age}</option>
              <option value="Menos de 18 años">Menos de 18 años</option>
              <option value="Entre 18 y 30 años">Entre 18 y 30 años</option>
              <option value="Más de 30 años">Más de 30 años</option>
            </select>
          ) : (
            <input
              type={paso === 6 ? "password" : "text"} 
              name={Object.keys(respuestas)[paso]}
              value={respuestas[Object.keys(respuestas)[paso]]}
              onChange={handleChange}
              required
              placeholder={placeholders[Object.keys(respuestas)[paso]]}
              pattern={paso === 5 ? "\\d{10}" : undefined}  // Solo números para teléfono
              minLength={paso === 5 ? 10 : undefined}
              maxLength={paso === 5 ? 10 : undefined}
            />
          )}
          <button type="button" onClick={handleNext}>
            Siguiente
          </button>
        </>
      ) : (
        <button type="submit">Enviar</button>
      )}
    </form>
  );
};

export default Form;
