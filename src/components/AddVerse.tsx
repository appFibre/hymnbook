import { useState } from "react";
import {Button,Col,Drawer,Form,Input,Row,Select, Space} from "antd";

export const AddVerse = () => {

  const [hymnDetails, setHymnDetails] = useState<{
    song_id: number;
    book_id: number;
    title: string;
    language: string;
    html: string;
    text: string;
  }>({
    song_id: 0,
    book_id: 0,
    title: "",
    language: "",
    html: "",
    text: "",
  });

  const handleChange = (name, value) => {
    setHymnDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    fetch('./api/addHymn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        song_id: hymnDetails.song_id,
        book_id: hymnDetails.book_id,
        title: hymnDetails.title,
        language: hymnDetails.language,
        html: hymnDetails.html,
        text: hymnDetails.text,
      })
    });
  }

  return (
    <div>AddVerse

          <Form layout="vertical" hideRequiredMark>
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
                  value={hymnDetails.song_id}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  type="number" 
                  placeholder="Please enter hymn number" />
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
                   value={hymnDetails.book_id}
                   id="book_id"
                   onChange={(value) => handleChange('book_id', value)}
                   >
                  </Select>
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
                  value={hymnDetails.title}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                  onChange={(value) => handleChange('language', value)}
                  >
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="html"
                  label="HTML"
                  rules={[
                    {
                      required: true,
                      message: "please enter html",
                    },
                  ]}
                >
                  <Input.TextArea rows={4} 
                  placeholder="please enter html" 
                  name="html"
                  value={hymnDetails.html}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="text"
                  label="Text"
                  rules={[
                    {
                      required: true,
                      message: "please enter hymn text",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter hymn text"
                    name="text"
                    value={hymnDetails.text}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
    </div>
  )
}

