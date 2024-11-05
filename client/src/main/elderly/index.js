import React from 'react';
import DataTable from '../../component/table';
import SearchElderly from './search';

export default function ElderlyPage () {

  // const [roomDatas, setRoomDatas]= useState();

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try {
  //         const data = await Room.get(); // Await the response
  //         setRoomDatas(data)
  //     } catch (error) {
  //         console.error("Failed to fetch data", error);
  //     }
  // };
  
  // fetchData();
  // })

  const headers = [
    { title: 'ชื่อจริง', key: 'fname', fr: 2},
    { title: 'นามสกุล', key: 'lname', fr: 2 },
    { title: 'เบอร์โทร', key: 'tel', fr: 2 },
    { title: 'ที่อยู่', key: 'address', fr: 2 },
  ];
  
  const data = [
    { fname: 'AAA', lname: 'BBB' },
    { fname: 'CCC', lname: 'DDD' }
  ];

  return (
    <div>
      <h1 style={{marginLeft: 20}}>ผู้สูงอายุ</h1>
      <SearchElderly/>
      <DataTable headers={headers} data={data} />
    </div>
  );
};

