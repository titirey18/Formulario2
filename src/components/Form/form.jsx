import { useState } from "react";
import React from "react";
import "./form.css";
import "animate.css"; // Asegúrate de tener animate.css instalada o importada en tu proyecto.

const preguntas = [
  "¿What is your name?*",
  "¿What is your last name?*",
  "¿How old are you?*",
  "¿Where do you live?*",
  "Enter your email address*",
  "Enter your phone number*",
];

const placeholders = {
  name: "Name",
  lastName: "Last Name",
  age: "Select your age range",
  city: "Your city",
  email: "youremail@example.com",
  phone: "Your phone number",
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
  });

  const [errores, setErrores] = useState({
    name: "",
    lastName: "",
    age: "",
    city: "",
    email: "",
    phone: "",
  });

  const [animacion, setAnimacion] = useState("animate__fadeInUpBig");

  const handleChange = (e) => {
    setRespuestas({
      ...respuestas,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const currentKey = Object.keys(respuestas)[paso];
    let newErrores = { ...errores };

    if (respuestas[currentKey].trim() === "") {
      newErrores[currentKey] = "Este campo es obligatorio";
    } else {
      newErrores[currentKey] = "";
    }

    if (currentKey === "email" && !respuestas[currentKey].includes("@")) {
      newErrores.email = "Por favor, introduce una dirección de correo electrónico válida";
    }

    if (currentKey === "phone" && !/^\d{10}$/.test(respuestas[currentKey])) {
      newErrores.phone = "El número de teléfono debe tener exactamente 10 dígitos";
    }

    setErrores(newErrores);

    if (Object.values(newErrores).every((error) => error === "")) {
      setAnimacion("animate__fadeOutUpBig"); 

      setPaso(paso + 1);
      setTimeout(() => {
        setAnimacion("animate__fadeInUpBig"); 
      }, 200); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", respuestas);
  };

  return (
    <div className={`animate__animated ${animacion}`} key={paso}>
      <form onSubmit={handleSubmit}>
        {paso < preguntas.length ? (
          <>
            <label>{preguntas[paso]}</label>

            <div>
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
                  type={paso === 4 ? "email" : "text"}
                  name={Object.keys(respuestas)[paso]}
                  value={respuestas[Object.keys(respuestas)[paso]]}
                  onChange={handleChange}
                  required
                  placeholder={placeholders[Object.keys(respuestas)[paso]]}
                />
              )}
            </div>

            {errores[Object.keys(respuestas)[paso]] && (
              <span>{errores[Object.keys(respuestas)[paso]]}</span>
            )}

            <button type="button" onClick={handleNext}>
              Ok
            </button>
          </>
        ) : (
          <button type="submit">Enviar</button>
        )}
      </form>
    </div>
  );
};

export default Form;
