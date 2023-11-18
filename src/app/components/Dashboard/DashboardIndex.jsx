"use client";
// imports components
import React from "react";
import 'text-encoding';
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import { HiMenuAlt1 } from "react-icons/hi";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import LeftMenu from "./LeftMenu";

import StatisticsCard from "../../widgets/cards/statistics-card";

import StatisticsChart from "../../widgets/charts/statistics-chart";

import { statisticsCardsData, statisticsChartsData } from "../../../app/data";

function DashboardIndex() {
  const [sidebar, setSidebar] = useState(false);

  const [selectedFile, setselectedFile] = useState(null);

  const handleUpload = async () => {
    // console.log(selectedFile);

    try {
      if (!selectedFile) return;

      const formData = new FormData();

      formData.append("file", selectedFile);

      const { data } = await axios.post("/api/repo", formData);

     
    } catch (err) {
      console.log(err);
    }
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <div className="   flex   bg-[#F2F5F9]">
      {/* <lest menu /> */}
      <LeftMenu
        className=" max-w-[18rem]"
        sidebar={sidebar}
        closeSidebar={closeSidebar}
      />

      {/* total page */}
      <div className="  xl:ml-[21rem]  w-full h-full  ">
        {/* header */}
        <div className="  bg-white flex items-center  px-10 justify-between  h-[5rem] cutstomShad  w-full  mb-8">
          <h1 className=" uppercase  text-[1.5rem]  text-[#223354] font-bold">
            Welcome To Admin Dashboard 👋
          </h1>
          <div>
            <HiMenuAlt1
              className=" xl:hidden  text-[1.5rem] cursor-pointer"
              onClick={() => setSidebar(!sidebar)}
            />
          </div>
        </div>

        <div className="mb-12 mt-5  px-[2rem] w-full   grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          ))}
        </div>

        <div className="mb-6 px-[2rem] grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardIndex;
