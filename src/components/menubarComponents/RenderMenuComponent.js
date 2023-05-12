/*
  RenderMenuComponent.js

  Displays profile related menu of buttons depending on whether use is signed in.
  Allows for signing in and out.
*/

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function RenderMenuComponent({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfile = () => {
    handleMenuClose();
    router.push(`/users/${session.user.id}`);
  };

  return (
    <Menu
      //Anchors the component on page
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={"primary-search-account-menu"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!!session && <MenuItem onClick={handleProfile}>Profile</MenuItem>}
      {!!session && <MenuItem onClick={handleProfile}>My account</MenuItem>}
      {!!session && <MenuItem onClick={signOut}>Sign out</MenuItem>}
      {!session && (
        <MenuItem onClick={() => signIn("google")}>Sign in</MenuItem>
      )}
    </Menu>
  );
}
