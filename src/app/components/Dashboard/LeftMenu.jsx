import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { logout } from "../../Actions/logout";

import { FaCommentDollar } from "react-icons/fa6";
import { IoLogoBuffer } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LeftMenu({ sidebar, closeSidebar }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="xl:p-5 xl:fixed z-50  ">
      <Card
        className={` ${
          sidebar ? "left-[0rem] z-50  " : "-left-[100rem]"
        } xl:static xl:left-0  absolute      w-[18rem]  p-5 shadow-xl
         
        transition-all duration-300 shadow-white-900/5  leftManuHeignt  `}
      >
        <div className="mb-2 p-4">
          <Link href={`/`}>
            <Typography variant="h5" color="blue-gray">
              Next TopUp
            </Typography>
          </Link>
        </div>

        <List>
          <Link href={`/orders`} className=" w-full block">
            <ListItem>
              <ListItemPrefix>
                <FaCommentDollar className="h-5 w-5" />
              </ListItemPrefix>
              Orders
            </ListItem>
          </Link>

          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>

                <Typography color="blue-gray" className="mr-auto font-normal">
                  Grameenphone
                </Typography>
              </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href={`/gp/dataPack`}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Data Packages
                  </ListItem>
                </Link>

                <Link href={"/gp/minutePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Minutes Packages
                  </ListItem>
                </Link>
                <Link href={"/gp/bundlePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Bundle Packages{" "}
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Banglalink
                </Typography>
              </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href={`/bl/dataPack`}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Data Packages
                  </ListItem>
                </Link>

                <Link href={"/bl/minutePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Minutes Packages
                  </ListItem>
                </Link>
                <Link href={"/bl/bundlePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Bundle Packages{" "}
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 3}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 3 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 3}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Teletalk
                </Typography>
              </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href={`/tale/dataPack`}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Data Packages
                  </ListItem>
                </Link>

                <Link href={"/bl/minutePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Minutes Packages
                  </ListItem>
                </Link>
                <Link href={"/bl/bundlePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Bundle Packages{" "}
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 4}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 4 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 4}>
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Robi
                </Typography>
              </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href={`/robi/dataPack`}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Data Packages
                  </ListItem>
                </Link>

                <Link href={"/robi/minutePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Minutes Packages
                  </ListItem>
                </Link>
                <Link href={"/robi/bundlePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Bundle Packages{" "}
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 5}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 5 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 5}>
              <AccordionHeader
                onClick={() => handleOpen(5)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Airtel
                </Typography>
              </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href={`/airtel/dataPack`}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Data Packages
                  </ListItem>
                </Link>

                <Link href={"/airtel/minutePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Minutes Packages
                  </ListItem>
                </Link>
                <Link href={"/airtel/bundlePack"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Bundle Packages{" "}
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          <Link href={`/banners`} className=" w-full block">
            <ListItem>
              <ListItemPrefix>
                <IoLogoBuffer className="h-5 w-5" />
              </ListItemPrefix>
              Logo/Banners
            </ListItem>
          </Link>

          <ListItem onClick={() => logout()}>
            <ListItemPrefix>
              <AiOutlineLogout className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
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
