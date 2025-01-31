import { useState} from "react";
import { Button, Drawer, Table, Modal,Tooltip } from "antd";
import { Link, useLocation } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { EditDeleteHymn } from "./editDeleteHymn";
import { AddHymn } from "./AddHymn";
import { AddBook } from "./AddBook";
import { MdDeleteForever } from "react-icons/md";


export const Hymns = (songList: any) => {
  const [hymnData, setHymnData] = useState(null);
  const [open, setOpen] = useState(false);
  const [drawerBooks, setDrawerBooks] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteHymn, setDeleteHymn] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const location = useLocation();
  const editMode = location.pathname.startsWith("/edit");


  const showDrawerEdit = (hymnData: any) => {
    setHymnData(hymnData);
    setOpenEdit(true);
  };
  const onCloseDrawerEdit = () => {
    setOpenEdit(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const showDrawerBooks = () => {
    setDrawerBooks(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseDrawerBooks = () => {
    setDrawerBooks(false);
  };

  const showModalDelete = (deleteHymn: any) => {
    setDeleteHymn(deleteHymn);
    setDeleteModal(true);
  };

  const hideModal = () => {
    setDeleteModal(false);
    location.reload();
  };

  let columns = [
    {
      title: "Hymn Number",
      dataIndex: "number",
      key: "number",
      render: (text: string, record: any) => (
        <Link to={`/view/${record.number}`} reloadDocument onClick={() => localStorage.setItem('songtitle', text)}>
          {text}
        </Link>
      ),
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record:any) => (
        <Link to={`/view/${record.number}`} reloadDocument onClick={() => localStorage.setItem('songtitle', text)}>
          {text}
        </Link>
      ),
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
          <div style={{ display: "flex", gap: "10px" }}>
            <Tooltip title="Edit" color='blue'>
            <a onClick={() => showDrawerEdit(record)}>
              {<CiEdit size={24} color="blue" />}
            </a>
              </Tooltip>

            <Tooltip title="Delete" color='red'>
            <a onClick={() => showModalDelete(record)}>
              {<MdDeleteForever size={24} color="red" />}
            </a>
              </Tooltip>
          </div>
        </>
      ),
    });
  }

  // const hymnlist = [];
  const hymnlist: { key: number; title: string; number: string; language: string }[] = [];
  Object.entries(songList).forEach(([key, array]: any) => {
    array.map((song: any, index: number) => {
      hymnlist.push({
        key: index,
        title: `${song.title}`,
        number: `${song.number}`,
        language: `${song.language}`,
      });
    });
  });


  if (hymnlist && hymnlist.length === 1) {
    const link = `/view/${hymnlist[0].number}`;
    localStorage.setItem('songtitle', `${hymnlist[0].title}`)
    window.location.href = link; 
    return null; 
  }
  

  //delete hymn
  const handleDeleteHymn = () => {
    fetch("/api/deleteHymn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_id: deleteHymn.song_id,
        book_id: deleteHymn.book_id
      }),
    });
    hideModal();
  };

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

          <Drawer
            title={`Edit hymn: ${hymnData?.title}`}
            width={720}
            onClose={onCloseDrawerEdit}
            open={openEdit}
            styles={{
              body: {
                paddingBottom: 80,
              },
            }}
          >
            <EditDeleteHymn hymnlist={hymnData}/>
          </Drawer>

            <Modal
              title="Are yo sure you want to delete this hymn"
              open={deleteModal}
              onOk={handleDeleteHymn}
              onCancel={hideModal}
              okText="Delete"
              cancelText="Cancel"
            ></Modal>
      </>
    </div>
  );
};
