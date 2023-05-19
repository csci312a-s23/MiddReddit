//code adapted from https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "./MenuItem";

export default function MultiLevel({ item, goToCategory, setSearchBarQuery }) {
  const { children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = (clickBool) => {
    if (clickBool) {
      goToCategory(item.name);
      setSearchBarQuery("");
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <React.Fragment>
      <ListItem button sx={{ pl: 1 }}>
        {open ? (
          <ExpandLessIcon
            onClick={() => handleClick(false)}
            sx={{ width: 25 }}
          />
        ) : (
          <ExpandMoreIcon
            onClick={() => handleClick(false)}
            sx={{ width: 25 }}
          />
        )}
        <ListItemText onClick={() => handleClick(true)} primary={item.name} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ pl: 1 }} component="div" disablePadding>
          {children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              goToCategory={goToCategory}
              setSearchBarQuery={setSearchBarQuery}
            />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
