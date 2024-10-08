import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { imageDataInterface } from "../Home/CardPosts/interfaceCard";

interface ProfileProps {
  userName: string | undefined;
}

function Profile({ userName }: Readonly<ProfileProps>) {
  const { name } = useParams<{ name: string }>();
  const [images, setImages] = useState<imageDataInterface[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = collection(firestore, `images`);
        const querySnapshot = await getDocs(imagesRef);
        const allImages: imageDataInterface[] = [];

        querySnapshot.forEach((doc) => {
          allImages.push({ id: doc.id, ...doc.data() } as imageDataInterface);
          //filtrar solos las que pertenencen al perfil del user
          if (doc.data().user === name) {
            const filterUserImages = allImages.filter(
              (img) => img.user === name
            );
            setImages(filterUserImages);
          }
        });
      } catch (error) {
        console.error("Error al traer imágenes: ", error);
      }
    };
    fetchImages();
  }, [name, userName]);

  return (
    <>
      <div className="flex justify-center">
        <h3 className="text-4xl p-6 mt-12 text-white font-bold">
          Mis Imágenes
        </h3>
      </div>
      <div className="flex justify-center w-full h-full">
        {images.length > 0 ? (
          <div className="flex  flex-wrap justify-center mx-6 p-2 h-full w-full rounded-lg bg-black bg-opacity-40">
            {images.map((data, index) => (
              <div
                key={index}
                className="group relative w-fit h-fit m-1 flex flex-row flex-wrap justify-center p-4"
              >
                <img
                  src={data.img}
                  alt={`Post número ${index} de ${data.user}`}
                  className="rounded-lg  h-40"
                />
                <div className="flex flex-row items-center justify-center p-4 rounded-lg absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-80 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-row justify-center items-center">
                    <span className="font-medium mr-2">
                      {data.likes.length}
                    </span>
                    <img src="/assets/like2.svg" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center p-14">
            <p className="text-white ">No se encontraron imágenes</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
