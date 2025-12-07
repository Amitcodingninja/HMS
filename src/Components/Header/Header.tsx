import { ActionIcon, Button, rem } from "@mantine/core";
import {
  IconBellRinging,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftCollapseFilled,
} from "@tabler/icons-react";
import ProfileMenu from "./ProfileMenu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeJwt } from "../../Slices/JwtSlice";
import { removeUser } from "../../Slices/UserSlice";

const Header = () => {
  const jwt = useSelector((state: any) => state.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(removeJwt());
    dispatch(removeUser());
    navigate("/login");
  };
  return (
    <div className="bg-white w-full h-16 flex justify-between px-5 items-center">
      <ActionIcon variant="transparent" size={"lg"} aria-label="Settings">
        <IconLayoutSidebarLeftCollapseFilled
          style={{ width: "90%", height: "90%" }}
          stroke={1.5}
        />
      </ActionIcon>
      <div className="flex items-center gap-5">
        {jwt ? (
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        {jwt && (
          <ActionIcon variant="transparent" size={"md"} aria-label="Settings">
            <IconBellRinging
              style={{ width: "90%", height: "90%" }}
              stroke={2}
            />
          </ActionIcon>
        )}

        {jwt && <ProfileMenu />}
      </div>
    </div>
  );
};

export default Header;
