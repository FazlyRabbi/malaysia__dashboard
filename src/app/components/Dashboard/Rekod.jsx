"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Chip,
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
import useStore from "../../store/store";
import useSWR, { mutate } from "swr";
import axios from "axios";
import useSweetAlert from "../lib/useSweetAlert";

const init = {
  content: "",
};

export default function Rekod() {
  const [rekod, setrekod] = useState(init);
  const { showAlert } = useSweetAlert();
  const { clients, setClients } = useStore();
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  // leoad search
  const [search, setSearch] = useState("");
  // set filtered members
  const [filtered, setFiltered] = useState([]);
  // Update the key whenever the 'date' state changes
  const { data, error, isLoading } = useSWR(
    `${process.env.API_URL}/api/client`,
    async () => {
      const response = await axios.get(`${process.env.API_URL}/api/rekod`);
      setClients(response?.data?.data);
    }
  );

  const handleRefetch = async () => {
    // Use the mutate function to refetch the data
    await mutate(`${process.env.API_URL}/api/rekod`);
  };

  useEffect(() => {
    const result = clients?.filter((data) =>
      data?.content?.toLowerCase().match(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, clients]);

  const handleDelete = async (id) => {
    showAlert({
      text: "Do you want to Delete?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      // denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (!result?.isConfirmed) return;

      const res = await axios.put(`${process.env.API_URL}/api/rekod`, {
        id: id,
      });

      if (!res.data.ok) return;

      handleRefetch();

      showAlert({
        icon: "success",
        title: "Rekod Successfully Deleted!",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };

  // table columns
  const columns = [
    {
      name: "sl",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Rekod Number",
      selector: (row) => row.content,
      sortable: true,
    },
    {
      name: "Rekod ID",
      selector: (row) => row.id,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex  space-x-2">
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/rekod`,
        rekod
      );
      if (response.data.ok) {
        showAlert({
          icon: "success",
          title: "Rekod Added Successfull!",
          showConfirmButton: false,
          timer: 1000,
        });
        setLoading(false);
        setrekod(init);
        handleRefetch();
        return;
      }
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Internal Server Error!",
        showConfirmButton: false,
        timer: 1000,
      });
      setLoading(false);
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="   flex   bg-[#F2F5F9]">
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
            <h1 className=" uppercase  text-[#223354] font-bold">Clients</h1>

            <div>
              <HiMenuAlt1
                className=" xl:hidden  text-[1.5rem] cursor-pointer"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
          </div>
          {/* ============================= */}

          <Card className="  py-4 shadow-md  pl-10  flex  flex-col justify-center items-center  ]">
            {/* form */}

            {/* ========================== */}
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Create Rekod
              </Typography>

              <form
                onSubmit={handleSubmit}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                <div className="mb-1 flex flex-col gap-6">
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Rekod
                    </Typography>
                    <Input
                      required
                      size="lg"
                      placeholder="name"
                      disabled={loading}
                      onChange={(e) =>
                        setrekod({ ...rekod, content: e.target.value })
                      }
                      value={rekod?.content}
                      className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none  after:content-none",
                      }}
                    />
                  </div>
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-10 flex justify-center"
                  fullWidth
                >
                  {loading ? <Spinner /> : " Create"}
                </Button>
              </form>
            </Card>
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
    </div>
  );
}
