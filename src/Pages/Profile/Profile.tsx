import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase/firebaseConfig";

function Profile() {
  const { id } = useParams<{id:string}>();
  const [images, setImages] = useState<string[]>([]);

    useEffect(()=>{
        const fetchImages = async()=>{
            const imagesRef = ref(storage, `${id}`);
            try {
                const imageList = await listAll(imagesRef);
                const urls = await Promise.all(
                    imageList.items.map((imageRef)=> getDownloadURL(imageRef))
                );
                setImages(urls);
            } catch (error) {
                console.error("Error al traer imágenes: ", error);
            }
        };
        fetchImages();
    },[id])

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-4xl p-6 mt-12 text-white font-bold">
          Mis Imágenes
        </h3>
        </div>
      {images.length > 0 ? 
      <div className="flex flex-row flex-wrap justify-center  p-6 h-full w-full">
        {images.map((url, index)=>(
            <div key={index} className="w-1/5 h-1/5 m-1">
            <img  src={url} alt={`Imagen ${index}`} className="rounded-lg"/>
            </div>
        ))}
      </div>
      :
      <div className="flex justify-center p-14">
      <p className="text-white ">No se encontraron imágenes</p>
      </div>
      }
    </div>
  );
}

export default Profile;
