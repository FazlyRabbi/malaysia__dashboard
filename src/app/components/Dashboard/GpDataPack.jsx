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
  oparetor: "",
  pack: "",
  discount: "",
  todayPrice: "",
  officalPrice: "",
  validity: "",
};

export default function GpDataPack() {
  const [data, setData] = useState(init);

  const [showAddDataPack, setShowAddDataPack] = useState(false);

  const [dataPacks, setDataPacks] = useState(null);

  const [sowClient, setSowClient] = useState(false);

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

  const [groups, setGroups] = useState([]);
  const [rekods, setRekods] = useState([]);


  useEffect(() => {
    const fetchDataPack = async () => {
      try {
        const response = await axios.get('/api/datapack');

         console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataPack();
  }, []);


  // const downloadCsv = () => {
  //   // Create a blob from the response data
  //   const blob = new Blob([JSON.stringify(rekods)], {
  //     type: "application/json",
  //   });

  //   // Create a link element
  //   const link = document.createElement("a");
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = "rekods.json";

  //   // Append the link to the document and click it programmatically
  //   document.body.appendChild(link);
  //   link.click();

  //   // Clean up
  //   document.body.removeChild(link);
  // };



  // useEffect(() => {

    
  //   const result = dataPack?.filter((data) =>
  //     data?.oparetor?.toLowerCase().match(search.toLowerCase())
  //   );
  //   setFiltered(result);
  // }, [search, dataPack]);

  const handleDelete = async (id) => {
    showAlert({
      text: "Do you want to Delete?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      // denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (!result?.isConfirmed) return;

      const res = await axios.put(`/api/client`, {
        id: id,
      });
      if (!res.data.ok) return;
      handleRefetch();
      // refetch();
      showAlert({
        icon: "success",
        title: "Client Successfully Deleted!",
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
    const { group, record, ...newObject } = edit;
    try {
      const response = await axios.patch(`/api/client`, newObject);

      if (response.data.ok) {
        setTimeout(() => {
          // Show the SweetAlert after the delay
          showAlert({
            icon: "success",
            title: "Client Edit Successfull!",
            showConfirmButton: false,
            timer: 1000,
          });
        }, 1500);

        setLoading(false);
        setEditState(false);
        setEdit(null);
        handleRefetch();
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
      const response = await axios.post(`/api/datapack`, data);

      if (response.data.ok) {
        setTimeout(() => {
          // Show the SweetAlert after the delay
          showAlert({
            icon: "success",
            title: "DataPack Successfuly Added!",
            showConfirmButton: false,
            timer: 1000,
          });
        }, 1500);

        setLoading(false);
        setData(init);
        setDataPack(false);
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
      name: "Tarikh Permohonan",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Nombor Permohonan",
      selector: (row) => row.visa,
      sortable: true,
    },
    {
      name: "Nama Pemohon",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Warganegara",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "No Dokumen	",
      selector: (row) => row.passport,
      sortable: true,
    },
    {
      name: "Status Permohonan",
      selector: (row) => row.status,
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
    setSowClient(true);
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
              Grameenphone Data Packs
            </h1>
            <div>
              <HiMenuAlt1
                className=" xl:hidden  text-[1.5rem] cursor-pointer"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
          </div>
          {/* ============================= */}

          <Card className="  py-4 shadow-md  pl-10   ]">
            {/* form */}
            <Button onClick={() => setDataPack(true)} color="purple">
              Add Data Pack
            </Button>
            ;{/* ========================== */}
            <DataTable
              columns={columns}
              data={filtered}
              selectableRowsHighlight
              highlightOnHover
              // selectableRows
              // fixedHeader
              subHeader
              subHeaderComponent={
                <div className="relative mb-6 mt-4  w-full shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-[#6B7280] dark:text-gray-400"
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
                  <input
                    id="simple-search"
                    className="  bg-[#F9FAFB] border  border-softGray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              }
              customStyles={customStyles}
              subHeaderAlign="center"
              pagination
            />
          </Card>
        </div>
      </div>

      {/* ==================Add================ */}
      <Dialog open={showAddDataPack}>
        <DialogHeader className="  flex justify-end">
          <TiDeleteOutline
            className=" text-[1.5rem]   cursor-pointer"
            onClick={() => setShowAddDataPack(false)}
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
                  disabled={loading}
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
      <Dialog open={sowClient}>
        <DialogHeader className="  flex justify-end">
          <TiDeleteOutline
            className=" text-[1.5rem]   cursor-pointer"
            onClick={() => setSowClient(false)}
          />
        </DialogHeader>
        <DialogBody className=" lg:w-full pb-10">
          <div
            // key={index}
            className="
                  
                   gap-y-10
                
                   p-3 py-4 rounded-sm
                  justify-items-center
                grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Tarikh Permohonan
              </Typography>
              <Input
                value={singleClintData?.date}
                disabled
                size="lg"
                placeholder="passport"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Nombor Permohonan
              </Typography>
              <Input
                value={singleClintData?.visa}
                disabled
                size="lg"
                placeholder="passport"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Nama Pemohon
              </Typography>
              <Input
                value={singleClintData?.fullName}
                disabled
                size="lg"
                placeholder="passport"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Warganegara
              </Typography>
              <Input
                value={singleClintData?.country}
                disabled
                size="lg"
                placeholder="passport"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                No Dokumen
              </Typography>
              <Input
                value={singleClintData?.passport}
                disabled
                size="lg"
                placeholder="passport"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Status Permohonan
              </Typography>
              <Input
                value={singleClintData?.status}
                disabled
                size="lg"
                placeholder="passport"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Group
              </Typography>

              <Input
                value={singleClintData?.group?.name}
                disabled
                size="lg"
                placeholder="group"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Rekod
              </Typography>
              <Input
                value={singleClintData?.record?.content}
                disabled
                size="lg"
                placeholder="rekod"
                className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
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
        <form onSubmit={handleMainEdit}>
          <DialogBody className=" lg:w-full pb-10">
            <div
              className="
                  
                   gap-10
                
                   p-3 py-4 rounded-sm
                  justify-items-center
                grid grid-cols-2  xl:grid-cols-3"
            >
              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Tarikh Permohonan
                </Typography>
                <Input
                  required
                  disabled={loading}
                  onChange={(e) => setEdit({ ...edit, date: e.target.value })}
                  value={edit?.date}
                  size="lg"
                  placeholder="date"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Nombor Permohonan
                </Typography>
                <Input
                  required
                  disabled={loading}
                  onChange={(e) => setEdit({ ...edit, visa: e.target.value })}
                  value={edit?.visa}
                  size="lg"
                  placeholder="visa"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Nama Pemohon
                </Typography>
                <Input
                  disabled={loading}
                  onChange={(e) =>
                    setEdit({ ...edit, fullName: e.target.value })
                  }
                  required
                  value={edit?.fullName}
                  size="lg"
                  placeholder="fullName"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Warganegara
                </Typography>
                <Input
                  disabled={loading}
                  onChange={(e) =>
                    setEdit({ ...edit, country: e.target.value })
                  }
                  required
                  value={edit?.country}
                  size="lg"
                  placeholder="country"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  No Dokumen
                </Typography>
                <Input
                  disabled={loading}
                  required
                  onChange={(e) =>
                    setEdit({ ...edit, passport: e.target.value })
                  }
                  value={edit?.passport}
                  size="lg"
                  placeholder="passport"
                  className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Status Permohonan
                </Typography>
                <select
                  disabled={loading}
                  onChange={(e) => setEdit({ ...edit, status: e.target.value })}
                  value={edit?.status}
                  className=" border w-full  mt-4 p-2 space-y-3 rounded-md border-gray-500"
                >
                  <option>LULUS</option>
                  <option>BARU</option>
                  <option>BAYER</option>
                  <option>BATAL</option>
                  <option>CETAK</option>
                  <option>CENCEL</option>
                </select>
              </div>
            </div>

            <div
              className="  gap-10
                
              
                p-3 py-4 rounded-sm
              
             grid grid-cols-1 md:grid-cols-2  xl:grid-cols-2 "
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Group
                </Typography>
                <select
                  disabled={loading}
                  onChange={(e) =>
                    setEdit({ ...edit, groupId: parseInt(e.target.value) })
                  }
                  className=" border w-full mt-4 p-2 space-y-3 rounded-md border-gray-500"
                >
                  {groups?.map((name, index) => (
                    <option value={name.id} key={index}>
                      {name.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Rekod
                </Typography>
                <select
                  disabled={loading}
                  onChange={(e) =>
                    setEdit({ ...edit, recordId: parseInt(e.target.value) })
                  }
                  className=" border w-full mt-4 p-2 space-y-3 rounded-md border-gray-500"
                >
                  {rekods?.map((name, index) => (
                    <option value={name.id} key={index}>
                      {name.content}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="mt-10 flex justify-center"
              fullWidth
            >
              {loading ? <Spinner /> : "Update"}
            </Button>
          </DialogBody>
        </form>
      </Dialog>
      {/* ==================Edit================= */}
    </div>
  );
}
