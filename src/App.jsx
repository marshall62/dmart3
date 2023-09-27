import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect, useState, createContext, StrictMode } from 'react';
import * as Realm from "realm-web";
import AppRoutes2 from './AppRoutes2';
export let realmApp = null;
export let mongoDb = null;

export const GlobalContext = createContext();
const id = "dm-art-api-jznsb"; 
const credentials = Realm.Credentials.anonymous();

function App() {

  const [artworks,setArtworks] = useState(null);
  const [artistConfig,setArtistConfig] = useState(null);
  // const [user,setUser] = useState(null);
  

  useEffect (() => {
    const login =  async () => {    

      try {
        realmApp = new Realm.App({id,});
        await realmApp.logIn(credentials);
        mongoDb = realmApp.currentUser.mongoClient("mongodb-atlas");
        const aws = await mongoDb.db("artworks").collection("artwork");
        setArtworks(aws);
        const c = await mongoDb.db("artworks").collection("config").findOne({});
        setArtistConfig(c);

      } catch (err) {
        console.error("Failed to log in", err.message);     
      }
    }
    
    login();

  },[]);


  return (
    <>
      <GlobalContext.Provider value={{artworks, artistConfig}} >
        <StrictMode><AppRoutes2/></StrictMode>      
      </GlobalContext.Provider>
    </>
  );
}

export default App;
