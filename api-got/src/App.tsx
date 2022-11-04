import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Sidebar from "./components/Sidebar";

export interface HeroProps {
  name: string;
  slug: string;
  house: {
    name: string;
    slug: string;
  };
  quotes: string[];
}

let listHerosParent: HeroProps[] = [];

function App() {
  const [tabHeros, setTabHeros] = useState<HeroProps[]>([...listHerosParent]);

  useEffect(() => {
    axios
      .get("https://api.gameofthronesquotes.xyz/v1/characters")
      .then((response) => {
        listHerosParent = response.data;
        setTabHeros(response.data);
        console.log(response.data);
      });
  }, []);

  const handleHouseCheck = (tabCheckHouse: string[]) => {
    let tabHeroFilter = [...listHerosParent];

    if (tabCheckHouse.length > 0) {
      tabHeroFilter = tabHeroFilter.filter(
        (hero) =>
          tabCheckHouse.includes(hero.house?.name) ||
          (tabCheckHouse.includes("") && hero.house === null)
      );
    }
    setTabHeros(tabHeroFilter);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar listHeros={listHerosParent} onHouseCheck={handleHouseCheck} />
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          borderLeft: "solid 1px black",
        }}
      >
        {tabHeros.map((perso) => (
          <div
            key={perso.name}
            style={{
              width: "22%",
              border: "3px solid blue",
              margin: "20px",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              {perso.name} de la maison {perso.house?.name}
            </div>
            <div>{perso.house?.slug}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
