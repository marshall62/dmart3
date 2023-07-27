
import ImageGallery from 'react-image-gallery';
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../App";
import "react-image-gallery/styles/css/image-gallery.css";
import './my-lightbox.css';
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function MyLightbox ({artworks}) {
  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  const global = useContext(GlobalContext);


  const [, setArtworkId] = useState(searchParams ? 
    searchParams.get('artwork')
    : '');

  const images = global.artistConfig ? 
    artworks.map(aw => {
    return {
      original: `${global.artistConfig.imageRootURI}/midsize/${aw.imagePath}`,
      fullscreen: `${global.artistConfig.imageRootURI}/${aw.imagePath}`,
      thumbnail: `${global.artistConfig.imageRootURI}/thumb/${aw.imagePath}`,
      description: `${aw.title}, ${aw.width} X ${aw.height}, ${aw.year}, ${aw.media}`
    }
    }) :
    [];


  useEffect(() => {
    const id = searchParams.get('artwork');
    console.log("search params chg", searchParams);
    console.log("id", id);
    setArtworkId(id);
  },[searchParams] )

  // When the large image changes (a slide) update the URL in the location box to have 
  // the index and the id of the artwork.  As of now, I don't use index.  The id can be used in a 
  // search lookup.  So if someone sends me a link of an artwork they like, I can grab the 
  // id from the url and put it in the search box to find the artwork.   
  const handleSlideChange = (index) => {
    console.log("sliding to",artworks[index]._id.toString());
    navigate('?artwork=' + artworks[index]._id.toString() + '&index=' + index)
  }

  return(
    <>
      <ImageGallery className="image-gallery-description" onSlide={handleSlideChange} showIndex={true} items={images}></ImageGallery>
    </>
  )

}

