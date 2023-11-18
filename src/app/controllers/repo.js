import {
  CreateRepo,
  getAllRepo,
  makePrivetRepo,
  getAllRepoForIfinite,
  getSearchSuggestions
  
} from "../../../prisma/createRepo";
import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import cloudinary from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getRepo(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    const result = await getAllRepo(page);

    const responseData = {
      ok: true,
      message: "Repo get successfully!",
      data: result,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    const responseData = {
      ok: false,
      message: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}

export async function getRepoByInfinite(req) {
  const {page} = await req.json();

  try {
    const result = await getAllRepoForIfinite(page);

    const responseData = {
      ok: true,
      message: "Repo get successfully!",
      data: result,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    const responseData = {
      ok: false,
      message: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}


export async function getSearchSuggestion(req) {

  const {keywords} = await req.json();

  try {
    const result = await getSearchSuggestions(keywords);

    const responseData = {
      ok: true,
      message: "Repo get successfully!",
      data: result,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    const responseData = {
      ok: false,
      message: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}





export async function postRepo(req) {
  const formData = await req.formData();

  try {
    const f = formData.get("file");

    if (!f) {
      return NextResponse.json({}, { status: 400 });
    }

    const file = f;

    const destinationDirPath = path.join(process.cwd(), "/tmp");

    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath)) {
      fs.mkdir(destinationDirPath, { recursive: true });
    }
    const fileName = file.name;
    const filePath = path.join(destinationDirPath, fileName);

    const buffer = Buffer.from(fileArrayBuffer);

    await fs.writeFile(filePath, buffer);

    const result = await uploadToCloudinary(filePath);

    fs.unlink(filePath);

    //  manupulate final data
    const id = formData.get("category");
    // Get the string value from FormData
    const isPublishedString = formData.get("isPublished");
    // Convert the string to a Boolean using a conditional statement
    const isPublishedBoolean = isPublishedString === "true";

    const repoData = {
      thumbnailUrl: result.url,
      title: formData.get("title"),
      description: formData.get("description"),
      subBranch: formData.get("subBranch"),
      version: formData.get("version"),
      liveLink: formData.get("liveLink"),
      price: formData.get("price"),
      reponame: formData.get("reponame"),
      category: {
        connect: {
          id: parseInt(id), // Connect using the category's ID
        },
      },
      tags: formData.get("tags"),
      isPublished: isPublishedBoolean,
    };

    // //  send data to data base
    const backRes = await CreateRepo(repoData);

    //  sending respons
    const responseData = {
      ok: true,
      message: "Repo Inserted Successfully!",
      data: backRes,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    const responseData = {
      ok: false,
      message: "Data Not Inserted!",
      data: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json", // Set the content type header to JSON
      },
    });
  }
}

export async function privetRepo(req) {
  try {
    const id = await req.json();
    const result = await makePrivetRepo(id);
    //  sending respons
    const responseData = {
      ok: true,
      message: "Repo Privet Successfully!",
      data: result,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    const responseData = {
      ok: false,
      message: "Data Not Inserted!",
      data: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json", // Set the content type header to JSON
      },
    });
  }
}

// file upload to cloudinary

export const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: "products",
      },
      (error, result) => {
        if (error) {
          fs.unlink(file);
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            public_url: result.public_id,
          });
        }
      }
    );
  });
};
