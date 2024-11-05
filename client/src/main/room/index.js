import React, { useEffect, useState } from 'react';
import DataTable from '../../component/table';
import Room from '../../api/room/Room';
import SearchRoom from './search';
import Badges from '../../component/badge';

export default function RoomPage () {

  const [roomDatas, setRoomDatas]= useState();

  useEffect(()=>{
    const fetchData = async () => {
      try {
          const data = await Room.get(); // Await the response
          setRoomDatas(data)
      } catch (error) {
          console.error("Failed to fetch data", error);
      }
  };
  
  fetchData();
  },[])

  const headers = [
    { title: '#', key: 'roomId', fr: 1},
    { title: 'ประเภทห้อง', key: 'roomType', fr: 2 },
    { title: 'ราคาห้อง', key: 'roomPrice', fr: 2 },
    { title: 'จำนวนเตียง', key: 'bedQuantity', fr: 2 },
  ];

  return (
    <div style={{marginTop: '20px'}}>
      <Badges title='ห้องพัก'count={roomDatas.length}/>
      <SearchRoom/>
      <DataTable headers={headers} data={roomDatas} />
    </div>
  );
};

