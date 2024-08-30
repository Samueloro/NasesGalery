import { signOut } from "firebase/auth";
import { auth, storage } from "../../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'


interface NavbarProps {
  userName: string | undefined;
  userId:string | undefined;
}

function NavBar({ userName, userId }: Readonly<NavbarProps>) {
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

  //Subir imágen
  const [file, setFile] = useState<File | null>(null);

  const uploadfile = (file: File) => {
    const storageRef = ref(storage, `${userName}/${uuidv4()}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      alert("Imagen subida");
    });
  };

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
          <Link to="/home" className="hover:underline">Inicio</Link>
        </li>
        <li>
          <button onClick={uploadaNewPic} className="hover:underline">Subir Fotos</button>
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
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={chargeFile}
                />
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
          <Link to={`profile/${userName}`} className="capitalize hover:underline">
            Perfil : {userName}
          </Link>
        </li>
      </ul>
      <button className=" w-32 hover:underline" onClick={logOut} >
        Cerrar Sesion
      </button>
    </div>
  );
}

export default NavBar;
