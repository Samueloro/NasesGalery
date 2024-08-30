import { signOut } from "firebase/auth";
import { auth, uploadfile } from "../../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

interface NavbarProps {
  userName:string | undefined;
}

function NavBar({userName}:Readonly<NavbarProps>) {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    signOut(auth);
  };

  //Formulario para subir imágenes
  const [picsForm, setPicsForm] = useState<boolean>(false);
  const uploadaNewPic = (): void => {
    setPicsForm((prevStatus) => !prevStatus);
  };

  const [file, setFile] = useState<File | null>(null);
  
  const chargeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const uploadImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      uploadfile(file);
    }
  };

  return (
    <div className="flex flex-row justify-around p-6 bg-slate-800 text-white">
      <ul className="flex flex-row w-full justify-around">
        <li>
          <Link to="/home">Inicio</Link>
        </li>
        <li>
          <button onClick={uploadaNewPic}>Subir Fotos</button>
        </li>
        {picsForm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form
              className="bg-slate-400 w-1/4 h-1/4 rounded-lg p-6 flex flex-col justify-around"
              onSubmit={uploadImage}
            >
              <div className="flex items-center justify-center">
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="hidden"
                  onChange={chargeFile}
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Subir Imagen
                </label>
                <span
                  id="fileName"
                  className="mt-2 text-sm text-gray-700"
                ></span>
              </div>

              <div className="flex flex-row justify-between items-center">
                <button
                  onClick={uploadaNewPic}
                  className="p-2 mt-6 mr-8 bg-red-800 rounded-lg hover:scale-95 active:scale-90 active:bg-red-900"
                >
                  Cancelar
                </button>
                <button className="p-2 mt-6 ml-8 bg-green-700 rounded-lg hover:scale-95 active:scale-90 active:bg-green-800">
                  Publicar
                </button>
              </div>
            </form>
          </div>
        )}
        <li>
          <Link to="/home" className="capitalize" >{userName}</Link>
        </li>
      </ul>
      <button className=" w-32" onClick={logOut}>
        Cerrar Sesion
      </button>
    </div>
  );
}

export default NavBar;
