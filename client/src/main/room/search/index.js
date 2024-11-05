import React, { useEffect, useState } from 'react';
import InputText from '../../../component/input-search';

const SearchRoom = () => {
    const [searchTerm, setSearchTerm] = useState('');
  useEffect(()=>{
  },[searchTerm])
  
    return (
      <div style={{ marginBottom: 30, marginTop: 35}}>
        <InputText
          label="ค้นหาห้องพัก"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  };

export default SearchRoom;
