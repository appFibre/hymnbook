import "../index.css";
import {useLocation, Link } from 'react-router-dom';
import { useEffect, useState} from "react";
import { Select, Input, Table, Button } from "antd";
import { ViewHymn } from "./viewHymn";
import { EditHymn } from "./editHymn";

export const Index = () => {
  
  const location = useLocation();

  const [languages, setLanguages] = useState([]);
  const [books, setBooks] = useState([]);
  const [songs, setSongs] = useState([]);
  const [language, setLanguage] = useState<string> ('');
  const [book, setBook] = useState<string>('');
  const [songnumber, setNumber] = useState<string>('');
  const [songtitle, setTitle] = useState<string>('');


  const search = () => {
    if ((book && book.length > 0) || (language && language.length >0) || (songnumber && songnumber.length > 0)) {
    fetch(`/api/getSongs?book=${book}&language=${language}&number=${songnumber}&title=${songtitle}`)
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
  useEffect(search, [book, language,songnumber, songtitle]);

  
  useEffect(() => {
       fetch(`/api/getLanguages`)
      .then(response => response.json())
      .then(data => setLanguages(data));
  }, []);

  useEffect(() => {
    fetch(`/api/getBooks`)
   .then(response => response.json())
   .then(data => setBooks(data));
}, []);


  // const handleLanguageChange = (value: string) => {
  //   setLanguage(value);
  // };


  const handleLanguageChange = (value:string) => {
    if (value === 'All languages') {
      setLanguage(encodeURI('%'))
    } else {
      setLanguage(value)
    }
  };

  const handleBookChange = (value:string) => {
    if (value === 'All Books') {
      setBook(encodeURI('%'));
    } else {
      setBook(value);
    }
  };


  // const handleBookChange = (value: string) => {
  //   setBook(value);
  // };

  const handleNumberChange = (e) => {
    const value = e.target.value;

    if (!isNaN(value) && value.trim() !== '') {
      setNumber(value);
    } else {
      setTitle(value);
    }
  };

  
const lang = languages.map(l => l.language);
//  const options = lang.map((language) => ({ value: language, label: language}));
 const options = [
  { value: 'All languages', label: 'All languages' },
  ...lang.map((language) => ({ value: language, label: language }))
];

 
 const bookList= books.map(b => b.name);
 const bookOptions = [
  { value: 'All Books', label: 'All Books' },
  ...bookList.map((name) => ({ value: name, label: name}))
];

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
     <Link to={`/view/${record.category}/${record.number}`} reloadDocument>
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
          options={bookOptions}
        />

        <Select
          defaultValue="Language"
          title="language"
          style={{width: 180,}}
          onChange={handleLanguageChange}
          options={options}
        />

        <Input
          placeholder="search by hymn number or title"
          allowClear
          onChange={handleNumberChange}
          style={{
            width: 320,
          }}
        />
      </div>

    {(location.pathname === '/' || songs.length > 0) ?  <Table columns={columns} dataSource={songsList} /> : location.pathname.startsWith('/edit') ? <EditHymn /> : <ViewHymn /> }
     
    </div>
  );
};