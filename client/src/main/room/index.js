import React, { useEffect, useState } from 'react';
import DataTable from '../../component/table';
import Room from '../../api/room/Room';
import SearchRoom from './search';
import Badges from '../../component/badge';

export default function RoomPage () {

  const [roomDatas, setRoomDatas]= useState([]);
  const [roomCount, setRoomCount]= useState();

  useEffect(()=>{
    const fetchData = async () => {
      try {
          const data = await Room.get(); // Await the response
          setRoomDatas(data)
          setRoomCount(data.length)
      } catch (error) {
          console.error("Failed to fetch data", error);
      }
  };
  
  fetchData();
  },[])
// console.log('roomDatas.length',roomDatas.length)
  const headers = [
    { title: '#', key: 'roomId', fr: 1},
    { title: 'ประเภทห้อง', key: 'roomType', fr: 2 },
    { title: 'ราคาห้อง', key: 'roomPrice', fr: 2 },
    { title: 'จำนวนเตียง', key: 'bedQuantity', fr: 2 },
  ];

  return (
    <div style={{marginTop: '20px'}}>
      <Badges title='ห้องพัก' count={roomCount}/>
      <SearchRoom/>
      <DataTable headers={headers} data={roomDatas} />
    </div>
  );
};

