import { useState } from "react";
import { Button, Col, Form, Input, Row} from "antd";
import swal from "sweetalert2";

export const AddBook = () => {

    const [form] = Form.useForm();

    const [bookDetails, setBookDetails] = useState<{
      book_id: number;
      name: string;
    }>({
      book_id: 0,
      name: "",
    });

    const handleChange = (name: string, value: string | number) => {
        setBookDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };
    
      const sessionSuccess = () => {
        swal.fire({
          title: "Successful!",
          text: "Book added successfully!",
          icon: "success",
        });
        form.resetFields();
      };
    
      const handleSubmit = () => {
        fetch("./api/addBook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            book_id: bookDetails.book_id,
            name: bookDetails.name,
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
          <Col span={22}>
            <Form.Item
              name="book_id"
              label="Book Number"
              rules={[
                {
                  required: true,
                  message: "Please enter book number",
                },
              ]}
            >
              <Input
                name="book_id"
                value={bookDetails.book_id}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="number"
                placeholder="Please enter book number"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={22}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter book name",
                },
              ]}
            >
              <Input
                name="name"
                value={bookDetails.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Enter book Name"
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
