/*
  SearchComponent.js

  This is the styled div that we use as the shell/base of the searchbar component
  Contains a magnifying icon
  Contains the component that creates the drop down and takes user search input
*/

import AutocompleteComponent from "./AutocompleteComponent";
import SearchIconComponent from "./SearchIconComponent";
import { styled, alpha } from "@mui/material/styles";

//Styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default function SearchComponent({
  searchOpen,
  setSearchOpen,
  value,
  setValue,
  inputValue,
  setInputValue,
  catName,
  goToCategory,
  setSearchBarQuery,
  handleClick,
  categories,
}) {
  //All the props are controlled in menubar to give a data hierarchy
  return (
    <Search>
      <SearchIconComponent />

      <AutocompleteComponent
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        value={value}
        setValue={setValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        catName={catName}
        goToCategory={goToCategory}
        setSearchBarQuery={setSearchBarQuery}
        handleClick={handleClick}
        categories={categories}
      />
    </Search>
  );
}
