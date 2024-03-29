//code adapted from https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function SingleLevel({ item, goToCategory, setSearchBarQuery }) {
  const handleClick = () => {
    goToCategory(item.name);
    setSearchBarQuery("");
  };
  return (
    <ListItem sx={{ pl: 4 }} button onClick={handleClick}>
      <ListItemText primary={item.name} />
    </ListItem>
  );
}
