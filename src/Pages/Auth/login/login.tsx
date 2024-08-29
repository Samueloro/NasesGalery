import React, { useState } from "react";
import {
  loginErrors,
  loginUser,
  registerErrors,
  registerUser,
} from "../userInterfaces";
import { validationLogin } from "./loginValidation";
import { validationRegister } from "./registerValidation";

function LoginComponent() {
  //manejar los errores de logueo
  const [errorsLogin, setErrorsLogin] = useState<loginErrors>({
    email: "",
    password: "",
  });

  // manejar errores de registro
  const [errorsRegister, setErrorsRegister] = useState<registerErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  //obtener información del usuario al loguearse
  const [userLogin, setUserLogin] = useState<loginUser>({
    email: "",
    password: "",
  });

  const handleLoginChange = (event: any): void => {
    const { name, value } = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
    //validar los errorres
    setErrorsLogin(
      validationLogin({
        ...userLogin,
        [name]: value,
      })
    );
    console.log(errorsLogin);
  };

  //obtener la información del usuario al registrarse
  const [userRegister, setUserRegister] = useState<registerUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleRegisterChange = (event: any): void => {
    const { name, value } = event.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
    //validar los errores
    setErrorsRegister(
      validationRegister({
        ...userRegister,
        [name]: value,
      })
    );
  };

  //mostrar el form de registro
  const [formRegister, setFormRegister] = useState<boolean>(false);
  const registerForm = (): void => {
    setFormRegister((prevState) => !prevState);
  };

  return (
    <div className="grid grid-cols-2 w-screen h-screen bg-slate-800 overflow-hidden">
      {formRegister && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-400 rounded-lg flex-col p-8">
            <p className="text-3xl font-semibold pb-7 flex items-center justify-center">
              Registro
            </p>
            <form className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col mr-6">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="firstName"
                  >
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    onChange={handleRegisterChange}
                  />
                  {errorsRegister.firstName && (
                    <span className="text-sm p-0 m-0 text-red-500">
                      {errorsRegister.firstName}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="lastName"
                  >
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                    type="text"
                    placeholder="Ingresa tu apellido"
                    onChange={handleRegisterChange}
                  />
                  {errorsRegister.lastName && (
                    <span className="text-sm p-0 m-0 text-red-500">
                      {errorsRegister.lastName}
                    </span>
                  )}
                </div>
              </div>

              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Correo
              </label>
              <input
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                type="email"
                placeholder="Ingresa tu correo"
                onChange={handleRegisterChange}
              />
              {errorsRegister.email && (
                <span className="text-sm p-0 m-0 text-red-500">
                  {errorsRegister.email}
                </span>
              )}

              <label
                className="my-4 block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                type="password"
                placeholder="Ingresa tu contraseña"
                onChange={handleRegisterChange}
              />
              {errorsRegister.password && (
                <span className="text-sm p-0 m-0 text-red-500">
                  {errorsRegister.password}
                </span>
              )}
            </form>
            <div className="flex flex-row justify-between items-center">
              <button
                onClick={registerForm}
                className="p-2 mt-6 bg-red-800 rounded-lg hover:scale-95 active:scale-90 active:bg-red-900"
              >
                Tengo una cuenta
              </button>

              <button className="p-2 mt-6 bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800">
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-fit w-1/2 ml-52 mt-64 rounded-lg bg-slate-400 flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-semibold p-8">Nases Galery</h1>
        <p className="text-2xl font-medium pb-7">Ingresa a tu cuenta</p>

        <form className="flex flex-col">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            type="email"
            placeholder="Ingresa tu correo"
            onChange={handleLoginChange}
          />
          {errorsLogin.email && (
            <span className="text-sm p-0 m-0 text-red-500">
              {errorsLogin.email}
            </span>
          )}

          <label
            className="my-4 block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleLoginChange}
          />
          {errorsLogin.password && (
            <span className="text-sm p-0 m-0 text-red-500">
              {errorsLogin.password}
            </span>
          )}
        </form>

        <button
          onClick={registerForm}
          className="p-2 mt-6 w-52 bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800"
        >
          Ingresa
        </button>
        <span>o</span>
        <button
          onClick={registerForm}
          className="p-2 mb-6 w-52 bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800"
        >
          Crea una cuenta
        </button>
      </div>

      <div className="object-cover mx-auto my-auto h-full w-full m-0 p-0">
        <img
          src="https://cdn.pixabay.com/photo/2023/08/15/09/21/camera-8191564_1280.jpg"
          alt="landscape with boy"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default LoginComponent;
