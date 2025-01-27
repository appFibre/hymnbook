import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Routes, Route } from "react-router-dom/dist/index.js";
import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Row, Col, Input, Select, Button, Table, Drawer, Modal, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
const EditDeleteHymn = (hymnData) => {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [hymnDetails, setHymnDetails] = useState(
    Object.values(hymnData).map((song, index) => ({
      song_id: song.number,
      book_id: song.category,
      title: song.title,
      language: song.language
    }))
  );
  const handleChange = (name, value) => {
    setHymnDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };
  useEffect(() => {
    fetch(`/api/getBooks`).then((response) => response.json()).then((data) => setBooks(data));
  }, []);
  useEffect(() => {
    fetch(`/api/getLanguages`).then((response) => response.json()).then((data) => setLanguages(data));
  }, []);
  const bookList = books.map((b) => b.name);
  const optionsBooks = bookList.map((name, index) => ({
    value: index + 1,
    label: name
  }));
  const lang = languages.map((l) => l.language);
  const options = lang.map((language) => ({
    value: language,
    label: language
  }));
  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Hymn successfully edited!",
      icon: "success"
    });
    form.resetFields();
    hymnDetails[0].song_id = 0;
  };
  const handleSubmit = () => {
    fetch("/api/editHymn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        song_id: hymnDetails[0].song_id,
        book_id: hymnDetails.book_id,
        title: hymnDetails.title,
        language: hymnDetails.language
      })
    });
    sessionSuccess();
  };
  console.log(hymnDetails);
  console.log(hymnDetails[0].song_id);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { id: "form-container", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      layout: "vertical",
      hideRequiredMark: true,
      onFinish: handleSubmit,
      autoComplete: "off",
      initialValues: { song_id: hymnDetails[0].song_id, title: hymnDetails[0].title, language: hymnDetails[0].language, book_id: hymnDetails[0].book_id },
      children: [
        /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "song_id",
              label: "Hymn Number",
              rules: [
                {
                  required: true,
                  message: "Please enter hymn number"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  name: "song_id",
                  type: "text",
                  value: hymnDetails[0].song_id,
                  readOnly: true
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "book_id",
              label: "Book",
              rules: [
                {
                  required: true,
                  message: "Please select a book"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  value: hymnDetails.book_id,
                  id: "book_id",
                  onChange: (value) => handleChange("book_id", value),
                  options: optionsBooks
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "title",
              label: "Title",
              rules: [
                {
                  required: true,
                  message: "Please enter hymn title"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Please enter hymn title",
                  name: "title",
                  value: hymnDetails[0].title,
                  onChange: (e) => handleChange(e.target.name, e.target.value)
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "language",
              label: "Language",
              rules: [
                {
                  required: true,
                  message: "Please choose the language"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  placeholder: "Please choose the  language",
                  value: hymnDetails.language,
                  id: "language",
                  onChange: (value) => handleChange("language", value),
                  options
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" })
      ]
    }
  ) }) }) });
};
const AddHymn = () => {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [hymnDetails, setHymnDetails] = useState({
    song_id: 0,
    book_id: 0,
    title: "",
    language: ""
  });
  const handleChange = (name, value) => {
    setHymnDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };
  useEffect(() => {
    fetch(`/api/getBooks`).then((response) => response.json()).then((data) => setBooks(data));
  }, []);
  useEffect(() => {
    fetch(`/api/getLanguages`).then((response) => response.json()).then((data) => setLanguages(data));
  }, []);
  const bookList = books.map((b) => b.name);
  const optionsBooks = bookList.map((name, index) => ({ value: index + 1, label: name }));
  const lang = languages.map((l) => l.language);
  const options = lang.map((language) => ({ value: language, label: language }));
  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Hymn added successfully!",
      icon: "success"
    });
    form.resetFields();
  };
  const handleSubmit = () => {
    fetch("./api/addHymn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        song_id: hymnDetails.song_id,
        book_id: hymnDetails.book_id,
        title: hymnDetails.title,
        language: hymnDetails.language
      })
    });
    sessionSuccess();
  };
  console.log(hymnDetails);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      layout: "vertical",
      hideRequiredMark: true,
      onFinish: handleSubmit,
      autoComplete: "off",
      children: [
        /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "song_id",
              label: "Hymn Number",
              rules: [
                {
                  required: true,
                  message: "Please enter hymn number"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  name: "song_id",
                  value: hymnDetails.song_id,
                  onChange: (e) => handleChange(e.target.name, e.target.value),
                  type: "number",
                  placeholder: "Please enter hymn number"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "book_id",
              label: "Book",
              rules: [
                {
                  required: true,
                  message: "Please select a book"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  placeholder: "Please select a book",
                  value: hymnDetails.book_id,
                  id: "book_id",
                  onChange: (value) => handleChange("book_id", value),
                  options: optionsBooks
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "title",
              label: "Title",
              rules: [
                {
                  required: true,
                  message: "Please enter hymn title"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Please enter hymn title",
                  name: "title",
                  value: hymnDetails.title,
                  onChange: (e) => handleChange(e.target.name, e.target.value)
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "language",
              label: "Language",
              rules: [
                {
                  required: true,
                  message: "Please choose the language"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  placeholder: "Please choose the  language",
                  value: hymnDetails.language,
                  id: "language",
                  onChange: (value) => handleChange("language", value),
                  options
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" })
      ]
    }
  ) });
};
const AddBook = () => {
  const [form] = Form.useForm();
  const [bookDetails, setBookDetails] = useState({
    book_id: 0,
    name: ""
  });
  const handleChange = (name, value) => {
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };
  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Book added successfully!",
      icon: "success"
    });
    form.resetFields();
  };
  const handleSubmit = () => {
    fetch("./api/addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        book_id: bookDetails.book_id,
        name: bookDetails.name
      })
    });
    sessionSuccess();
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      layout: "vertical",
      hideRequiredMark: true,
      onFinish: handleSubmit,
      autoComplete: "off",
      children: [
        /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 22, children: /* @__PURE__ */ jsx(
          Form.Item,
          {
            name: "book_id",
            label: "Book Number",
            rules: [
              {
                required: true,
                message: "Please enter book number"
              }
            ],
            children: /* @__PURE__ */ jsx(
              Input,
              {
                name: "book_id",
                value: bookDetails.book_id,
                onChange: (e) => handleChange(e.target.name, e.target.value),
                type: "number",
                placeholder: "Please enter book number"
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 22, children: /* @__PURE__ */ jsx(
          Form.Item,
          {
            name: "name",
            label: "Name",
            rules: [
              {
                required: true,
                message: "Please enter book name"
              }
            ],
            children: /* @__PURE__ */ jsx(
              Input,
              {
                name: "name",
                value: bookDetails.name,
                onChange: (e) => handleChange(e.target.name, e.target.value),
                placeholder: "Enter book Name"
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" })
      ]
    }
  ) });
};
const Hymns = (songList) => {
  const [hymnData, setHymnData] = useState(null);
  const [open, setOpen] = useState(false);
  const [drawerBooks, setDrawerBooks] = useState(false);
  useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteHymn, setDeleteHymn] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const location2 = useLocation();
  const editMode = location2.pathname.startsWith("/edit");
  const showDrawerEdit = (hymnData2) => {
    setHymnData(hymnData2);
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
  const showModalDelete = (deleteHymn2) => {
    setDeleteHymn(deleteHymn2);
    setDeleteModal(true);
  };
  const hideModal = () => {
    setDeleteModal(false);
    location2.reload();
  };
  let columns = [
    {
      title: "Hymn Number",
      dataIndex: "number",
      key: "number",
      render: (text, record) => /* @__PURE__ */ jsx(Link, { to: `/view/${record.category}/${record.number}`, reloadDocument: true, children: text })
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => /* @__PURE__ */ jsx(Link, { to: `/view/${record.category}/${record.number}`, reloadDocument: true, children: text })
    },
    {
      title: "Book",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language"
    }
  ];
  if (editMode) {
    columns.push({
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
        /* @__PURE__ */ jsx(Tooltip, { title: "Edit", color: "blue", children: /* @__PURE__ */ jsx("a", { onClick: () => showDrawerEdit(record), children: /* @__PURE__ */ jsx(CiEdit, { size: 24, color: "blue" }) }) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Delete", color: "red", children: /* @__PURE__ */ jsx("a", { onClick: () => showModalDelete(record), children: /* @__PURE__ */ jsx(MdDeleteForever, { size: 24, color: "red" }) }) })
      ] }) })
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
        language: `${song.language}`
      });
    });
  });
  const handleDeleteHymn = () => {
    fetch("/api/deleteHymn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        song_id: deleteHymn.song_id,
        book_id: deleteHymn.book_id
      })
    });
    hideModal();
  };
  console.log(hymnData);
  return /* @__PURE__ */ jsxs("div", { children: [
    editMode && /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold underline m-4", children: "Edit Hymns" }),
    /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Table, { columns, dataSource: hymnlist }),
      editMode && /* @__PURE__ */ jsxs("div", { className: "w-1/4 flex justify-between mb-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "primary", onClick: showDrawerBooks, children: "Add Book" }),
        /* @__PURE__ */ jsx(Button, { type: "primary", onClick: showDrawer, children: "Add Hymn" })
      ] }),
      /* @__PURE__ */ jsx(
        Drawer,
        {
          title: "Add New Book",
          width: 520,
          onClose: onCloseDrawerBooks,
          open: drawerBooks,
          styles: {
            body: {
              paddingBottom: 80
            }
          },
          children: /* @__PURE__ */ jsx(AddBook, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Drawer,
        {
          title: "Add New Hymn",
          width: 720,
          onClose,
          open,
          styles: {
            body: {
              paddingBottom: 80
            }
          },
          children: /* @__PURE__ */ jsx(AddHymn, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Drawer,
        {
          title: `Edit hymn: ${hymnData == null ? void 0 : hymnData.title}`,
          width: 720,
          onClose: onCloseDrawerEdit,
          open: openEdit,
          styles: {
            body: {
              paddingBottom: 80
            }
          },
          children: /* @__PURE__ */ jsx(EditDeleteHymn, { hymnlist: hymnData })
        }
      ),
      /* @__PURE__ */ jsx(
        Modal,
        {
          title: "Are yo sure you want to delete this hymn",
          open: deleteModal,
          onOk: handleDeleteHymn,
          onCancel: hideModal,
          okText: "Delete",
          cancelText: "Cancel"
        }
      )
    ] })
  ] });
};
const ViewHymn = () => {
  const { id, book } = useParams();
  const [verses, setVerses] = useState([]);
  const location2 = useLocation();
  const search = () => {
    fetch(`/api/getVerse?book=${book}&number=${id}`).then(async (response) => {
      const data = await response.json();
      setVerses(data);
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  };
  useEffect(search, [id, book]);
  if (verses.length == 0) {
    return /* @__PURE__ */ jsx("div", { children: "Record not found" });
  }
  console.log(location2);
  return /* @__PURE__ */ jsx("div", { className: "mt-4 mx-auto w-2/3 md:w-1/2", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full md:w-2/3", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bold text-2xl mb-2", children: [
      verses[0].songtitle,
      " "
    ] }),
    /* @__PURE__ */ jsx("div", { children: verses == null ? void 0 : verses.map((v, index) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "font-semibold underline mt-4",
            id: `V${v.verse_id}`,
            children: [
              " ",
              "Verse ",
              v.verse_id
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "w-full md:w-2/3", children: v.verse })
      ] }, index);
    }) })
  ] }) });
};
const AddVerse = () => {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [verseDetails, setVerseDetails] = useState({
    song_id: 0,
    book_id: 0,
    verse_id: 0,
    verse: ""
  });
  useEffect(() => {
    fetch(`/api/getBooks`).then((response) => response.json()).then((data) => setBooks(data));
  }, []);
  const bookList = books.map((b) => b.name);
  const optionsBooks = bookList.map((name, index) => ({ value: index + 1, label: name }));
  console.log(optionsBooks);
  const handleChange = (name, value) => {
    setVerseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };
  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Verse added successfully!",
      icon: "success"
    });
    form.resetFields();
  };
  const handleSubmit = () => {
    fetch("/api/addVerse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        song_id: verseDetails.song_id,
        book_id: verseDetails.book_id,
        verse_id: verseDetails.verse_id,
        verse: verseDetails.verse
      })
    });
    sessionSuccess();
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      layout: "vertical",
      hideRequiredMark: true,
      onFinish: handleSubmit,
      autoComplete: "off",
      children: [
        /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "song_id",
              label: "Hymn Number",
              rules: [
                {
                  required: true,
                  message: "Please enter hymn number"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  name: "song_id",
                  value: verseDetails.song_id,
                  onChange: (e) => handleChange(e.target.name, e.target.value),
                  type: "number",
                  placeholder: "Please enter hymn number"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "book_id",
              label: "Book",
              rules: [
                {
                  required: true,
                  message: "Please select a book"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  placeholder: "Please select a book",
                  value: verseDetails.book_id,
                  id: "book_id",
                  onChange: (value) => handleChange("book_id", value),
                  options: optionsBooks
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
          Form.Item,
          {
            name: "verse_id",
            label: "Verse Number",
            rules: [
              {
                required: true,
                message: "Please enter verse number"
              }
            ],
            children: /* @__PURE__ */ jsx(
              Input,
              {
                name: "verse_id",
                value: verseDetails.verse_id,
                onChange: (e) => handleChange(e.target.name, e.target.value),
                type: "number",
                placeholder: "Enter verse number"
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 24, children: /* @__PURE__ */ jsx(
          Form.Item,
          {
            name: "verse",
            label: "Verse",
            rules: [
              {
                required: true,
                message: "Please enter verse"
              }
            ],
            children: /* @__PURE__ */ jsx(
              Input.TextArea,
              {
                rows: 5,
                placeholder: "Enter your verse here....",
                name: "verse",
                value: verseDetails.verse,
                onChange: (e) => handleChange(e.target.name, e.target.value)
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" })
      ]
    }
  ) });
};
const EditHymn = () => {
  const { id, book } = useParams();
  const [form] = Form.useForm();
  const [verses, setVerses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verseData, setVerseData] = useState(null);
  const [deleteVerse, setDeleteVerse] = useState(null);
  const [editVerse, setEditVerse] = useState({
    verse: ""
  });
  const [drawerVerses, setDrawerVerses] = useState(false);
  const showDrawerVerses = () => {
    setDrawerVerses(true);
  };
  const onCloseDrawerVerses = () => {
    setDrawerVerses(false);
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const showModalDelete = (deleteVerse2) => {
    setDeleteVerse(deleteVerse2);
    setDeleteModal(true);
  };
  const hideModal = () => {
    setDeleteModal(false);
    location.reload();
  };
  const showModal = (verseData2) => {
    setVerseData(verseData2);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Verse successfully edited!",
      icon: "success"
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel();
        window.location.reload();
      }
    });
  };
  const search = () => {
    fetch(`/api/getVerse?book=${book}&number=${id}`).then(async (response) => {
      const data = await response.json();
      setVerses(data);
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  };
  useEffect(search, [id, book]);
  function handleChange(event) {
    setEditVerse((prevDetails) => {
      return {
        ...prevDetails,
        [event.target.name]: event.target.value
      };
    });
  }
  const handleSubmit = () => {
    fetch("/api/editVerse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        song_id: verseData.song_id,
        book_id: verseData.book_id,
        verse_id: verseData.verse_id,
        verse: editVerse.verse
      })
    });
    sessionSuccess();
  };
  const handleDelete = () => {
    fetch("/api/deleteVerse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        song_id: deleteVerse.song_id,
        book_id: deleteVerse.book_id,
        verse_id: deleteVerse.verse_id
      })
    });
    hideModal();
  };
  if (verses.length == 0) {
    return /* @__PURE__ */ jsx("div", { children: "Record not found" });
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-4 mx-auto w-2/3 md:w-1/2 border", children: /* @__PURE__ */ jsx("div", { className: "mx-auto w-full md:w-2/3 ", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bold text-2xl mb-2", children: [
      verses[0].songtitle,
      " "
    ] }),
    /* @__PURE__ */ jsx("div", { children: verses == null ? void 0 : verses.map((verse, index) => {
      return /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        verse.verse_id && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(
              "h2",
              {
                className: "font-semibold underline mt-4",
                id: `V${verse.verse_id}`,
                children: [
                  "Verse ",
                  verse.verse_id
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "w-full md:w-4/5", children: verse.verse })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-around", children: [
            /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx(CiEdit, { size: 24, onClick: () => showModal(verse) }) }),
            /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx(MdDeleteForever, { onClick: () => showModalDelete(verse), size: 24, color: "red" }) })
          ] })
        ] }),
        deleteVerse && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          Modal,
          {
            title: "Are yo sure you want to delete this verse",
            open: deleteModal,
            onOk: handleDelete,
            onCancel: hideModal,
            okText: "Delete",
            cancelText: "Cancel"
          }
        ) }),
        verseData && /* @__PURE__ */ jsx(
          Modal,
          {
            title: `Edit hymn: ${verses[0].songtitle} - verse ${verseData.verse_id}`,
            open: isModalOpen,
            onCancel: handleCancel,
            footer: null,
            children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
              Form,
              {
                form,
                layout: "vertical",
                hideRequiredMark: true,
                onFinish: handleSubmit,
                autoComplete: "off",
                children: [
                  /* @__PURE__ */ jsx(
                    Form.Item,
                    {
                      name: "verse",
                      rules: [
                        {
                          required: true,
                          message: "Please enter verse"
                        }
                      ],
                      children: /* @__PURE__ */ jsx(
                        Input.TextArea,
                        {
                          rows: 5,
                          value: editVerse.verse,
                          placeholder: verseData.verse,
                          name: "verse",
                          onChange: handleChange
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" })
                ]
              }
            ) })
          }
        )
      ] }, index);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "my-6", children: /* @__PURE__ */ jsx(Button, { type: "primary", onClick: showDrawerVerses, children: "Add Verse" }) }),
    /* @__PURE__ */ jsx(
      Drawer,
      {
        title: "Add New Verse",
        width: 720,
        onClose: onCloseDrawerVerses,
        open: drawerVerses,
        styles: {
          body: {
            paddingBottom: 80
          }
        },
        children: /* @__PURE__ */ jsx(AddVerse, {})
      }
    )
  ] }) }) });
};
const Index = () => {
  const location2 = useLocation();
  const [languages, setLanguages] = useState([]);
  const [books, setBooks] = useState([]);
  const [songs, setSongs] = useState([]);
  const [language, setLanguage] = useState("");
  const [book, setBook] = useState("");
  const [songnumber, setNumber] = useState("");
  const [songtitle, setTitle] = useState("");
  const search = () => {
    if (book && book.length > 0 || language && language.length > 0 || songnumber && songnumber.length > 0) {
      fetch(`/api/getSongs?book=${book}&language=${language}&number=${songnumber}&title=${songtitle}`).then(async (response) => {
        const data = await response.json();
        setSongs(data);
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  };
  useEffect(search, [book, language, songnumber, songtitle]);
  useEffect(() => {
    fetch(`/api/getLanguages`).then((response) => response.json()).then((data) => setLanguages(data));
  }, []);
  useEffect(() => {
    fetch(`/api/getBooks`).then((response) => response.json()).then((data) => setBooks(data));
  }, []);
  const handleLanguageChange = (value) => {
    if (value === "All languages") {
      setLanguage(encodeURI("%"));
    } else {
      setLanguage(value);
    }
  };
  const handleBookChange = (value) => {
    if (value === "All Books") {
      setBook(encodeURI("%"));
    } else {
      setBook(value);
    }
  };
  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.trim() !== "") {
      setNumber(value);
    } else {
      setTitle(value);
    }
  };
  const lang = languages.map((l) => l.language);
  const options = [
    { value: "All languages", label: "All languages" },
    ...lang.map((language2) => ({ value: language2, label: language2 }))
  ];
  const bookList = books.map((b) => b.name);
  const bookOptions = [
    { value: "All Books", label: "All Books" },
    ...bookList.map((name) => ({ value: name, label: name }))
  ];
  const songList = [];
  {
    songs == null ? void 0 : songs.map((song, index) => {
      songList.push({
        key: index,
        title: `${song.title}`,
        number: `${song.song_id}`,
        category: `${song.book_id == 1 ? "KSB" : "Alexander Hymns"}`,
        language: `${song.language}`
      });
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: " w-full  h-1/2 mt-2 mx-4 ", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-[90%] flex m-4 justify-between", children: [
      /* @__PURE__ */ jsx(
        Select,
        {
          defaultValue: "Hymn Book",
          className: "w-1/3 md:w-1/4",
          onChange: handleBookChange,
          options: bookOptions
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          defaultValue: "Language",
          title: "language",
          className: "w-1/3 md:w-1/4",
          onChange: handleLanguageChange,
          options
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "search hymn by number or title",
          allowClear: true,
          onChange: handleNumberChange,
          className: "w-1/3 md:w-1/4"
        }
      )
    ] }),
    location2.pathname === "/" || songs.length > 0 ? /* @__PURE__ */ jsx(Hymns, { songList }) : location2.pathname.startsWith("/edit") ? /* @__PURE__ */ jsx(EditHymn, {}) : /* @__PURE__ */ jsx(ViewHymn, {})
  ] });
};
const routes = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/edit", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/addVerse", element: /* @__PURE__ */ jsx(AddVerse, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/view/:book/:id", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/edit/:book/:id", element: /* @__PURE__ */ jsx(Index, {}) })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsx(routes, {});
};
const render = ({ path }) => {
  return ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: path, children: /* @__PURE__ */ jsx(App, {}) })
  );
};
export {
  render
};
