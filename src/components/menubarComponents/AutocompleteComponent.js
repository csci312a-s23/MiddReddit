/*
  AutocompleteComponent.js

  The meat of the searchbar. Creates the dropdown capability and manages the inputs the 
  user is either typing or clicking.
*/

import { Autocomplete } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

//Styling for inputbase need inside autocomplete
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function AutocompleteComponent({
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
  categoriesList,
}) {
  return (
    <Autocomplete
      //State Controlled
      open={searchOpen}
      onOpen={() => setSearchOpen(true)}
      onClose={() => setSearchOpen(false)}
      //Styling to match menubar
      style={{ width: 600, maxHeight: 39 }}
      //Multiple allows for tags
      multiple
      limitTags={1}
      id="tag-outlined"
      //Dropdown items
      options={!value[0] ? categoriesList : []}
      getOptionLabel={(option) => option.name}
      //Text displayed when there is no match
      noOptionsText={
        !value[0]
          ? `Search for "${inputValue}"`
          : `Search for "${inputValue}" within the ${catName} Category`
      }
      //Chip value
      value={value}
      //What occurs when chip is added
      onChange={(e, newValue) => {
        setValue(newValue);
        if (newValue[0] !== undefined) {
          //On addition of chip we go to the category associated with chip
          goToCategory(newValue[0].name);
          setSearchBarQuery("");
        } else {
          //On removal of chip we no longer search within category
          handleClick("mainPage");
          setSearchBarQuery("");
        }
      }}
      //What user is typing
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      //Like textbox, it is the component that we actually type in
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <StyledInputBase
            {...params.InputProps}
            {...rest}
            style={{ paddingLeft: 50 }}
            placeholder="Search…"
            onKeyDown={(event) => {
              //Only updates scrollDisplay when "enter"/"return" key is pressed
              if (event.key === "Enter") {
                setSearchBarQuery(event.target.value);
                setSearchOpen(false);
              }
            }}
          />
        );
      }}
    />
  );
}
