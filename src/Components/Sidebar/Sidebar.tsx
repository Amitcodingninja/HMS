import { Avatar, Text } from "@mantine/core";
import {
  IconCalendarCheck,
  IconHeart,
  IconHeartbeat,
  IconLayoutGrid,
  IconStethoscope,
  IconVaccine,
} from "@tabler/icons-react";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <IconLayoutGrid size={20} stroke={1.5} />,
  },
  {
    name: "Docters",
    url: "/docters",
    icon: <IconStethoscope size={20} stroke={1.5} />,
  },
  {
    name: "Patients",
    url: "/patients",
    icon: <IconHeart size={20} stroke={1.5} />,
  },
  {
    name: "Appointments",
    url: "/appointments",
    icon: <IconCalendarCheck size={20} stroke={1.5} />,
  },
  {
    name: "Pharmacy",
    url: "/pharmacy",
    icon: <IconVaccine size={20} stroke={1.5} />,
  },
];

const Sidebar = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <div className="flex">
      <div className="w-64"></div>
      <div className="fixed w-64 h-screen overflow-y-auto bg-red-200 flex flex-col gap-7 items-center py-3">
        <div className="fixed z-[500] py-3 text-red-500 flex gap-1 items-center">
          <IconHeartbeat size={40} stroke={2.5} />
          <span className="font-heading font-semibold text-3xl">Pulse</span>
        </div>

        <div className="flex flex-col mt-20 gap-5">
          <div className="p-1 bg-white rounded-full shadow-lg">
            <Avatar
              variant="filled"
              src="avatar.png"
              alt="it's me"
              size="xl"
              radius={20}
            />
          </div>
          <div className="text-center">
            <span className="font-medium">{user.name || "Guest"}</span>
            <Text c="dimmed" size="xs">
              {user.role || "N/A"}
            </Text>
          </div>
        </div>

        <div>
          {links.map((links) => {
            return (
              <NavLink
                to={links.url}
                key={links.url}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-5 py-3 bg-cyan-100 text-cyan-800 font-medium rounded-full"
                    : "flex items-center gap-3 px-5 py-3 text-neutral-700  hover:text-cyan-800 font-medium rounded-full"
                }
              >
                {links.icon}
                <span>{links.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
