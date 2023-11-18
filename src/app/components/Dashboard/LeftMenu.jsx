import React from "react";
import Link from "next/link";
import { Card, List } from "@material-tailwind/react";
import logo from "../../img/logo.png";

import {
  UserGroupIcon,
  IdentificationIcon,
  RectangleGroupIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";

import { HomeIcon } from "@heroicons/react/20/solid";

// import logo from "../../img/white-logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@material-tailwind/react";

export default function LeftMenu({ sidebar, closeSidebar }) {
  const [open, setOpen] = React.useState(0);

  const path = usePathname();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="xl:p-5 xl:fixed z-50  ">
      <Card
        className={` ${
          sidebar ? "left-[0rem] z-50  " : "-left-[100rem]"
        } xl:static xl:left-0  absolute      w-[18rem]  p-5 shadow-xl
         
         bg-[#2B383F]
        
        transition-all duration-300 shadow-white-900/5  leftManuHeignt  `}
      >
        <div className="mb-2 p-4   ">
          <div className="logo_box cursor-pointer flex justify-center items-center ">
            <Link href={`/`}>
              <h1 className="  text-white text-2xl font-bold">myIMMS</h1>
            </Link>
          </div>
          <div className="  w-full  mt-4  border-b border-[#ffffff1a] "></div>
        </div>

        <List className="  space-y-2">
          <Link href={`/`}>
            <Button
              variant="gradient"
              ripple={false}
              color="blue"
              className={`  ${
                path === "/" ? "" : "bg-none shadow-none  hover:shadow-none"
              } w-full       text-sm text-left flex items-center gap-3 `}
            >
              <HomeIcon className="h-5 selection:w-5 text-white" />
              Dashboard
            </Button>
          </Link>
          <Link href={`/clients`}>
            <Button
              variant="gradient"
              ripple={false}
              color="blue"
              className={`  ${
                path === "/clients"
                  ? ""
                  : "bg-none shadow-none  hover:shadow-none"
              } w-full       text-sm text-left flex items-center gap-3 `}
            >
              <UserGroupIcon className="h-5 w-5 text-white" />
              Clients
            </Button>
          </Link>
          <Link href={`/addClient`}>
            <Button
              variant="gradient"
              ripple={false}
              color="blue"
              className={`  ${
                path === "/addClient"
                  ? ""
                  : "bg-none shadow-none  hover:shadow-none"
              } w-full       text-sm text-left flex items-center gap-3 `}
            >
              <IdentificationIcon className="h-5 w-5 text-white" />
              Add Client
            </Button>
          </Link>
          <Link href={`/group`}>
            <Button
              variant="gradient"
              ripple={false}
              color="blue"
              className={`  ${
                path === "/group"
                  ? ""
                  : "bg-none shadow-none  hover:shadow-none"
              } w-full       text-sm text-left flex items-center gap-3 `}
            >
              <RectangleGroupIcon className="h-5 w-5 text-white" />
              Group
            </Button>
          </Link>
          <Link href={`/rekod`}>
            <Button
              variant="gradient"
              ripple={false}
              color="blue"
              className={`  ${
                path === "/rekod"
                  ? ""
                  : "bg-none shadow-none  hover:shadow-none"
              } w-full       text-sm text-left flex items-center gap-3 `}
            >
              <ServerStackIcon className="h-5 w-5 text-white" />
              Rekod
            </Button>
          </Link>
        </List>
      </Card>

      {sidebar && (
        <div
          onClick={() => closeSidebar()}
          className={`bg-[#00073433] blurCustom    absolute w-full h-full z-30`}
        ></div>
      )}
    </div>
  );
}
