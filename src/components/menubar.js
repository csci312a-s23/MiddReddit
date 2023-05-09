/*
  Menubar.js

  Displays the hamburger to pull up side bar, the title of the website, the search bar
  and an icon for users to either sign in or drop down profile options.



  Need to work on:
  - The chip stays in search bar until separate category is hit or the chip is exited
    out of using the x button 

  - Dropdown contains the right search values (talk with teammates)

  - Limit height of Dropdown 

  - onClick of dropdown we go to category 

  - If category is hit in leftsidebar create a chip is search bar 
  
*/

//MUI Imports
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
//import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { signIn, signOut, useSession } from "next-auth/react";
//import MailIcon from "@mui/icons-material/Mail";
//import NotificationsIcon from "@mui/icons-material/Notifications";
//import MoreIcon from "@mui/icons-material/MoreVert";
import Autocomplete from "@mui/material/Autocomplete";

//Other imports
import PropTypes from "prop-types";
//import { Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function MenuBar({
  handleClick,
  openLeftSideBar,
  setOpenLeftSideBar,
  setOpenRightSideBar,
  setSearchBarQuery,
  goToCategory,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    //handleMobileMenuClose();
  };

  const { data: session } = useSession();

  const router = useRouter();
  const { catName } = router.query;

  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!!session && <MenuItem onClick={handleMenuClose}>Profile</MenuItem>}
      {!!session && <MenuItem onClick={handleMenuClose}>My account</MenuItem>}
      {!!session && <MenuItem onClick={signOut}>Sign out</MenuItem>}
      {!session && (
        <MenuItem onClick={() => signIn("google")}>Sign in</MenuItem>
      )}
      {/* {signedIn === false && (
        <MenuItem onClick={() => handleClick("signIn")}>Sign In</MenuItem>
      )}
      {signedIn === false && (
        <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
      )} */}
    </Menu>
  );

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

  const defaultChip = categories.find((ind) => ind.name === catName);
  //let message;

  useEffect(() => {
    if (defaultChip === undefined) {
      setValue([]);
    } else {
      setValue([categories[defaultChip.id]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catName]);
  /*
  if (defaultChip === undefined) {
    message = "";
  } else {
    message = { name: `You are searching in ${catName}` };
  }
  */
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {/*<StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={(event) => {
                //console.log(event.key);
                //console.log(event.target.value);
                if (event.key === "Enter") {
                  setSearchBarQuery(event.target.value);
                }
              }}

            /> */}
            <Autocomplete
              open={searchOpen}
              onOpen={() => setSearchOpen(true)}
              onClose={() => setSearchOpen(false)}
              style={{ width: 600, maxHeight: 39 }}
              multiple
              limitTags={1}
              id="tag-outlined"
              options={!value[0] ? categories : []}
              getOptionLabel={(option) => option.name}
              noOptionsText={
                !value[0]
                  ? `Search for "${inputValue}"`
                  : `Search for "${inputValue}" within the ${catName} Category`
              }
              value={value}
              onChange={(e, newValue) => {
                console.log(newValue);
                setValue(newValue);
                if (newValue[0] !== undefined) {
                  console.log("here1");
                  goToCategory(newValue[0].name);
                  setSearchBarQuery("");
                } else {
                  handleClick("mainPage");
                  setSearchBarQuery("");
                }
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                //console.log(newInputValue);
                setInputValue(newInputValue);
              }}
              renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return (
                  <StyledInputBase
                    {...params.InputProps}
                    {...rest}
                    style={{ paddingLeft: 50 }}
                    placeholder="Search…"
                    onKeyDown={(event) => {
                      //console.log(event.key);
                      //console.log(event.target.value);
                      if (event.key === "Enter") {
                        setSearchBarQuery(event.target.value);
                        setSearchOpen(false);
                      }
                    }}
                  />
                );
              }}
            />
          </Search>

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
