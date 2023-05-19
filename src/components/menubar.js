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
  categoriesList,
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

  //Create the chip in autocomplete when we enter or exit a category
  const defaultChip = categoriesList.find((ind) => ind.name === catName);
  useEffect(() => {
    if (defaultChip === undefined) {
      setValue([]);
    } else {
      setValue([categoriesList[defaultChip.id]]);
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
            categoriesList={categoriesList}
          />

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
