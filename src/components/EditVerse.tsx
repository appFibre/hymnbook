import {useState } from "react";
import { Button, Form, Input } from "antd";
import swal from "sweetalert2";

export const EditVerse = (verseData, handleCancel) => {
  const [form] = Form.useForm();

  const [editVerse, setEditVerse] = useState<{
    verse: string;
  }>({
    verse: "",
  });

  function handleChange(event: any) {
    setEditVerse((prevDetails) => {
      return {
        ...prevDetails,
        [event.target.name]: event.target.value,
      };
    });
  }

  const sessionSuccess = () => {
    swal
      .fire({
        title: "Successful!",
        text: "Verse successfully edited!",
        icon: "success",
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleCancel();
          window.location.reload();
        }
      });
  };

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
    sessionSuccess();
  };

  return (
    <div>
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
    </div>
  );
};
