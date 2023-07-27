import { useEffect, useState, useContext } from "react";
import MyLightbox from "./MyLightbox";
import { GlobalContext } from "../App";

function AllArtworks () {
  const [artworks, setArtworks] = useState([]);
  const global = useContext(GlobalContext);
  
  useEffect(() => {
    async function getArtworks_internal () {
      const allWorks = await global.artworks.find({});
      console.log("Number of works", await allWorks.length)
      setArtworks(allWorks);
    }
    if (global.artworks) {
      console.log("Getting recent artworks", global)
      getArtworks_internal();
    }
  },[global]); 

  return (
    <div><MyLightbox artworks={artworks}/> </div>
    
  )
    
}

export default AllArtworks;