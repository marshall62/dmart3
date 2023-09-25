import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./App";
import { rawImageURL } from "./utils/urls";

function Home () {

  const global = useContext(GlobalContext);
  const [artwork, setArtwork] = useState({})

  useEffect(() => {
    async function getArtwork () {
      const aw = await global.artworks.findOne({tags: "home"});
      setArtwork(aw);
    }
    if (global.artworks) {
      getArtwork();
    }
  }, [global]);

  let url = (global.artistConfig && global.artworks) ? 
    rawImageURL(global.artistConfig, artwork,'midsize') : 
  "";
  // `${global.artistConfig.imageRootURI}/midsize/${artwork.imagePath}?raw=true`
  // : "";

  return (
    <div>
      <img alt="home" src={url}/>
      <p>
        {artwork.title}, {artwork.media}, {artwork.width} x {artwork.height}, {artwork.year}
      </p>
    </div>
  );

}

export default Home;