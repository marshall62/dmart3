/* eslint-disable react/prop-types */

import ImageGallery from 'react-image-gallery';
import { useContext, useEffect } from "react";
import { GlobalContext } from "../App";
import "react-image-gallery/styles/css/image-gallery.css";
import './my-lightbox.css';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import { rawImageURL } from '../utils/urls';

export default function MyLightbox ({artworks}) {
  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  const global = useContext(GlobalContext);
  const isMobile = useMediaQuery({ maxHeight: 600 });

  // TODO:  Currently the state var artworkIndex is off because
  // I want to use it to initialize the ImageGallery to load up the
  // at the artworkIndex instead of the default of 0.  This supports doing something
  // like reloading a page or coming to the app with a full URL including an index. The startIndex attribute
  // of ImageGallery doesn't do this as I expect.  I'd instead have to 
  // call the slideToIndex method which requires using refs according to the doc at
  // https://www.npmjs.com/package/react-image-gallery

  // const [, setArtworkId] = useState(searchParams ? 
  //   searchParams.get('artwork')
  //   : '');
  // const [artworkIndex, setArtworkIndex] = useState(searchParams.get('index') 
  //   || 0);

  const images = global.artistConfig ? 
    artworks.map(aw => {
      let z =
        {
          original: rawImageURL(global.artistConfig,aw,'midsize'),
          fullscreen: rawImageURL(global.artistConfig,aw),
          thumbnail: rawImageURL(global.artistConfig,aw,'thumb' ),
          description: `${aw.title}, ${aw.width} X ${aw.height}, ${aw.year}, ${aw.media}`
        }
      return z;

    }) :
    [];




  useEffect(() => {
    // const id = searchParams.get('artwork');
    // setArtworkIndex(searchParams.get('index'));
    // console.log('artworkIndex:',searchParams.get('index'))
    // setArtworkId(id);
  },[searchParams] )

  // When the large image changes (a slide) update the URL in the location box to have 
  // the index and the id of the artwork.  As of now, I don't use index.  The id can be used in a 
  // search lookup.  So if someone sends me a link of an artwork they like, I can grab the 
  // id from the url and put it in the search box to find the artwork.   
  const handleSlideChange = (index) => {
    navigate('?artwork=' + artworks[index]._id.toString() + '&index=' + index)
  }



  // const isPhoneInLandscapeMode = window.matchMedia("(orientation: landscape) and (max-width: 768px)").matches;
  return(
    <>
      <ImageGallery className="image-gallery-description" showThumbnails={!isMobile} onSlide={handleSlideChange} showIndex={true} items={images}></ImageGallery>
     
    </>
  )

}

