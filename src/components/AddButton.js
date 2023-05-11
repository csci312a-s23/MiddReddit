/*
    AddButton.js

    Component used to send user to the "create" page. Includes styling
    to stay at the bottom right of main component. 
*/

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSession } from "next-auth/react";

const fabStyle = {
  position: "absolute",
  bottom: "5%",
  right: "5%",
};

export default function AddButton({
  handleClick,
  setOpenLeftSideBar,
  setOpenRightSideBar,
}) {
  const { data: session } = useSession();
  return (
    <Fab
      sx={fabStyle}
      color="primary"
      name="Create"
      onClick={() => {
        handleClick("create");
        setOpenLeftSideBar(false);
        setOpenRightSideBar(false);
      }}
      disabled={!session}
    >
      <AddIcon />
    </Fab>
  );
}
