import React, { useEffect, useState } from "react";
import InputText from "../../../component/input-search";

const SearchRoom = ({ setSearchData = () => {} }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchData(searchValue);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, setSearchData]);

  return (
    <div style={{ marginBottom: 30, marginTop: 35 }}>
      <InputText
        label="ค้นหาห้องพัก"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default SearchRoom;
