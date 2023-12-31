import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import styles from './Categories.module.css';
import { useNavigate } from "react-router-dom";
import { rawImageURL } from "../utils/urls";

export function Categories () {
  const global = useContext(GlobalContext);
  const [artworks, setArtworks] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    async function getArtwork () {
      const works = await global.artworks.find({tags: "exemplar"});
      setArtworks(works);
    }
    if (global.artworks) {
      getArtwork();
    }
  }, [global]);

  const handleClick = (href) => {
    navigate("/"+href);
  }

  // return(<div></div>)
  return(
    <div className={styles.wrapper}>
  {artworks.map((aw, i) => {
    let url = (global.artistConfig && global.artworks) ? rawImageURL(global.artistConfig, aw,'midsize')
      : "";
    let categoryHref = `group/${aw.categoryName.toLocaleLowerCase()}`;
      return (<div key={i} className={styles.gridItem}>
      <img alt="an artwork" src={url} onClick={() => handleClick(categoryHref)}/>
      <div className={styles.caption}>
        <a href={categoryHref}>{aw.categoryName.toLocaleLowerCase()}</a>
      </div>
      
      </div>);
  })}
</div>
  )
}