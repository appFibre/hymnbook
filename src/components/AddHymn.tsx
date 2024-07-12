import { useState, useEffect } from "react";
import {Button,Col,Form,Input,Row,Select} from "antd";
import swal from "sweetalert2";

export const AddHymn = () => {
    const [form] = Form.useForm();

    const [books, setBooks] = useState([]);
    const [languages, setLanguages] = useState([]);

    const [hymnDetails, setHymnDetails] = useState<{
        song_id: number;
        book_id: number;
        title: string;
        language: string;
      }>({
        song_id: 0,
        book_id: 0,
        title: "",
        language: ""
      });
    
      const handleChange = (name:any, value:any) => {
        setHymnDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };

      useEffect(() => {
        fetch(`/api/getBooks`)
       .then(response => response.json())
       .then(data => setBooks(data));
    }, []);

    useEffect(() => {
        fetch(`/api/getLanguages`)
       .then(response => response.json())
       .then(data => setLanguages(data));
   }, []);
    
    const bookList= books.map(b => b.name);
    const optionsBooks = bookList.map((name) => ({ value: name, label: name}));
    
    const lang = languages.map(l => l.language);
    const options = lang.map((language) => ({ value: language, label: language}));

const sessionSuccess = () => {
    swal.fire({
      title: "Successful!",
      text: "Hymn added successfully!",
      icon: "success"
    });
    form.resetFields();
    }


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
      })
    });
    sessionSuccess();
  }

  return (
    <div>
        <Form form={form} layout="vertical" hideRequiredMark
                   onFinish={handleSubmit}
                   autoComplete="off">
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
  )
}

