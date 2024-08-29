import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    signOut(auth);
  };

  const [picsForm, setPicsForm] = useState<boolean>(false);

  const uploadaNewPic = (): void => {
    setPicsForm((prevStatus) => !prevStatus);
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
            <form>
              <button>Cargar Imagen</button>
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Decripciión
              </label>
              <input
                name="description"
                placeholder="Ingresa una breve descripción"
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                type="text"
              />
              <div>
                <button onClick={uploadaNewPic}>cancelar</button>
                <button>Publicar</button>
              </div>
            </form>
          </div>
        )}
        <li>
          <Link to="/home">Perfil</Link>
        </li>
      </ul>
      <button className=" w-32" onClick={logOut}>
        Cerrar Sesion
      </button>
    </div>
  );
}

export default NavBar;
