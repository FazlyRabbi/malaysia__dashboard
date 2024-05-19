"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Chip,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Spinner,
  Button,
  Typography,
} from "@material-tailwind/react";
// import leftmenu
import LeftMenu from "./LeftMenu";
// import useSweetAlert from "@/components/lib/sweetalert2";
import DataTable from "react-data-table-component";
import { HiMenuAlt1 } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";

// import useStore from "../../store/store";
import useSWR, { mutate } from "swr";
import JsonToCsv from "react-json-to-csv";

import axios from "axios";
import useSweetAlert from "../lib/useSweetAlert";

let init = {
  oparetor: "Grameenphone",
  pack: "",
  discount: "",
  todayPrice: "",
  officalPrice: "",
  validity: "",
};

export default function GpMinutePack() {
  const [data, setData] = useState(init);
  const [showAddMinutePack, setShowAddMinutePack] = useState(false);
  const [minutePack, setMinutePack] = useState(null);
  const [sowMinutePack, setSowMinutePack] = useState(false);
  const { showAlert } = useSweetAlert();
  // // const { data, setData } = useStore(init);
  const [singleClintData, setSingleClientData] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [edit, setEdit] = useState(null);
  const [editState, setEditState] = useState(false);
  const [loading, setLoading] = useState(false);
  // // leoad search
  const [search, setSearch] = useState("");
  // // set filtered members
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchMinutePack = async () => {
      try {
        const response = await axios.get("/api/minuepack");
        setMinutePack(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMinutePack();
  }, []);

  const refetchMinutePack = async () => {
    try {
      const response = await axios.get("/api/minuepack");
      setMinutePack(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (minutePack) {
      const gpData = minutePack.filter(
        (data) => data?.oparetor === "Grameenphone"
      );

      const result = gpData?.filter((data) =>
        data?.oparetor?.toLowerCase().match(search.toLowerCase())
      );
      setFiltered(result);
      return;
    }
  }, [search, minutePack]);

  const handleDelete = async (id) => {
    showAlert({
      text: "Do you want to Delete?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      // denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (!result?.isConfirmed) return;

      const res = await axios.patch(`/api/minuepack`, {
        id: id,
      });
      if (!res.data.ok) return;
      refetchMinutePack();
      // refetch();
      showAlert({
        icon: "success",
        title: "Minute Pack Successfully Deleted!",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };

  const handleEdit = async (data) => {
    setEdit(data);
    setEditState(true);
  };

  const handleMainEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`/api/minuepack`, {
        payload: {
          ...edit,
        },
      });

      if (response.data.ok) {
        setTimeout(() => {
          // Show the SweetAlert after the delay
          showAlert({
            icon: "success",
            title: "Minute Pack Edit Successfull!",
            showConfirmButton: false,
            timer: 1000,
          });
        }, 1500);
        setEditState(false);
        setLoading(false);
        setEdit(null);
        refetchMinutePack();
        return;
      }

      alert("Form submitted successfully!");
    } catch (error) {
      setTimeout(() => {
        // Show the SweetAlert after the delay
        showAlert({
          icon: "error",
          title: "Internal Server Error!",
          showConfirmButton: false,
          timer: 1000,
        });
      }, 1500);

      setEditState(false);
      setEdit(null);
      setLoading(false);
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/api/minuepack`, data);

      if (response.data.ok) {
        setTimeout(() => {
          // Show the SweetAlert after the delay
          showAlert({
            icon: "success",
            title: "Minute Pack Successfuly Added!",
            showConfirmButton: false,
            timer: 1000,
          });
        }, 1500);
        setShowAddMinutePack(false);
        setLoading(false);
        setData(init);
        setMinutePack(false);
        // handleRefetch();
        return;
      }

      alert("Form submitted successfully!");
    } catch (error) {
      setTimeout(() => {
        // Show the SweetAlert after the delay
        showAlert({
          icon: "error",
          title: "Internal Server Error!",
          showConfirmButton: false,
          timer: 1000,
        });
      }, 1500);

      setEditState(false);
      setEdit(null);
      setLoading(false);
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  // table columns
  const columns = [
    {
      name: "sl",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Oparetor",
      selector: (row) => row.oparetor,
      sortable: true,
    },
    {
      name: "Package",
      selector: (row) => row.pack,
      sortable: true,
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: "Today Price",
      selector: (row) => row.todayPrice,
      sortable: true,
    },
    {
      name: "Offical Price",
      selector: (row) => row.officalPrice,
      sortable: true,
    },
    {
      name: "Validity",
      selector: (row) => row.validity,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex  space-x-2">
          <Chip
            value="View"
            className=" cursor-pointer      text-sm bg-green-500   uppercase text-center "
            onClick={() => handleViewClient(row)}
          />
          <Chip
            value="Edit"
            className=" cursor-pointer bg-amber-900  text-sm  uppercase text-center "
            onClick={() => handleEdit(row)}
          />

          <Chip
            value="Delete"
            className=" cursor-pointer   bg-red-600 text-sm  uppercase text-center "
            onClick={() => handleDelete(row?.id)}
          />
        </div>
      ),
    },
  ];

  const closeSidebar = () => {
    setSidebar(false);
  };

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

  const handleViewClient = (data) => {
    setSowMinutePack(true);
    setSingleClientData(data);
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
              Grameenphone Minute Packs
            </h1>
            <div>
              <HiMenuAlt1
                className=" xl:hidden text-[1.5rem] cursor-pointer"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
          </div>
          <Card className=" py-4 shadow-md pl-10">
            <Button onClick={() => setShowAddMinutePack(true)} color="purple">
              Add Minute Pack
            </Button>

            <DataTable
              columns={columns}
              data={filtered}
              selectableRowsHighlight
              highlightOnHover
              subHeader
              subHeaderComponent={
                <div className=" relative mb-6 mt-4 w-full shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-[#6B7280]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    id="simple-search"
                    className=" bg-[#F9FAFB] border border-softGray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              }
              customStyles={customStyles}
              pagination
            />
          </Card>
        </div>
      </div>

      {/* ==================Add================ */}
      <Dialog open={showAddMinutePack}>
        <DialogHeader className="  flex justify-end">
          <TiDeleteOutline
            className=" text-[1.5rem]   cursor-pointer"
            onClick={() => setShowAddMinutePack(false)}
          />
        </DialogHeader>
        <DialogBody className=" lg:w-full pb-10">
          <form onSubmit={handleSubmit}>
            <div
              // key={index}
              className="
                  
                   gap-y-10
                
                   p-3 py-4 rounded-sm
                 justify-center  gap-x-6  justify-items-center
                grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3"
            >
              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Oparetor
                </Typography>

                <Input
                  required
                  value={data?.oparetor}
                  onChange={(e) =>
                    setData({ ...data, oparetor: e.target.value })
                  }
                  size="lg"
                  disabled
                  placeholder="oparetor"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Package
                </Typography>

                <Input
                  required
                  value={data?.pack}
                  onChange={(e) => setData({ ...data, pack: e.target.value })}
                  size="lg"
                  disabled={loading}
                  placeholder="pack"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Discount
                </Typography>

                <Input
                  required
                  value={data?.discount}
                  onChange={(e) =>
                    setData({ ...data, discount: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Today&apos;s Price
                </Typography>

                <Input
                  required
                  value={data?.todayPrice}
                  onChange={(e) =>
                    setData({ ...data, todayPrice: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Offical Price
                </Typography>

                <Input
                  required
                  value={data?.officalPrice}
                  onChange={(e) =>
                    setData({ ...data, officalPrice: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Validity
                </Typography>

                <Input
                  required
                  value={data?.validity}
                  onChange={(e) =>
                    setData({ ...data, validity: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>

            <div className=" flex w-full justify-center items-center">
              <Button
                disabled={loading}
                type="submit"
                className="mt-10 bg-purple-600 flex w-[15rem] justify-center"
              >
                {loading ? <Spinner /> : "Add"}
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
      {/* ==================Add================ */}

      {/* ==================Show================ */}
      <Dialog open={sowMinutePack}>
        <DialogHeader className="  flex justify-end">
          <TiDeleteOutline
            className=" text-[1.5rem] cursor-pointer"
            onClick={() => setSowMinutePack(false)}
          />
        </DialogHeader>
        <DialogBody className=" lg:w-full pb-10">
          <form onSubmit={handleSubmit}>
            <div
              className="
                   gap-y-10
                   p-3 py-4 rounded-sm
                 justify-center  gap-x-6  justify-items-center
                grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3"
            >
              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Oparetor
                </Typography>
                <Input
                  value={singleClintData?.oparetor}
                  size="lg"
                  disabled
                  placeholder="oparetor"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Package
                </Typography>
                <Input
                  value={singleClintData?.pack}
                  size="lg"
                  disabled
                  placeholder="pack"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Discount
                </Typography>

                <Input
                  value={singleClintData?.discount}
                  size="lg"
                  disabled
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Today&apos;s Price
                </Typography>

                <Input
                  value={singleClintData?.todayPrice}
                  size="lg"
                  disabled
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Offical Price
                </Typography>

                <Input
                  value={singleClintData?.officalPrice}
                  size="lg"
                  disabled
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Validity
                </Typography>

                <Input
                  value={singleClintData?.validity}
                  size="lg"
                  disabled
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
          </form>
        </DialogBody>
      </Dialog>
      {/* ==================Show================ */}

      {/* ================Edit=================== */}
      <Dialog open={editState}>
        <DialogHeader className="  flex justify-end">
          <TiDeleteOutline
            className=" text-[1.5rem]   cursor-pointer"
            onClick={() => setEditState(false)}
          />
        </DialogHeader>
        <DialogBody className=" lg:w-full pb-10">
          <form onSubmit={handleMainEdit}>
            <div
              // key={index}
              className="
                   gap-y-10
                   p-3 py-4 rounded-sm
                 justify-center  gap-x-6  justify-items-center
                grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3"
            >
              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Oparetor
                </Typography>

                <Input
                  required
                  value={edit?.oparetor}
                  onChange={(e) =>
                    setEdit({ ...edit, oparetor: e.target.value })
                  }
                  size="lg"
                  disabled
                  placeholder="oparetor"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Package
                </Typography>

                <Input
                  required
                  value={edit?.pack}
                  onChange={(e) => setEdit({ ...edit, pack: e.target.value })}
                  size="lg"
                  disabled={loading}
                  placeholder="pack"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Discount
                </Typography>

                <Input
                  required
                  value={edit?.discount}
                  onChange={(e) =>
                    setEdit({ ...edit, discount: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="discount"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Today&apos;s Price
                </Typography>

                <Input
                  required
                  value={edit?.todayPrice}
                  onChange={(e) =>
                    setEdit({ ...edit, todayPrice: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="today's Price"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Offical Price
                </Typography>

                <Input
                  required
                  value={edit?.officalPrice}
                  onChange={(e) =>
                    setEdit({ ...edit, officalPrice: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="offical price"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className=" w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Validity
                </Typography>

                <Input
                  required
                  value={edit?.validity}
                  onChange={(e) =>
                    setEdit({ ...edit, validity: e.target.value })
                  }
                  size="lg"
                  disabled={loading}
                  placeholder="validity"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>

            <div className=" flex w-full justify-center items-center">
              <Button
                disabled={loading}
                type="submit"
                className="mt-10 bg-purple-600 flex w-[15rem] justify-center"
              >
                {loading ? <Spinner /> : "Update"}
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
      {/* ==================Edit================= */}
    </div>
  );
}
