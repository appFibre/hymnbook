import { useState } from "react";
import { Button, Drawer} from "antd";
import { AddVerse } from "./AddVerse";
import { AddHymn } from "./AddHymn";
import { AddBook } from "./AddBook";

export const Edit = () => {
  const [open, setOpen] = useState(false);
  const [drawerVerses, setDrawerVerses] = useState(false);
  const [drawerBooks, setDrawerBooks] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const showDrawerBooks = () => {
    setDrawerBooks(true);
  };
  const onCloseDrawerBooks = () => {
    setDrawerBooks(false);
  };

  const showDrawerVerses = () => {
    setDrawerVerses(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseDrawerVerses = () => {
    setDrawerVerses(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline m-4">Edit</h1>
      <>
        <Button type="primary" onClick={showDrawerBooks}>
          Add Book
        </Button>

        <Button type="primary" onClick={showDrawer}>
          Add Hymn
        </Button>

        <Button type="primary" onClick={showDrawerVerses}>
          Add Verse
        </Button>

      
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
          <AddBook/>
        </Drawer>

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
      </>
    </div>
  );
};
