import { useState } from "react";
import { Button, Drawer, Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AddVerse } from "./AddVerse";
import { AddHymn } from "./AddHymn";
import { AddBook } from "./AddBook";
import { MdDeleteForever } from "react-icons/md";

export const Hymns = (songList) => {
  const [hymnData, setHymnData] = useState(null);
  const [open, setOpen] = useState(false);
  const [drawerVerses, setDrawerVerses] = useState(false);
  const [drawerBooks, setDrawerBooks] = useState(false);

  const location = useLocation();
  const editMode = location.pathname.startsWith("/edit");

  const showDrawer = (hymnData) => {
    setHymnData(hymnData)
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

  let columns = [
    {
      title: "Hymn Number",
      dataIndex: "number",
      key: "number",
      render: (text, record) => (
        <Link to={`/view/${record.category}/${record.number}`} reloadDocument>
          {text}
        </Link>
      ),
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


  if (editMode) {
    columns.push({
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => (
        <>
            <div style={{ display: 'flex', gap: '10px' }}>
      <a onClick={() => showDrawer(record)}>{<CiEdit size={24} color="blue" />}</a>
      <a>{<MdDeleteForever size={24} color="red" />}</a>
    </div>
      </>
      ),
    });
  }


  const hymnlist = [];
  Object.entries(songList).forEach(([key, array]) => {
    array.map((song, index) => {
      hymnlist.push({
        key: index,
        title: `${song.title}`,
        number: `${song.number}`,
        category: `${song.category}`,
        language: `${song.language}`,
      });
    });
  });

  return (
    <div>
     {editMode && (
       <h1 className="text-xl font-bold underline m-4">Edit Hymns</h1>
     )}
      <>
        <Table columns={columns} dataSource={hymnlist} />

        {editMode && (
          <div className="w-1/4 flex justify-between mb-2">
            <Button type="primary" onClick={showDrawerBooks}>
              Add Book
            </Button>

            <Button type="primary" onClick={showDrawer}>
              Add Hymn
            </Button>
          </div>
        )}

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
          <AddBook />
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


{editMode && (
        <Drawer
        title='Add New Hymn'
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <AddHymn hymnlist={hymnData}/>
      </Drawer>
)}


{/* {editMode && (
        <Drawer
        title={`Edit hymn: ${hymnData?.title}`}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <AddHymn hymnlist={hymnData}/>
      </Drawer>
)} */}

      </>
    </div>
  );
};
