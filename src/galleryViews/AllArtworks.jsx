import { useEffect, useState, useContext } from "react";
import MyLightbox from "./MyLightbox";
import { GlobalContext } from "../App";

function AllArtworks () {
  const [artworks, setArtworks] = useState([]);
  const global = useContext(GlobalContext);
  
  useEffect(() => {
    async function getArtworks_internal () {
      const allWorks = await global.artworks.find({isActive: true});
      setArtworks(allWorks);
    }
    if (global.artworks) {
      getArtworks_internal();
    }
  },[global]); 

  return (
    <div><MyLightbox artworks={artworks}/> </div>
    
  )
    
}

export default AllArtworks;