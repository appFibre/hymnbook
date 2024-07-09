import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { renderToPipeableStream } from "react-dom/server";
import axios from "axios";
import { Select, Input } from "antd";
const Hymn = () => {
  const [books, setBooks] = useState([]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info == null ? void 0 : info.source, value);
  useEffect(() => {
    axios.get(`http://localhost:5173/GetBooks`).then((response) => {
      const data = response.data;
      setBooks(data);
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  console.log(books);
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "inputs", children: [
      /* @__PURE__ */ jsx(
        Select,
        {
          defaultValue: "Hymn Book",
          style: {
            width: 180
          },
          onChange: handleChange,
          options: [
            {
              value: "RSB Main",
              label: "RSB Main"
            },
            {
              value: "Alexander Hymns",
              label: "Alexander Hymns"
            }
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Search,
        {
          placeholder: "search song by text",
          allowClear: true,
          enterButton: "Search",
          onSearch,
          style: {
            width: 320
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Search,
        {
          placeholder: "search song by number",
          allowClear: true,
          enterButton: "Search",
          onSearch,
          style: {
            width: 320
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          defaultValue: "Languages",
          style: {
            width: 180
          },
          onChange: handleChange,
          options: [
            {
              value: "English",
              label: "English"
            },
            {
              value: "Isizulu",
              label: "Isizulu"
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h1", { children: "Books" }),
    /* @__PURE__ */ jsx("div", { children: books == null ? void 0 : books.map((book, index2) => {
      return /* @__PURE__ */ jsx("div", { children: book.name });
    }) })
  ] });
};
function App() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Hymn, {}) });
}
function render(_url, _ssrManifest, options) {
  return renderToPipeableStream(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) }),
    options
  );
}
export {
  render
};
