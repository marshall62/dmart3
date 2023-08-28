import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import MyLightbox from "./MyLightbox";
import { GlobalContext } from "../App";

function GroupArtworks () {
  const [artworks, setArtworks] = useState([]);
  const global = useContext(GlobalContext);
  const { group } = useParams(); 
  
  useEffect(() => {
    async function getArtworks_internal () {
      const categoryWorks = await global.artworks.find({isActive: true, tags: group});
      setArtworks(categoryWorks);
    }
    if (global.artworks) {
      getArtworks_internal();
    }
  },[global,group]); 

  return (
    <div><MyLightbox artworks={artworks}/></div>
    
  )
    
}

export default GroupArtworks;