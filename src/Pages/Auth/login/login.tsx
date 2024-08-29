import React, { useState } from "react";

function LoginComponent() {
  const [formRegister, setFormRegister] = useState<boolean>(true);

  const register = (): void => {
    setFormRegister((prevState) => !prevState);
    console.log(formRegister);
  };

  return (
    <div className="grid grid-cols-2 w-screen h-screen bg-slate-800 overflow-hidden">
      {formRegister && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-400 rounded-lg flex-col p-8">
            <p className="text-2xl font-medium pb-7">Registro</p>
            <form className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col mr-6">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                    type="text"
                    placeholder="Ingresa tu nombre"
                  />
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                    type="text"
                    placeholder="Ingresa tu apellido"
                  />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                type="email"
                placeholder="Ingresa tu correo"
              />

              <label
                className="my-4 block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Contraseña
              </label>
              <input
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </form>
            <div className="flex justify-center">
              <button
                onClick={register}
                className="p-2 m-6 bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800"
              >
                Vover
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            type="email"
            placeholder="Ingresa tu correo"
          />

          <label
            className="my-4 block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            type="password"
            placeholder="Ingresa tu contraseña"
          />
        </form>

        <button
          onClick={register}
          className="p-2 m-6 bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800"
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
