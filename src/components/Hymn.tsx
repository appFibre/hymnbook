import "../index.css";
import {useLocation, Link } from 'react-router-dom';
import { useEffect, useState} from "react";
import { Select, Input, Table, Button } from "antd";
import { ViewHymn } from "./viewHymn";

export const Hymn = () => {
  
  const location = useLocation();

  const [songs, setSongs] = useState([]);
  const [language, setLanguage] = useState<string> ('');
  const [book, setBook] = useState<string>('');
  const [songnumber, setNumber] = useState<string>('');
  
  
  const search = () => {
    if ((book && book.length > 0) || language || songnumber) {
    fetch(`/api/getSongs?book=${book}&language=${language}&number=${songnumber}`)
      .then(async (response) => {
        const data = await response.json();
        setSongs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleBookChange = (value: string) => {
    setBook(value);
  };

  const handleNumberChange= (e) => {
    setNumber(e.target.value);
  };

  useEffect(search, [book, language,songnumber]);

    const languages = songs.map(song => song.language);
    const uniqueLanguages = [...new Set(languages)];
   const options = uniqueLanguages.map((language) => ({ value: language, label: language}));


    console.log(uniqueLanguages)
    
  const columns = [
    {
      title: "Hymn Number",
      dataIndex: "number",
      key: "number",
      render: (text:string) => <a href= {`./KSB Main/${text}`}>{text}</a>,
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
     <Link to={`/view/${record.number}/${record.category}`} reloadDocument>
       {text}
      </Link>
      ),
    },

    {
      title: "Book",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
  ];

  const songsList = [];
  {
    songs?.map((song, index) => {
      songsList.push({
        key: index,
        title: `${song.title}`,
        number: `${song.song_id}`,
        category: `${song.book_id == 1 ? "RSB Main" : "Alexander Hymns"}`,
        language: `${song.language}`,
      });
    });
  }

  return (
    <div className="container">
      <div className="inputs">
        <Select
          defaultValue="Hymn Book"
          style={{width: 180,}}
          onChange={handleBookChange}
          options={[
            {
              value: 'RSB Main',
              label: "RSB Main",
            },
            {
              value: "Alexander Hymns",
              label: "Alexander Hymns",
            },
          ]}
        />

        <Select
          defaultValue="Language"
          title="language"
          style={{width: 180,}}
          onChange={handleLanguageChange}
          options={options}
        />



        <Input
          placeholder="search hymn by number"
          allowClear
          onChange={handleNumberChange}
          style={{
            width: 320,
          }}
        />
      </div>

    {(location.pathname === '/' || songs.length > 0) ?  <Table columns={columns} dataSource={songsList} /> : <ViewHymn /> }
     
    </div>
  );
};