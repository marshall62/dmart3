import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./App";

function Home () {

  const global = useContext(GlobalContext);
  const [artwork, setArtwork] = useState({})

  useEffect(() => {
    async function getArtwork () {
      console.log("Global context is ", global);
      const aw = await global.artworks.findOne({tags: "home"});
      setArtwork(aw);
    }
    if (global.artworks) {
      console.log("Getting home artwork", global)
      getArtwork();
    }
  }, [global]);

  let url = (global.artistConfig && global.artworks) ? 
  `${global.artistConfig.imageRootURI}/midsize/${artwork.imagePath}`
  : "";

  return (
    <>
      <img alt="home" src={url}/>
      <p>
        {artwork.title}, {artwork.media}, {artwork.width} x {artwork.height}, {artwork.year}
      </p>
    </>
  );

}

export default Home;