import { useEffect, useState, useContext } from "react";
import MyLightbox from "./MyLightbox";
import { GlobalContext } from "../App";

function RecentArtworks () {
  const [artworks, setArtworks] = useState([]);
  const global = useContext(GlobalContext);
  
  useEffect(() => {
    async function getArtworks_internal () {
      const allWorks = await global.artworks.find({isActive: true});
      const recentWorks = allWorks.filter(aw => aw.year > 2020)
    
      setArtworks(recentWorks);
    }
    if (global.artworks) {
      getArtworks_internal();
    }
  },[global]); 

  return (
    <div><MyLightbox artworks={artworks}/></div>
    
  )
    
}

export default RecentArtworks;