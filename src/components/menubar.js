/*
  Menubar.js

  Displays the hamburger to pull up side bar, the title of the website, the search bar
  and an icon for users to either sign in or drop down profile options.



  Need to work on:
  - The chip stays in search bar until separate category is hit or the chip is exited
    out of using the x button
  - Dropdown contains the right search values
  - Limit height of Dropdown
  - onClick of dropdown we go to category (this will be tricky, deal with managing autocomplete)
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
import { Chip } from "@mui/material";

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
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { data: session } = useSession();

  const handleMenuClose = () => {
    setAnchorEl(null);
    //handleMobileMenuClose();
  };

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

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

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
              options={top100Films}
              getOptionLabel={(option) => option.title}
              //defaultValue={[top100Films[1]]}
              //filterSelectedOptions

              //Need to work to make the tags stay after search
              renderTags={(tagValue, getTagProps) => (
                <Chip
                  key={tagValue[0].title}
                  label={tagValue[0].title}
                  {...getTagProps(0)}
                />
              )}
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
