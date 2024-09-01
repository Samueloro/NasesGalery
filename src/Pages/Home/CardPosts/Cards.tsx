import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../../firebase/firebaseConfig";
import { allImages } from "./interfaceCard";

interface acrdPostsProps {
  userName: string | undefined;
}

function CardsPosts({userName}:Readonly<acrdPostsProps>) {
  const [allImages, setAllImages] = useState<allImages[]>([]);

  const [imageLike, setImageLike] = useState<number[]>([]);

  useEffect(() => {
    const fetchAllImages = async () => {
      const imagesRef = ref(storage, `PostImages/`);

      try {
        const imageList = await listAll(imagesRef);
        const imageURL = await Promise.all(
          imageList.items.map((imgRef) => getDownloadURL(imgRef))
        );
        const imageNamePath = imageList.items.map(
          (img) => img.fullPath.split("_")[1]
        );

        const imageData: allImages[] = imageURL.map((url, index) => ({
          url,
          userPostName: imageNamePath[index],
        }));

        //Organizar las imágenes prímero las de otros users
        const sortedImages = imageData.slice().sort((a, b) => {
          if (a.userPostName === userName) return 1;
          if (b.userPostName === userName) return -1;
          return 0
        });

        setAllImages(sortedImages);
      } catch (error) {
        console.error("Error al traer todas las imágenes", error);
      }
    };
    fetchAllImages();
  }, [allImages, userName]);

  //Dar Like

  const handleLike = (index: number) => {
    // basado en el estado anterior de imageLike
    setImageLike((prevLikes) => {
      // estado actual de like
      const isLiked = prevLikes.includes(index);
      if (isLiked) {
        // quitar like
        return prevLikes.filter((i) => i !== index);
      } else {
        // agregar like
        return [...prevLikes, index];
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <h3 className="text-5xl text-GraySmoke font-medium">
          Galeria Colectiva
        </h3>
      </div>
      {allImages.length > 1 ? (
        <div className="p-10 pt-0">
          {allImages.map((imgData, index) => (
            <div key={index} className="cardPost">
              <h4 className="text-lg font-semibold mb-2 text-whiteSmoke ml-2">
                {imgData.userPostName}
                <span className="ml-2 ">ha posteado:</span>
              </h4>
              <img src={imgData.url} alt={imgData.url} className="imagePost" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(index)}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={
                        imageLike.includes(index)
                          ? "/assets/like2.svg"
                          : "/assets/like1.svg"
                      }
                      alt={
                        imageLike.includes(index) ? "Dar Like" : "Quitar Like"
                      }
                      className="w-6 h-6"
                    />
                    <span className="text-gray-600 font-medium ml-2">
                      {imageLike.includes(index) ? "Liked" : "Like"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CardsPosts;
