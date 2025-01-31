import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Modal, Drawer } from "antd";
import swal from "sweetalert2";
import { AddVerse } from "./AddVerse";


export const EditHymn = () => {
  const { id, book } = useParams();
  const [form] = Form.useForm();

  const [verses, setVerses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verseData, setVerseData] = useState(null);
  const [deleteVerse, setDeleteVerse] = useState(null);

  const [editVerse, setEditVerse] = useState<{
    verse: string;
  }>({
    verse: "",
  });


 const [drawerVerses, setDrawerVerses] = useState(false);
 const showDrawerVerses = () => {
  setDrawerVerses(true);
};

const onCloseDrawerVerses = () => {
  setDrawerVerses(false);
};
  const [deleteModal, setDeleteModal] = useState(false);

  const showModalDelete = (deleteVerse) => {
    setDeleteVerse(deleteVerse);
    setDeleteModal(true);
  };
  const hideModal = () => {
    setDeleteModal(false);
    location.reload();
  };

  const showModal = (verseData) => {
    setVerseData(verseData);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Verse successfully edited!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel()
        window.location.reload();
      }
    });
  };
  
  const search = () => {
    fetch(`/api/getVerse?book=${book}&number=${id}`)
      .then(async (response) => {
        const data = await response.json();
        setVerses(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(search, [id, book]);

  function handleChange(event:any) {
    setEditVerse((prevDetails) => {
      return {
        ...prevDetails,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = () => {
    fetch("/api/editVerse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_id: verseData.song_id,
        book_id: verseData.book_id,
        verse_id: verseData.verse_id,
        verse: editVerse.verse,
      }),
    });
    sessionSuccess()
  };


  const handleDelete= () => {
    fetch("/api/deleteVerse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_id: deleteVerse.song_id,
        book_id: deleteVerse.book_id,
        verse_id: deleteVerse.verse_id,
      }),
    });
    hideModal()
  };

  
  if (verses.length == 0) {
    return <div>Record not found</div>;
  }

  return (
    <div className="mt-4 mx-auto w-2/3 md:w-1/2 border">
      <div className="mx-auto w-full md:w-2/3 ">
        <div>
          <h1 className="font-bold text-2xl mb-2">
            {verses[0].songtitle}{" "}
          </h1>

          <div>
            {verses?.map((verse, index) => {
              return (
                
                <div key={index} className="flex">
                {verse.verse_id  &&  
                (<>
                  <div>
                  <h2
                    className="font-semibold underline mt-4"
                    id={`V${verse.verse_id}`}
                  >
                    Verse {verse.verse_id}
                  </h2>
                  <p className="w-full md:w-4/5">{verse.verse}</p>
                </div>
                 
                <div className="flex w-full justify-around">
                    <button>
                      <CiEdit size={24} onClick={() => showModal(verse)} />
                    </button>
                    <button>
                      <MdDeleteForever onClick={() =>showModalDelete(verse)} size={24} color="red" />
                    </button>
                  </div>
                </>
                )}




                  {deleteVerse && (
                        <>
                        <Modal
                          title="Are yo sure you want to delete this verse"
                          open={deleteModal}
                          onOk={handleDelete}
                          onCancel={hideModal}
                          okText="Delete"
                          cancelText="Cancel"
                        >
                        </Modal>
                      </>
                  )}

             {/* {verseData && (
                    <Modal
                      title={`Edit hymn: ${verses[0].songtitle} - verse ${verseData.verse_id}`}
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={null}
                    > 
                    <EditVerse/>
                    </Modal>
             )} */}

                  {verseData && (
                    <Modal
                      title={`Edit hymn: ${verses[0].songtitle} - verse ${verseData.verse_id}`}
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <div>
                        <Form
                          form={form}
                          layout="vertical"
                          hideRequiredMark
                          onFinish={handleSubmit}
                          autoComplete="off"
                        >
                          <Form.Item
                            name="verse"
                            rules={[
                              {
                                required: true,
                                message: "Please enter verse",
                              },
                            ]}
                          >
                            <Input.TextArea
                              rows={5}
                              value={editVerse.verse}
                              placeholder={verseData.verse}
                              name="verse"
                              onChange={handleChange}
                            />
                          </Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form>
                      </div>
                    </Modal>
                  )} 
                </div>
              );
            })}
          </div>

          <div className="my-6">
          <Button type="primary" onClick={showDrawerVerses}>
          Add Verse
        </Button>
          </div>
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
        </div>
      </div>
    </div>
  );
};
