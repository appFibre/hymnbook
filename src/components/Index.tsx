import "../index.css";
import {useLocation} from 'react-router-dom';
import { useEffect, useState} from "react";
import { Select, Input } from "antd";
import { Hymns } from "./Hymns";
import { ViewHymn } from "./viewHymn";
import { EditHymn } from "./editHymn";

export const Index = () => {
  
  const location = useLocation();
  
  const [languages, setLanguages] = useState<{ language: string }[]>([]);
  const [songs, setSongs] = useState([]);
  const [language, setLanguage] = useState<string> ('');

  useEffect(() => {
    if(location.pathname === '/') 
      fetch('/api/getSongs')
        .then(response => response.json())
        .then(data => setSongs(data));
    }, []);
  
  useEffect(() => {
       fetch(`/api/getLanguages`)
      .then(response => response.json())
      .then(data => setLanguages(data));
  }, []);

  const handleLanguageChange = (value:string) => {
    if (value === 'All languages') {
      setLanguage(encodeURI('%'))
    } else {
      setLanguage(value)
    }
  };


  const handleNumberChange = (e: any) => {
    fetch(`/api/getSongs?language=${language}&search=${e.target.value}`)
      .then(async (response) => {
        let data = await response.json();
        if (data.length > 1 && data[0].song_id == e.target.value )
          data = data.slice(0, 1);
        setSongs(data);
      })
      .catch((error) => {
        console.log(error);
      });

  };


const lang = languages.map(l => l.language);
 const options = [
  { value: 'All languages', label: 'All languages' },
  ...lang.map((language) => ({ value: language, label: language }))
];

 let songList: any = [];
  {
    songs?.map((song: any, index) => {
      songList.push({
        key: index,
        title: `${song.title}`,
        number: `${song.song_id}`,
        language: `${song.language}`,
      });
    });
  }

  

  return (
    <div className=" w-full  h-1/2 mt-2 mx-4 ">
      <div className="w-[90%] flex m-4 justify-between">
        <Input
          placeholder="search hymn by number or title"
          allowClear
          onPressEnter={handleNumberChange}
          className="w-1/3 md:w-1/4"
        />

        <Select
          defaultValue="Language"
          title="language"
          className="w-1/3 md:w-1/4"
          onChange={handleLanguageChange}
          options={options}
        />

      </div>

    {(location.pathname === '/' || songs.length > 0) ? <Hymns songList={songList}/> : location.pathname.startsWith('/edit') ? <EditHymn /> : <ViewHymn />}

    </div>
  );
};