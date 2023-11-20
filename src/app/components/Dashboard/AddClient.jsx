"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
// import leftmenu
import LeftMenu from "./LeftMenu";
// import useSweetAlert from "@/components/lib/sweetalert2";
import { HiMenuAlt1 } from "react-icons/hi";
import axios from "axios";
import useSweetAlert from "../lib/useSweetAlert";

const init = {
  date: "",
  visa: "",
  fullName: "",
  country: "",
  passport: "",
  status: "",
  groupId: null,
  recordId: null,
};

export default function AddClient() {
  const { showAlert } = useSweetAlert();
  const [rekod, setRekod] = useState(null);
  const [group, setGroup] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [client, setClient] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRekod = async () => {
    const response = await axios.get(`/api/rekod`);
    setRekod(response.data.data);
  };

  const fetchGroup = async () => {
    const response = await axios.get(`/api/group`);
    setGroup(response.data.data);
  };

  useEffect(() => {
    fetchRekod();
    fetchGroup();
  }, []);

 

  const closeSidebar = () => {
    setSidebar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/client`,
        client
      );
      if (response.data.ok) {
        showAlert({
          icon: "success",
          title: "Client Added Successfull!",
          showConfirmButton: false,
          timer: 1000,
        });
        setIsLoading(false);
        setClient(init);
        return;
      }

     
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Internal Server Error!",
        showConfirmButton: false,
        timer: 1000,
      });
      setIsLoading(false);
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
            <h1 className=" uppercase  text-[#223354] font-bold">
              Add Clients
            </h1>

            <div>
              <HiMenuAlt1
                className=" xl:hidden  text-[1.5rem] cursor-pointer"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
          </div>
          {/* ============================= */}

          <form onSubmit={handleSubmit}>
            <Card className="  py-4 shadow-md  pl-10   ]">
              {/* form */}

              {/* ========================== */}
              <Card color="transparent" className=" pb-5   " shadow={false}>
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className=" border-b py-4 text-center uppercase mb-10 "
                >
                  Add Clients
                </Typography>

                <div className="mb-1  grid lg:grid-cols-2 gap-8 w-full ">
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Tarikh Permohonan
                    </Typography>
                    <Input
                      required
                      size="lg"
                      placeholder="date"
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({ ...client, date: e.target.value })
                      }
                      value={client?.date}
                      className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none  after:content-none",
                      }}
                    />
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Status Permohonan
                    </Typography>

                    <select
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({ ...client, status: e.target.value })
                      }
                      className=" border w-full mt-4 p-2 space-y-3 rounded-md border-gray-500"
                    >
                      <option>LULUS</option>
                      <option>BARU</option>
                     
                    </select>
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Group
                    </Typography>

                    <select
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({
                          ...client,
                          groupId: parseInt(e.target.value),
                        })
                      }
                      className=" border w-full mt-4 p-2 space-y-3 rounded-md border-gray-500"
                    >
                      {group &&
                        group?.map((data, index) => (
                          <option key={index} value={data?.id}>
                            {data?.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Rekod
                    </Typography>

                    <select
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({
                          ...client,
                          recordId: parseInt(e.target.value),
                        })
                      }
                      className=" border w-full mt-4
                     p-2 space-y-3 rounded-md border-gray-500"
                    >
                      {rekod &&
                        rekod?.map((data, index) => (
                          <option key={index} value={data?.id}>
                            {data?.content}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Nombor Permohonan
                    </Typography>
                    <Input
                      required
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({ ...client, visa: e.target.value })
                      }
                      value={client?.visa}
                      size="lg"
                      placeholder="visa number"
                      className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Nama Pemohon
                    </Typography>
                    <Input
                      required
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({ ...client, fullName: e.target.value })
                      }
                      value={client?.fullName}
                      size="lg"
                      placeholder="name"
                      className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Warganegara
                    </Typography>
                    <Input
                      required
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({ ...client, country: e.target.value })
                      }
                      value={client?.country}
                      size="lg"
                      placeholder="country"
                      className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      No Dokumen
                    </Typography>
                    <Input
                      required
                      disabled={isLoading}
                      onChange={(e) =>
                        setClient({ ...client, passport: e.target.value })
                      }
                      value={client?.passport}
                      size="lg"
                      placeholder="passport"
                      className=" !border-t-blue-gray-200 mt-4  w-full focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>

                <Button disabled={isLoading} type="submit" className="mt-10 flex justify-center" fullWidth>
                  {isLoading ? <Spinner /> : "Sbumit"}
                </Button>
              </Card>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
