"use client";
import React, { useEffect, useState, useCallback } from "react";
import useStore from "@/app/store/store";
import LeftMenu from "./LeftMenu";
import { HiMenuAlt1 } from "react-icons/hi";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import axios from "axios";
import dynamic from "next/dynamic";
import { Card, CardBody, Input, Button } from "@material-tailwind/react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const init = {
  thumbnailUrl: "",
  title: "",
  description: null,
  subBranch: null,
  version: "1.00",
  liveLink: "",
  price: "0",
  tags: "",
  isPublised: "true",
};

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function SetFeatured({ repoName }) {
  const [selectedFile, setselectedFile] = useState(null);

  const [finalRepo, setFinalRepo] = useState(init);

  const [isFatching, setIsFatching] = useState(false);

  const [sidebar, setSidebar] = useState(false);

  const [tags, setTags] = useState([]);

  const [tagStr, setTagStr] = useState("allitems");

  const closeSidebar = () => {
    setSidebar(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsFatching(true);
      if (!selectedFile) return;
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("title", finalRepo?.title);
      formData.append("description", finalRepo?.description);
      formData.append("subBranch", finalRepo?.subBranch);
      formData.append("version", finalRepo?.version);
      formData.append("tags", tagStr);
      formData.append("price", finalRepo?.price);
      formData.append("isPublished", finalRepo?.isPublished || true);
      formData.append("liveLink", finalRepo?.liveLink);
      formData.append("reponame", repoName);

      const response = await axios.post("/api/featured", formData);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Featured Succeffylly Added!",
        });
        setIsFatching(false);
        setFinalRepo(init);

        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Internal server error!",
        });
        setIsFatching(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
    const commaSeparatedString = tags.join(",");
    setTagStr(commaSeparatedString);
  };

  return (
    <section>
      <div className="   flex   bg-[#F2F5F9]">
        {/* <lest menu /> */}
        <LeftMenu
          className=" max-w-[18rem] "
          sidebar={sidebar}
          closeSidebar={closeSidebar}
        />
        {/* total page */}
        <div className=" xl:ml-[21rem]  w-full grid   h-full  overflow-y-scroll grid-cols-1  2xl:grid-cols-3 gap-y-2  lg:col-span-4 ">
          <div className="   2xl:col-span-3  2xl:order-2 ">
            {/* header */}
            <div className="  bg-white flex items-center  px-10 justify-between  h-[5rem] cutstomShad  w-full  mb-8">
              <h1 className=" uppercase  text-[#223354] font-bold">
                {repoName}
              </h1>

              <div>
                <HiMenuAlt1
                  className=" xl:hidden  text-[1.5rem] cursor-pointer"
                  onClick={() => setSidebar(!sidebar)}
                />
              </div>
            </div>

            {/* ==========Main======== */}

            <form onSubmit={onSubmit}>
              <div className="  mb-10 w-full  grid grid-cols-1 justify-items-center">
                <Card className="mt-6  max-w-[120rem] w-[90%]">
                  <CardBody className=" space-y-8">
                    <div className="w-full flex flex-col space-y-3">
                      <label
                        htmlFor="thumbnail"
                        className=" text-black font-semibold"
                      >
                        Thumbnail
                      </label>

                      <input
                        required
                        disabled={isFatching}
                        type="file"
                        onChange={(e) => setselectedFile(e.target.files[0])}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Title"
                        required
                        disabled={isFatching}
                        value={finalRepo.title}
                        onChange={(e) =>
                          setFinalRepo({ ...finalRepo, title: e.target.value })
                        }
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="thumbnail"
                        className=" mb-2 block text-black font-semibold"
                      >
                        Description
                      </label>

                      <MDEditor
                        value={finalRepo?.description}
                        onChange={(value) =>
                          setFinalRepo({
                            ...finalRepo,
                            description: value,
                          })
                        }
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="thumbnail"
                        className=" mb-2 block text-black font-semibold"
                      >
                        Branches
                      </label>

                      {init?.subBranch && (
                        <select
                          required
                          disabled={isFatching}
                          className="relative px-2  w-full rounded-md  bg-white border-[#B0BEC5] border min-w-[200px] h-10"
                          onChange={(e) =>
                            setFinalRepo({
                              ...finalRepo,
                              subBranch: e.target.value,
                            })
                          }
                          variant="outlined"
                          label="Select Sub Branch"
                        >
                          {init?.subBranch.map((branch, index) => (
                            <option key={index}>{branch.name}</option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="w-full">
                      <Input
                        type="number"
                        label="Version"
                        required
                        disabled={isFatching}
                        value={finalRepo.version}
                        onChange={(e) =>
                          setFinalRepo({
                            ...finalRepo,
                            version: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="thumbnail"
                        className=" mb-2 block text-black font-semibold"
                      >
                        Live Link
                      </label>
                      <Input
                        type="text"
                        label="Live Link"
                        value={finalRepo.liveLink}
                        onChange={(e) =>
                          setFinalRepo({
                            ...finalRepo,
                            liveLink: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="thumbnail"
                        className=" mb-2 block text-black font-semibold"
                      >
                        Tags
                      </label>
                      <TagsInput
                        className=" border border-gray-200 w-full p-2 rounded-md"
                        value={tags}
                        onChange={handleTagsChange}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="thumbnail"
                        className=" mb-2 block text-black font-semibold"
                      >
                        Published
                      </label>

                      <select
                        className="relative w-full rounded-md  bg-white border-[#B0BEC5] px-2 border min-w-[200px] h-10"
                        variant="outlined"
                        value={finalRepo?.isPublised}
                        label="Published"
                        onChange={(e) =>
                          setFinalRepo({
                            ...finalRepo,
                            isPublised: e.target.value,
                          })
                        }
                      >
                        <option value="true">Public</option>
                        <option value="false">Privet</option>
                      </select>
                    </div>

                    <Button
                      disabled={isFatching}
                      className="w-full"
                      type="submit"
                    >
                      {isFatching ? (
                        <span className=" animate-pulse">Loading...</span>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </form>
            {/* ==========Main End======== */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SetFeatured;
