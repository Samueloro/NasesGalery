import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore, storage } from "../../../firebase/firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { UserImage } from "./interfaceCard";

function CardsPosts() {
    const [userImages, setUserImages] = useState<UserImage[]>([]);

  
    useEffect(() => {
        const fetchData = async () => {
          try {
            // obtener lista de usernames
            const querySnapshot = await getDocs(collection(firestore, "users"));
            const usernames = querySnapshot.docs.map(doc => doc.id); 
    
            // traer imágenes
            const allImages = await Promise.all(usernames.map(async (username) => {
              const userImagesRef = ref(storage, username);
              const imageList = await listAll(userImagesRef);
              const urls = await Promise.all(
                imageList.items.map((imageRef) => getDownloadURL(imageRef))
              );
              return urls.map(url => ({ url, username }));
            }));
    
            const flattenedImages = allImages.flat();
            setUserImages(flattenedImages);
          } catch (error) {
            console.error("Error fetching images: ", error);
          }
        };
  
      fetchData();
    }, []);
    return ( 
        <div>
        <h1>All Users' Images</h1>
        <div>
          {userImages.map((image, index) => (
            <div key={index}>
              <h3>{image.username}</h3>
              <img src={image.url} alt={`User ${image.username}`} style={{ width: "100px", height: "100px", margin: "5px" }} />
            </div>
          ))}
        </div>
      </div>
     );
}

export default CardsPosts;