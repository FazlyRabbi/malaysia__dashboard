"use client";
import { useEffect, useState } from "react";
import { Card, Button, Chip } from "@material-tailwind/react";
// import leftmenu
import LeftMenu from "./Dashboard/LeftMenu";
import useSweetAlert from "../../app/components/lib/useSweetAlert";
import { HiMenuAlt1 } from "react-icons/hi";
import axios from "axios";
import DataTable from "react-data-table-component";
import { type } from "os";

const heroBanners = {
  img1: "",
  img2: "",
  img3: "",
  img4: "",
};
const lowerBanners = {
  bimg1: "",
  bimg2: "",
  bimg3: "",
  bimg4: "",
};

const logos = {
  logo: "",
};

export default function Banners() {
  const [sidebar, setSidebar] = useState(false);
  const [hero, setHero] = useState(heroBanners);
  const [lower, setLower] = useState(lowerBanners);
  const [logo, setLogo] = useState(logos);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useSweetAlert();

  const [logoData, setLogoData] = useState([]);
  const [heroData, setHeroData] = useState([]);
  const [lowerData, setLowerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const logoRes = await axios.patch(`/api/cloudinary`, {
        type: "logo",
      });
      const heroRes = await axios.patch(`/api/cloudinary`, {
        type: "hero",
      });
      const lowerRes = await axios.patch(`/api/cloudinary`, {});

      if (logoRes.data.data && heroRes.data.data && lowerRes.data.data) {
        setLogoData(logoRes.data.data);
        setLowerData(lowerRes.data.data);
        setHeroData(heroRes.data.data);
      }
    };

    fetchData();
  }, []);

  const reFetchData = async () => {
    const logoRes = await axios.patch(`/api/cloudinary`, {
      type: "logo",
    });
    const heroRes = await axios.patch(`/api/cloudinary`, {
      type: "hero",
    });
    const lowerRes = await axios.patch(`/api/cloudinary`, {});

    if (logoRes.data.data && heroRes.data.data && lowerRes.data.data) {
      setLogoData(logoRes.data.data);
      setLowerData(lowerRes.data.data);
      setHeroData(heroRes.data.data);
    }
  };

  const handleDelete = async (data) => {
    try {
      if (data.logo) {
        showAlert({
          text: "Do you want to Delete?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Yes",
          // denyButtonText: `Don't save`,
        }).then(async (result) => {
          if (!result?.isConfirmed) return;

          const res = await axios.put(`/api/cloudinary`, {
            id: data.id,
            type: "logo",
          });
          if (!res.data.ok) return;
          reFetchData();
          showAlert({
            icon: "success",
            title: "Successfully Deleted!",
            showConfirmButton: false,
            timer: 1000,
          });
        });
      } else if (data.type === "hero") {
        showAlert({
          text: "Do you want to Delete?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Yes",
          // denyButtonText: `Don't save`,
        }).then(async (result) => {
          if (!result?.isConfirmed) return;

          const res = await axios.put(`/api/cloudinary`, {
            id: data.id,
            type: "hero",
          });
          if (!res.data.ok) return;
          reFetchData();

          // refetch();
          showAlert({
            icon: "success",
            title: "Successfully Deleted!",
            showConfirmButton: false,
            timer: 1000,
          });
        });
      } else {
        showAlert({
          text: "Do you want to Delete?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Yes",
          // denyButtonText: `Don't save`,
        }).then(async (result) => {
          if (!result?.isConfirmed) return;

          const res = await axios.put(`/api/cloudinary`, {
            id: data.id,
          });
          if (!res.data.ok) return;
          reFetchData();

          // refetch();
          showAlert({
            icon: "success",
            title: "Successfully Deleted!",
            showConfirmButton: false,
            timer: 1000,
          });
        });
      }
    } catch (err) {
      showAlert({
        icon: "error",
        title: "Internal Server Error!",
        showConfirmButton: false,
      });
    }
  };

  const handleLowerBanner = async () => {
    setIsLoading(true);

    try {
      if (lower.bimg1 === "") {
        showAlert({
          text: "Please Select at least 1 Lower Banner Image!",
          icon: "info",
        });
        setIsLoading(false);

        return;
      }
      const formData = new FormData();
      formData.append("bimg1", lower?.bimg1);
      formData.append("bimg2", lower?.bimg2);
      formData.append("bimg3", lower?.bimg3);
      formData.append("bimg4", lower?.bimg4);

      // Send FormData containing the images to the server
      const response = await axios.post(`/api/cloudinary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for Axios to recognize FormData
        },
      });

      if (response) {
        showAlert({
          text: "Banner Image Successfully Added!",
        });

        setIsLoading(false);
        // Show success alert
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      showAlert({
        text: "Internal Server Error!",
        icon: "error",
      });
    }
  };

  const handleHeroBanner = async () => {
    setIsLoading(true);

    try {
      if (hero.img1 === "") {
        showAlert({
          text: "Please Select at least 1 Lower Banner Image!",
          icon: "info",
        });
        setIsLoading(false);

        return;
      }
      const formData = new FormData();
      formData.append("img1", hero?.img1);
      formData.append("img2", hero?.img2);
      formData.append("img3", hero?.img3);
      formData.append("img4", hero?.img4);

      // Send FormData containing the images to the server
      const response = await axios.post(`/api/cloudinary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for Axios to recognize FormData
        },
      });

      if (response) {
        showAlert({
          text: "Hero Banner Image Successfully Added!",
        });

        setIsLoading(false);
        // Show success alert
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      showAlert({
        text: "Internal Server Error!",
        icon: "error",
      });
    }
  };

  const handleLogo = async () => {
    setIsLoading(true);

    try {
      if (logo.logo === "") {
        showAlert({
          text: "Please Select Your Logo!",
          icon: "info",
        });
        setIsLoading(false);

        return;
      }
      const formData = new FormData();
      formData.append("logo", logo?.logo);

      // Send FormData containing the images to the server
      const response = await axios.post(`/api/cloudinary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for Axios to recognize FormData
        },
      });

      if (response) {
        showAlert({
          text: "Logo Successfully Added!",
        });

        setIsLoading(false);
        // Show success alert
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      showAlert({
        text: "Internal Server Error!",
        icon: "error",
      });
    }
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  // table columns
  const columns = [
    {
      name: "sl",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <div>
          {" "}
          <img
            className=" h-10  rounded-md w-10"
            src={row?.url || row?.logo}
          />{" "}
        </div>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex  space-x-2">
          <Chip
            value="Delete"
            className=" cursor-pointer   bg-red-600 text-sm  uppercase text-center "
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#fff",
        fontSize: "14px",
        color: "#333",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        boxShadow: "none",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#374151",
        textTransform: "uppercase",
      },
    },
  };

  return (
    <div className=" flex  bg-[#F2F5F9]">
      {/* <lest menu /> */}
      <LeftMenu
        className=" max-w-[18rem] "
        sidebar={sidebar}
        closeSidebar={closeSidebar}
      />

      {/* total page */}
      <div className=" w-full grid    xl:ml-[20rem]   h-[100vh]  overflow-y-scroll grid-cols-1  2xl:grid-cols-3 gap-y-2 gap-2 lg:col-span-4 gap-x-5">
        <div className="   2xl:col-span-3  2xl:order-2 ">
          {/* header */}
          <div className="  bg-white flex items-center  px-10 justify-between  h-[5rem] cutstomShad  w-full  mb-8">
            <h1 className=" uppercase  text-[#223354] font-bold">
              Change Logo & Banner
            </h1>
            <div>
              <HiMenuAlt1
                className=" xl:hidden  text-[1.5rem] cursor-pointer"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
          </div>
          {/* ============================= */}

          <Card className=" h-fit    space-y-6  grid grid-cols-1   shadow-md   p-5 ">
            {/* ==============Logo============= */}
            <div className=" lg:pt-5   items-center   grid lg:grid-cols-2  space-y-2   ">
              <div className=" flex flex-col ">
                <label className="  text-black font-semibold">
                  Change Logo
                </label>
                <input
                  accept=".webp,.jpeg,.jpg,.png"
                  disabled={isLoading}
                  onChange={(e) =>
                    setLogo({ ...logo, logo: e.target.files[0] })
                  }
                  type="file"
                  className=" border-2 p-2 max-w-lg rounded-md"
                />

                <Button
                  onClick={() => handleLogo()}
                  disabled={isLoading}
                  size="sm"
                  className="  mt-5 min-w-[10rem] max-w-lg"
                >
                  Submit
                </Button>
              </div>

              <div>
                <h1 className="    text-black  font-semibold"> Logo</h1>
                <DataTable
                  columns={columns}
                  data={logoData}
                  selectableRowsHighlight
                  highlightOnHover
                  // selectableRows
                  // fixedHeader
                  subHeader
                  customStyles={customStyles}
                  subHeaderAlign="center"
                  pagination
                />
              </div>
            </div>

            {/* ============Hero Banners============= */}
            <div className="   grid    lg:grid-cols-2  gap-5">
              <div className=" flex  flex-col">
                <label className="  text-black font-semibold">
                  Change Hero Banners
                </label>

                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 1
                  </label>
                  <input
                    type="file"
                    disabled={isLoading}
                    onChange={(e) =>
                      setHero({ ...hero, img1: e.target.files[0] })
                    }
                    className="border-2 p-2 max-w-lg rounded-md"
                    accept=".webp,.jpeg,.jpg,.png"
                  />
                </div>

                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 2
                  </label>
                  <input
                    type="file"
                    disabled={isLoading}
                    onChange={(e) =>
                      setHero({ ...hero, img2: e.target.files[0] })
                    }
                    className="border-2 p-2 max-w-lg rounded-md"
                    accept=".webp,.jpeg,.jpg,.png"
                  />
                </div>
                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 3
                  </label>
                  <input
                    type="file"
                    disabled={isLoading}
                    onChange={(e) =>
                      setHero({ ...hero, img3: e.target.files[0] })
                    }
                    className="border-2 p-2 max-w-lg rounded-md"
                    accept=".webp,.jpeg,.jpg,.png"
                  />
                </div>
                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 4
                  </label>
                  <input
                    type="file"
                    disabled={isLoading}
                    onChange={(e) =>
                      setHero({ ...hero, img4: e.target.files[0] })
                    }
                    className="border-2 p-2 max-w-lg rounded-md"
                    accept=".webp,.jpeg,.jpg,.png"
                  />
                </div>

                <Button
                  onClick={() => handleHeroBanner()}
                  disabled={isLoading}
                  size="sm"
                  className="  mt-5  max-w-lg"
                >
                  Submit
                </Button>
              </div>

              <div>
                <h1 className="    text-black  font-semibold">
                  {" "}
                  Hero Banners Data
                </h1>
                <DataTable
                  columns={columns}
                  data={heroData}
                  selectableRowsHighlight
                  highlightOnHover
                  // selectableRows
                  // fixedHeader
                  subHeader
                  customStyles={customStyles}
                  subHeaderAlign="center"
                  pagination
                />
              </div>
            </div>

            {/* =============Lower Banners============= */}
            <div className="   grid  lg:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="  text-black font-semibold">
                  Change Lowers Banners
                </label>

                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 1
                  </label>
                  <input
                    accept=".webp,.jpeg,.jpg,.png"
                    required
                    type="file"
                    disabled={isLoading}
                    onChange={(e) =>
                      setLower({ ...lower, bimg1: e.target.files[0] })
                    }
                    className=" border-2 p-2  max-w-lg rounded-md"
                  />
                </div>

                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 2
                  </label>
                  <input
                    accept=".webp,.jpeg,.jpg,.png"
                    disabled={isLoading}
                    onChange={(e) =>
                      setLower({ ...lower, bimg2: e.target.files[0] })
                    }
                    type="file"
                    className=" border-2 p-2  max-w-lg rounded-md"
                  />
                </div>
                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 3
                  </label>
                  <input
                    accept=".webp,.jpeg,.jpg,.png"
                    disabled={isLoading}
                    onChange={(e) =>
                      setLower({ ...lower, bimg3: e.target.files[0] })
                    }
                    type="file"
                    className=" border-2 p-2  max-w-lg rounded-md"
                  />
                </div>
                <div className=" flex flex-col">
                  <label className="  text-sm    text-black  mb-2">
                    Photo 4
                  </label>
                  <input
                    accept=".webp,.jpeg,.jpg,.png"
                    disabled={isLoading}
                    onChange={(e) =>
                      setLower({ ...lower, bimg4: e.target.files[0] })
                    }
                    type="file"
                    className=" border-2 p-2  max-w-lg rounded-md"
                  />
                </div>

                <Button
                  onClick={() => handleLowerBanner()}
                  disabled={isLoading}
                  size="sm"
                  className="  mt-5  max-w-lg"
                >
                  Submit
                </Button>
              </div>

              <div>
                <h1 className="    text-black  font-semibold">
                  {" "}
                  Lower Banners Data
                </h1>
                <DataTable
                  columns={columns}
                  data={lowerData}
                  selectableRowsHighlight
                  highlightOnHover
                  // selectableRows
                  // fixedHeader
                  subHeader
                  customStyles={customStyles}
                  subHeaderAlign="center"
                  pagination
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
