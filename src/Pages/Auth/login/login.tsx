import React, { useState } from "react";
//interfaces
import {
  loginErrors,
  loginUser,
  registerErrors,
  registerUser,
} from "../userInterfaces";
//
import { validationLogin } from "./loginValidation";
import { validationRegister } from "./registerValidation";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function LoginComponent() {
  //manejar los errores de logueo
  const [errorsLogin, setErrorsLogin] = useState<loginErrors>({
    email: "",
    password: "",
  });

  // manejar errores de registro
  const [errorsRegister, setErrorsRegister] = useState<registerErrors>({
    email: "",
    password: "",
    userName: "",
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
  };

  //obtener la información del usuario al registrarse
  const [userRegister, setUserRegister] = useState<registerUser>({
    email: "",
    password: "",
    userName: "",
  });

  const handleRegisterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
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

  //función de registro para el usuario

  const registerUser = async (event: React.FormEvent) => {
    event.preventDefault();
    if (errorsRegister.email === "" && errorsRegister.password === "") {
      try {
        //Registra el user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userRegister.email,
          userRegister.password
        );
        const userSave = userCredential.user;
        console.log(userCredential);
        // loguarda en base de datos
        const userRef = doc(firestore, `users/${userSave.uid}`);
        await setDoc(userRef, {
          email: userSave.email,
          userName: userRegister.userName,
        });
        alert("se ha logueado");
      } catch (error) {
        alert("Error al crear usuario");
      }
    }
  };

  //función de login para el usuario
  const loginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!errorsLogin.email && !errorsLogin.password) {
      try {
        await signInWithEmailAndPassword(
          auth,
          userLogin.email,
          userLogin.password
        );
        alert("se ha logueado");
      } catch (error) {
        alert("Email o contraseña incorrectos");
      }
    }
  };

  return (
    <div className="grid grid-cols-2 w-screen h-screen bg-slate-800 overflow-hidden">
      {formRegister && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-400 rounded-lg flex-col p-8">
            <p className="text-3xl font-semibold pb-7 flex items-center justify-center">
              Registro
            </p>
            <form className="flex flex-col" onSubmit={registerUser}>
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
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="userName"
              >
                Nombre de usuario
              </label>
              <input
                id="userName"
                name="userName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                type="text"
                placeholder="Ingresa tu correo"
                onChange={handleRegisterChange}
              />
              {errorsRegister.userName && (
                <span className="text-sm p-0 m-0 text-red-500">
                  {errorsRegister.userName}
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
                <span className="text-sm p-0 m-0  text-red-500">
                  {errorsRegister.password}
                </span>
              )}
              <div className="flex flex-row justify-between items-center">
                <button
                  onClick={registerForm}
                  className="p-2 mt-6 mr-8 bg-red-800 rounded-lg hover:scale-95 active:scale-90 active:bg-red-900"
                >
                  Tengo una cuenta
                </button>

                <button
                  className="p-2 mt-6 ml-8 bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800"
                  type="submit"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="h-fit w-1/2 ml-52 mt-64 rounded-lg bg-slate-400 flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-semibold p-8">Nases Galery</h1>
        <p className="text-2xl font-medium pb-7">Ingresa a tu cuenta</p>

        <form className="flex flex-col" onSubmit={loginUser}>
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
          <button
            className="p-2 mt-6 w-full bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800"
            type="submit"
          >
            Ingresa
          </button>
        </form>

        <span>o</span>
        <button
          onClick={registerForm}
          className="p-2 mb-6 w-fit bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800"
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
