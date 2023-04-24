//code adapted from https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "./MenuItem";

export default function MultiLevel({ item, goToCategory }) {
  const {children} = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log(item);
    goToCategory(item.id);
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <ListItemText primary={item.name} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child) => (
            <MenuItem key={child.id} item={child} goToCategory={goToCategory} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
