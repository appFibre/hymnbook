import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import swal from "sweetalert2";

export const EditDeleteHymn = (hymnData) => {
  const [form] = Form.useForm();

  const [books, setBooks] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [hymnDetails, setHymnDetails] = useState(
    Object.values(hymnData).map((song, index) => ({
      song_id: song.number,
      book_id: song.category,
      title: song.title,
      language: song.language,
    }))
  );

  const handleChange = (name: any, value: any) => {
    setHymnDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch(`/api/getBooks`)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    fetch(`/api/getLanguages`)
      .then((response) => response.json())
      .then((data) => setLanguages(data));
  }, []);

  const bookList = books.map((b) => b.name);
  const optionsBooks = bookList.map((name, index) => ({
    value: index + 1,
    label: name,
  }));

  const lang = languages.map((l) => l.language);
  const options = lang.map((language) => ({
    value: language,
    label: language,
  }));

  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Hymn successfully edited!",
      icon: "success",
    });
    form.resetFields();
    hymnDetails[0].song_id = 0 
  };

  const handleSubmit = () => {
    fetch("/api/editHymn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_id: hymnDetails[0].song_id,
        book_id: hymnDetails.book_id,
        title: hymnDetails.title,
        language: hymnDetails.language,
      }),
    });
    sessionSuccess();
  };


console.log(hymnDetails)
console.log(hymnDetails[0].song_id,)

  return (
      <div>
        <div id="form-container">
          <div>
            <Form
              form={form}
              layout="vertical"
              hideRequiredMark
              onFinish={handleSubmit}
              autoComplete="off"
              initialValues={{ song_id: hymnDetails[0].song_id, title:hymnDetails[0].title, language:hymnDetails[0].language, book_id:hymnDetails[0].book_id }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="song_id"
                    label="Hymn Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter hymn number",
                      },
                    ]}
                  >
                    <Input
                      name="song_id"
                      type="text"
                      value={hymnDetails[0].song_id}
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="book_id"
                    label="Book"
                    rules={[
                      {
                        required: true,
                        message: "Please select a book",
                      },
                    ]}
                  >
                    <Select
                      //disabled={true}
                      value={hymnDetails.book_id}
                      id="book_id"
                      onChange={(value) => handleChange("book_id", value)}
                      options={optionsBooks}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter hymn title",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Please enter hymn title"
                      name="title"
                      value={hymnDetails[0].title}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="language"
                    label="Language"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the language",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Please choose the  language"
                      value={hymnDetails.language}
                      id="language"
                      onChange={(value) => handleChange("language", value)}
                      options={options}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </div>
      </div>
    </div>
  );
};
