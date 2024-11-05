import React, { useEffect, useState } from 'react';
import InputText from '../../../component/input-search';

const SearchElderly = () => {
    const [searchTerm, setSearchTerm] = useState('');
  useEffect(()=>{
  },[searchTerm])
  
    return (
      <div style={{ marginBottom: 30, marginTop: 50}}>
        <InputText
          label="ค้นหาผู้สูงอายุ"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  };

export default SearchElderly;
