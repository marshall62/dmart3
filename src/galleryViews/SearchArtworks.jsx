import { useEffect, useState, useContext } from "react";
import { useSearchParams } from 'react-router-dom';
import MyLightbox from "./MyLightbox";
import { GlobalContext } from "../App";
import { BSON } from "realm-web";


export default function SearchArtworks () {
  const [artworks, setArtworks] = useState([]);
  const global = useContext(GlobalContext);
  let [searchParams] = useSearchParams();

  useEffect(() => {
    let ignore=false;
    const searchTerm = searchParams.get('term');
    async function getArtworks_internal () {
      const [num, id] = convertToNumberAndId(searchTerm);
      const matchingWorks = await global.artworks
        .find({ $or: [{tags: {$regex: searchTerm, $options: 'i'}}, 
          {title: {$regex: searchTerm, $options: 'i'}}, 
          {media: {$regex: searchTerm, $options: 'i'}}, 
          {_id: id},
          {year: num}] });
      console.log("matching works",matchingWorks);
      if (!ignore) {
        setArtworks(matchingWorks);
      }
    }
    if (global.artworks && searchTerm) {
      getArtworks_internal();
    }
    return () => {
      ignore = true;
    };
  }, [global.artworks, searchParams])
  
  // useEffect(() => {
  //   let ignore = false;

  //   console.log("in useeffect with searchParams:", searchParams);
  //   let searchTerm = searchParams.get("term");
  //   console.log("in useeffect with searchTerm:", searchTerm);
  //   async function getArtworks_internal () {
  //     const [num, id] = convertToNumberAndId(searchTerm);
  //     const matchingWorks = await global.artworks
  //       .find({ $or: [{tags: {$regex: searchTerm, $options: 'i'}}, 
  //         {title: {$regex: searchTerm, $options: 'i'}}, 
  //         {media: {$regex: searchTerm, $options: 'i'}}, 
  //         {_id: id},
  //         {year: num}] });
  //     console.log("matching works",matchingWorks);
  //     if (!ignore) {
  //       setArtworks(matchingWorks);
  //     }
  //   }
  //   if (global.artworks) {
  //     console.log("Getting artworks with", searchParams)
  //     // getArtworks_internal();
  //   }
  //   return () => {
  //     ignore = true;
  //   };
  // },[global, searchParams]);  

  if (artworks.length > 0) 
    return (
      <MyLightbox artworks={artworks}/> 
    )
  else
      return (<div>No results found</div>)
    
}

function convertToNumberAndId (searchTerm) {
  let num = Number(searchTerm);
  let id;
  try {
    id = BSON.ObjectId(searchTerm)
  } catch (error) {
    id='';
  }
  return [num, id];
}
