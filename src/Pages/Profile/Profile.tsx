import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase/firebaseConfig";

interface ProfileProps {
  userName: string | undefined;
}

function Profile({ userName }: Readonly<ProfileProps>) {
  const { name } = useParams<{ name: string }>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, `PostImages/`);
      try {
        const imageList = await listAll(imagesRef);
        //encontrar solo las imágenes que coincidan con el usuario
        const userImages = imageList.items.filter((iref) => {
          const splitRef = iref.name.split("_")[1];
          return splitRef === userName;
        });

        const urls = await Promise.all(
          userImages.map((imageRef) => getDownloadURL(imageRef))
        );
        setImages(urls);
      } catch (error) {
        console.error("Error al traer imágenes: ", error);
      }
    };
    fetchImages();
  }, [name, images, userName]);

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
            {images.map((url, index) => (
              <div key={index} className="w-fit h-fit m-1 flex flex-row flex-wrap justify-center p-4">
                <img
                  src={url}
                  alt={`Imagen ${index}`}
                  className="rounded-lg hover:scale-110 h-40"
                />
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
