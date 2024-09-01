import React, { useEffect, useState } from "react";
import { firestore } from "../../../firebase/firebaseConfig";
import { imageDataInterface } from "./interfaceCard";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { commentsInterface } from "../navbarInterfaces";

interface acrdPostsProps {
  userName: string | undefined;
}

function CardsPosts({ userName }: Readonly<acrdPostsProps>) {
  const [allImages, setAllImages] = useState<imageDataInterface[]>([]);
  const [imageLike, setImageLike] = useState<number[]>([]);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const imagesRef = collection(firestore, `images`);
        const querySnapshot = await getDocs(imagesRef);
        //para guardar la info de todos los post
        const imagesArray: imageDataInterface[] = [];
        //por cada dicymento agregamos un obj
        querySnapshot.forEach((doc) => {
          imagesArray.push({ id: doc.id, ...doc.data() } as imageDataInterface);
        });
        // primero los post de otros users
        const sortedImages = imagesArray.slice().sort((a, b) => {
          if (a.user === userName) return 1;
          if (b.user === userName) return -1;
          return 0;
        });
        setAllImages(sortedImages);
      } catch (error) {
        console.error("Error al traer todas las imágenes", error);
      }
    };
    fetchAllImages();
  }, [allImages, userName]);

  //Dar Like

  const handleLike = (imageId: string, index: number) => {
    setImageLike((prevLikes) => {
      const isLiked = prevLikes.includes(index);
      const imageDocRef = doc(firestore, `images/${imageId}`);
      const updateFireStore = async () => {
        try {
          //quitar de la lista de likes
          if (isLiked) {
            await updateDoc(imageDocRef, {
              likes: arrayRemove(userName),
            });
            return prevLikes.filter((i) => i !== index);
          } else {
            //agregar a la lista de likes
            await updateDoc(imageDocRef, {
              likes: arrayUnion(userName),
            });
            return [...prevLikes, index];
          }
        } catch (error) {
          console.error(
            isLiked ? "Error al eliminar like" : "Error al dar like",
            error
          );
          return prevLikes;
        }
      };
      //actualizamos el store
      updateFireStore().then((updateLikes) => {
        setImageLike(updateLikes);
      });
      return prevLikes;
    });
  };

  //Comentarios
  const [showInputC, setShowInputC] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>();
  const [newComment, setNewComment] = useState<string>("");

  const handleComments = async (index: number) => {
    setCommentId(index);
    setShowInputC((prevState) => !prevState);
  };

  const handleAddComments = async (id: string) => {
    if(newComment.trim()===""){
      setShowInputC(false);
    }
    const comment: commentsInterface = {
      user: userName,
      comment: newComment,
    };
    try {
      const imageDocRef = doc(firestore, `images/${id}`);
      await updateDoc(imageDocRef, {
        comments: arrayUnion(comment),
      });
      setNewComment("");
      setShowInputC(false);
    } catch (error) {
      console.error("Error al añadir comentario:", error);
    }
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
                {imgData.user}
                <span className="ml-2 ">ha posteado:</span>
              </h4>
              <img
                src={imgData.img}
                alt={`${imgData.user} puplicación`}
                className="imagePost"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(imgData.id, index)}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={
                        imageLike.includes(index) ||
                        imgData.likes.includes(userName || " ")
                          ? "/assets/like2.svg"
                          : "/assets/like1.svg"
                      }
                      alt={
                        imageLike.includes(index) ? "Dar Like" : "Quitar Like"
                      }
                      className="w-6 h-6"
                    />
                    <span className="text-whiteSmoke ml-2">
                      {imgData.likes.length}
                    </span>
                    <span className="text-gray-600 font-medium ml-2">
                      {imgData.likes.includes(userName || " ")
                        ? "Liked"
                        : "Like"}
                    </span>
                  </button>
                  <button
                    className="text-whiteSmoke font-semibold hover:text-EsmeraldGreen active:scale-95"
                    onClick={() => handleComments(index)}
                  >
                    Comentar
                  </button>
                </div>
                <div>
                  {imgData.comments.map((c, index) => (
                    <div key={index} className="my-2 px-4 border-2 rounded-lg border-GrayBoard">
                      <h5 className="text-sm text-DarkGold font-medium">
                        {c.user} ha comentado:
                      </h5>
                      <p className="text-whiteSmoke font-medium">{c.comment}</p>
                    </div>
                  ))}
                </div>
                {showInputC && commentId === index && (
                  <div className="flex flex-col items-end">
                    <textarea
                      onChange={(e) => setNewComment(e.target.value)}
                      name="comment"
                      className="w-full rounded-lg mt-4 px-4 bg-transparent border-2 border-t-whiteSmoke"
                    />
                    <button
                      onClick={() => handleAddComments(imgData.id)}
                      className="acceptActionButton2 mt-2"
                    >
                      Añadir comentario
                    </button>
                  </div>
                )}
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
