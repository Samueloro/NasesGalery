import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../../firebase/firebaseConfig";

function CardsPosts() {
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllImages = async () => {
      const imagesRef = ref(storage, `PostImages/`);

      try {
        const imageList = await listAll(imagesRef);
        const imageURL = await Promise.all(
          imageList.items.map((imgRef) => getDownloadURL(imgRef))
        );
        setAllImages(imageURL)
      } catch (error) {
        console.error("Error al traer todas las imágenes", error)
      }
    };
    fetchAllImages();
  }, []);

  return (
    <div>
      <h3>Galeria Colectiva</h3>
      {allImages.length > 1 ? (
        <div>
          {allImages.map((url, index)=>(
            <div key={index}>
              <img src={url} alt={url} />
            </div>
          ))}
        </div>
      ):(
        <div>
          
        </div>
      )}
    </div>
  );
}

export default CardsPosts;
