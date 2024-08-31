import { signOut } from "firebase/auth";
import { auth, storage } from "../../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

interface NavbarProps {
  userName: string | undefined;
  userId: string | undefined;
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
    const storageRef = ref(storage, `PostImages/${uuidv4()}_${userName}`);
    uploadBytes(storageRef, file).then((snapshot) => {});
  };

  const chargeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const uploadImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      uploadfile(file);
      Swal.fire({
        icon: "success",
        title: "Imagen subida",
        text: "Puedes revisar tu imagen en tu perfil",
        customClass:{
          title:"text-white",
          popup:"bg-Charcoal",
          confirmButton:"acceptActionButton"
        }
      })
      setFile(null)
      setPicsForm((prevStatus) => !prevStatus);
    } else {
      Swal.fire({
        icon: "error",
        title: "Publicación invalida",
        text: "Algo ha ido mal y no ha sido posible subir la imagen",
        customClass:{
          title:"text-white",
          popup:"bg-Charcoal border-4 border-GrayBoard",
          confirmButton:"acceptActionButton"
        }
      })
    }
  };

  return (
    <div className="flex flex-row justify-around p-2 bg-Charcoal text-whiteSmoke font-semibold text-lg border-b-4 border-GrayBoard">
      <ul className="flex flex-row w-full justify-around items-center">
        <li>
          <Link
            to="/home"
            className="hover:underline flex justify-center items-center"
          >
            <img src="/assets/Home.svg" alt="Inicio" title="Inicio" />
            <span className="ml-2">Inicio</span>
          </Link>
        </li>
        <li>
          <button
            onClick={uploadaNewPic}
            className="hover:underline flex justify-center items-center"
          >
            <span className=" mr-2">Subir Fotos</span>
            <img src="/assets/addPhoto.svg" alt="Add" title="Subir" />
          </button>
        </li>
        {picsForm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form
              className="bg-Charcoal border-4 border-GrayBoard w-1/4 h-1/4 rounded-lg p-6 flex flex-col justify-around"
              onSubmit={uploadImage}
            >
              <div className="flex items-center justify-center">
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="block w-full text-sm text-DarkBlueMarine border border-GrayBoard rounded-lg cursor-pointer bg-Charcoal  focus:outline-none"
                  onChange={chargeFile}
                />
              </div>

              <div className="flex flex-row justify-between items-center">
                <button
                  onClick={uploadaNewPic}
                  className="mt-6 mr-8  declineActionButton2 "
                >
                  Cancelar
                </button>
                <button className="acceptActionButton2 text-whiteSmoke">
                  Publicar
                </button>
              </div>
            </form>
          </div>
        )}
        <li>
          <Link
            to={`profile/${userName}`}
            className="flex justify-center items-center capitalize hover:underline"
          >
            <span>Mi Perfil</span>
            <img src="/assets/Profile.svg" alt="profile" title={userName} />
          </Link>
        </li>
      </ul>
      <button className="w-10 mr-20" onClick={logOut}>
        <img src="/assets/Logout.svg" alt="logout" title="Cerrar Sesion" />
      </button>
    </div>
  );
}

export default NavBar;
