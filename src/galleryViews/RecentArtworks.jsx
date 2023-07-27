import { useEffect, useState, useContext } from "react";
import MyLightbox from "./MyLightbox";
import { GlobalContext } from "../App";

function RecentArtworks () {
  const [artworks, setArtworks] = useState([]);
  const global = useContext(GlobalContext);
  
  useEffect(() => {
    async function getArtworks_internal () {
      const allWorks = await global.artworks.find({});
      const recentWorks = allWorks.filter(aw => aw.year > 2020)
      console.log("Recent works",recentWorks);
    
      console.log("Number of works", await allWorks.length)
      setArtworks(recentWorks);
    }
    if (global.artworks) {
      console.log("Getting recent artworks", global)
      getArtworks_internal();
    }
  },[global]); 

  return (
    <div><MyLightbox artworks={artworks}/></div>
    
  )
    
}

export default RecentArtworks;