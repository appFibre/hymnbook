import { useEffect, useState} from "react";
import { Button, Drawer, Table} from "antd";
import {Link } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { AddVerse } from "./AddVerse";
import { AddHymn } from "./AddHymn";
import { AddBook } from "./AddBook";

export const Edit = () => {
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const [drawerVerses, setDrawerVerses] = useState(false);
  const [drawerBooks, setDrawerBooks] = useState(false);

  const search = () => {
    fetch(`/api/getSongs`)
      .then(async (response) => {
        const data = await response.json();
        setSongs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(search, []);


  const songsList = [];
  {
    songs?.map((song, index) => {
      songsList.push({
        key: index,
        title: `${song.title}`,
        number: `${song.song_id}`,
        category: `${song.book_id == 1 ? "KSB" : "Alexander Hymns"}`,
        language: `${song.language}`,
      });
    });
  }

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

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: () => <a>{<CiEdit size={24} color="blue"/>}</a>,
    }
  ];




  const showDrawer = () => {
    setOpen(true);
  };

  const showDrawerBooks = () => {
    setDrawerBooks(true);
  };
  const onCloseDrawerBooks = () => {
    setDrawerBooks(false);
  };

  const showDrawerVerses = () => {
    setDrawerVerses(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseDrawerVerses = () => {
    setDrawerVerses(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold underline m-4">Edit Hymns</h1>
      <>
      <Table columns={columns} dataSource={songsList} />

        <Button type="primary" onClick={showDrawerBooks}>
          Add Book
        </Button>

        <Button type="primary" onClick={showDrawer}>
          Add Hymn
        </Button>

        <Button type="primary" onClick={showDrawer}>
          Edit Hymn
        </Button>



         {/* <Button type="primary" onClick={showDrawerVerses}>
          Add Verse
        </Button>  */}

      
        <Drawer
          title="Add New Book"
          width={520}
          onClose={onCloseDrawerBooks}
          open={drawerBooks}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
        >
          <AddBook/>
        </Drawer>

        <Drawer
          title="Add New Verse"
          width={720}
          onClose={onCloseDrawerVerses}
          open={drawerVerses}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
        >
          <AddVerse />
        </Drawer>

        <Drawer
          title="Add New Hymn"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
        >
          <AddHymn />
        </Drawer>
      </>
    </div>
  );
};
