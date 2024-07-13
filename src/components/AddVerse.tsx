import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import swal from "sweetalert2";

export const AddVerse = () => {
  const [form] = Form.useForm();

  const [books, setBooks] = useState([]);
  const [verseDetails, setVerseDetails] = useState<{
    song_id: number;
    book_id: number;
    verse_id: number;
    verse: string;
  }>({
    song_id: 0,
    book_id: 0,
    verse_id: 0,
    verse: "",
  });

  useEffect(() => {
    fetch(`/api/getBooks`)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const bookList= books.map(b => b.name);
  const optionsBooks = bookList.map((name, index) => ({value: index+1, label: name}));

  console.log(optionsBooks)

  const handleChange = (name: string, value: string | number) => {
    setVerseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Verse added successfully!",
      icon: "success",
    });
    form.resetFields();
  };

  const handleSubmit = () => {
    fetch("/api/addVerse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_id: verseDetails.song_id,
        book_id: verseDetails.book_id,
        verse_id: verseDetails.verse_id,
        verse: verseDetails.verse,
      }),
    });
    sessionSuccess();
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        onFinish={handleSubmit}
        autoComplete="off"
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
                value={verseDetails.song_id}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="number"
                placeholder="Please enter hymn number"
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
                placeholder="Please select a book"
                value={verseDetails.book_id}
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
              name="verse_id"
              label="Verse Number"
              rules={[
                {
                  required: true,
                  message: "Please enter verse number",
                },
              ]}
            >
              <Input
                name="verse_id"
                value={verseDetails.verse_id}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="number"
                placeholder="Enter verse number"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="verse"
              label="Verse"
              rules={[
                {
                  required: true,
                  message: "Please enter verse",
                },
              ]}
            >
              <Input.TextArea
                rows={5}
                placeholder="Enter your verse here...."
                name="verse"
                value={verseDetails.verse}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
