import { useState } from "react";
import { HeroProps } from "../App";
import _ from "lodash";

interface SideBarprops {
  listHeros: HeroProps[];
  onHouseCheck: { (tabCheckHouse: string[]): void };
}

const Sidebar = ({ listHeros, onHouseCheck }: SideBarprops) => {
  const [tabHouse, setTabHouse] = useState<string[]>([]);

  const uniqHouseTab = _.uniq(listHeros.map((hero) => hero.house?.name));

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tab: string[] = [];
    if (e.currentTarget.checked) {
      tab = [...tabHouse, e.currentTarget.value];
    } else {
      tab = [...tabHouse.filter((house) => house !== e.currentTarget.value)];
    }
    console.log(tab);
    setTabHouse(tab);
    onHouseCheck(tab);
  };

  return (
    <div style={{ flexShrink: "0", margin: "0 30px" }}>
      <p>Filtre House</p>
      {uniqHouseTab.map((house, i) => (
        <div key={i}>
          <input type="checkbox" onChange={handleCheck} value={house} />

          <label htmlFor="HeroHouse"> {house ? house : "No House"}</label>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
