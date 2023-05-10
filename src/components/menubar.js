/*
  Menubar.js

  Displays the menuIcon to create side bar, the title of the website, the search bar
  and an icon for users to either sign in or drop down profile options.

  Need to work on:
  - Dropdown contains the right search values (talk with teammates)
*/

//MUI Imports
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

//Other imports
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import SearchComponent from "./menubarComponents/SearchComponent";
import RenderMenuComponent from "./menubarComponents/RenderMenuComponent";

export default function MenuBar({
  handleClick,
  openLeftSideBar,
  setOpenLeftSideBar,
  setOpenRightSideBar,
  setSearchBarQuery,
  goToCategory,
}) {
  //Sets an anchor point on the page for buttons when IconButton is hit
  const [anchorEl, setAnchorEl] = React.useState(null);

  //Next three all pertain to ensuring AutocompleteComponent has controlled states
  //Keeps track of whether or not we have the dropdown of the search component open
  const [searchOpen, setSearchOpen] = React.useState(false);
  //Keeps track of the chip (category) in autocomplete
  const [value, setValue] = useState([]);
  //Keeps track of the text being typed in the search bar
  const [inputValue, setInputValue] = useState("");

  //Track whether iconmenu is open or closed, used for rendermenu
  const isMenuOpen = Boolean(anchorEl);

  //Used to show name once signed in
  const { data: session } = useSession();
  //Keeps track of whether we are in mainpage or maincategorycomponent
  //Used to set chip values in autocomplete
  const router = useRouter();
  const { catName } = router.query;

  //Functions passed to components to set anchor points on page for IconButton
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    //handleMobileMenuClose();
  };

  //Builds the Menu component to be shown when IconButton is hit
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <RenderMenuComponent
      anchorEl={anchorEl}
      isMenuOpen={isMenuOpen}
      handleMenuClose={handleMenuClose}
    />
  );

  //Temporary list for searchbar dropdown
  const categories = [
    { id: 0, name: "courses" },
    { id: 1, name: "confessionals" },
    { id: 2, name: "meals" },
    { id: 3, name: "sports" },
    { id: 4, name: "dorms" },
    { id: 5, name: "Events" },
    { id: 6, name: "cs" },
    { id: 7, name: "bio" },
    { id: 8, name: "theatre" },
    { id: 9, name: "cs312" },
    { id: 10, name: "ross" },
    { id: 11, name: "anthro" },
    { id: 12, name: "music" },
    { id: 13, name: "math" },
    { id: 14, name: "econ" },
    { id: 15, name: "russian" },
    { id: 16, name: "anth 103" },
    { id: 17, name: "anth 306" },
    { id: 18, name: "musc 101" },
    { id: 19, name: "musc 260" },
    { id: 20, name: "musc 500" },
    { id: 21, name: "math 118" },
    { id: 22, name: "math 323" },
  ];

  //Create the chip in autocomplete when we enter or exit a category
  const defaultChip = categories.find((ind) => ind.name === catName);
  useEffect(() => {
    if (defaultChip === undefined) {
      setValue([]);
    } else {
      setValue([categories[defaultChip.id]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catName]);

  return (
    <Box
      sx={{ flexGrow: 1, width: 1, position: "relative", maxHeight: "65px" }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => {
              if (openLeftSideBar === true) {
                setOpenLeftSideBar(false);
              } else {
                setOpenLeftSideBar(true);
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => {
              setSearchBarQuery("");
              handleClick("mainPage");
              setOpenRightSideBar(true);
            }}
          >
            MiddReddit
          </Typography>

          <SearchComponent
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

          {/*Change location of name*/}
          {!!session && <p>{session.user.name}</p>}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}

MenuBar.propTypes = {
  handleClick: PropTypes.func,
  openLeftSideBar: PropTypes.bool,
  setOpenLeftSideBar: PropTypes.func,
  setOpenRightSideBar: PropTypes.func,
};
