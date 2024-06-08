import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import cloudinary from "cloudinary";
import { v2 } from "cloudinary";
// Configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GetData(req) {
  try {
    const { type } = await req.json();

    if (type === "logo") {
      const records = await prisma.Logo.findMany({
        orderBy: {
          id: "asc", // 'asc' for ascending order, 'desc' for descending order
        },
      });
      const responseData = {
        ok: true,
        message: "Get Successfull.",
        data: records,
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
    } else if (type === "hero") {
      const records = await prisma.HeroBanners.findMany({
        orderBy: {
          id: "asc", // 'asc' for ascending order, 'desc' for descending order
        },
      });
      const responseData = {
        ok: true,
        message: "Get Successfull.",
        data: records,
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
    } else {
      const records = await prisma.LowerBanners.findMany({
        orderBy: {
          id: "asc", // 'asc' for ascending order, 'desc' for descending order
        },
      });
      const responseData = {
        ok: true,
        message: "Get Successfull.",
        data: records,
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
    }
  } catch (err) {
    console.error("Error:", err); // Improved logging for error
    const responseData = {
      ok: false,
      message: "Data Not Updated!",
      data: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
    });
  }
}

export async function UploadsToCloudinary(req) {
  try {
    const formData = await req.formData();
    const logo = formData.get("logo");
    // Get individual files for hero banners
    const img1 = formData.get("img1");
    const img2 = formData.get("img2");
    const img3 = formData.get("img3");
    const img4 = formData.get("img4");
    // Get individual files for lower banners
    const bimg1 = formData.get("bimg1");
    const bimg2 = formData.get("bimg2");
    const bimg3 = formData.get("bimg3");
    const bimg4 = formData.get("bimg4");

    if (logo) {
      const destinationDirPath = path.join("/tmp");

      // Ensure the destination directory exists
      if (!existsSync(destinationDirPath)) {
        await fs.mkdir(destinationDirPath, { recursive: true });
      }
      let logoUrl = "";

      try {
        const fileArrayBuffer = await logo.arrayBuffer();
        const fileName = logo.name;
        const filePath = path.join(destinationDirPath, fileName);
        const buffer = Buffer.from(fileArrayBuffer);
        await fs.writeFile(filePath, buffer);
        const result = await uploadToCloudinary(filePath);
        logoUrl = result.url;
        await fs.unlink(filePath);
        const response = await prisma.Logo.createMany({
          data: {
            logo: logoUrl,
          },
        });
        const responseData = {
          ok: true,
          message: "Post created successfully.",
          data: response,
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
      } catch (error) {
        console.error(`Error writing logo file ${logo.name}:`, error);
      }
    } else {
      if (img1) {
        // Create an array of files
        const images = [img1, img2, img3, img4];
        const destinationDirPath = path.join("/tmp");
        const photoUrls = [];
        // Ensure the destination directory exists
        if (!existsSync(destinationDirPath)) {
          await fs.mkdir(destinationDirPath, { recursive: true });
        }
        for (const image of images) {
          if (image) {
            // Check if the file exists
            try {
              const fileArrayBuffer = await image.arrayBuffer();
              const fileName = image.name;
              const filePath = path.join(destinationDirPath, fileName);
              const buffer = Buffer.from(fileArrayBuffer);
              await fs.writeFile(filePath, buffer);
              const result = await uploadToCloudinary(filePath);
              photoUrls.push(result);
              await fs.unlink(filePath);
            } catch (error) {
              console.error(`Error writing file ${image.name}:`, error);
            }
          } else {
            console.log("No file found for this image slot.");
          }
        }
        if (photoUrls.length > 0) {
          for (const image of photoUrls) {
            const response = await prisma.HeroBanners.createMany({
              data: {
                url: image?.url,
              },
            });
          }
        }
        const responseData = {
          ok: true,
          message: "Post created successfully.",
          data: "successfull",
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
      } else {
        // Create an array of files
        const images = [bimg1, bimg2, bimg3, bimg4];
        const destinationDirPath = path.join("/tmp");
        const photoUrls = [];
        // Ensure the destination directory exists
        if (!existsSync(destinationDirPath)) {
          await fs.mkdir(destinationDirPath, { recursive: true });
        }
        for (const image of images) {
          if (image) {
            // Check if the file exists
            try {
              const fileArrayBuffer = await image.arrayBuffer();
              const fileName = image.name;
              const filePath = path.join(destinationDirPath, fileName);
              const buffer = Buffer.from(fileArrayBuffer);
              await fs.writeFile(filePath, buffer);
              const result = await uploadToCloudinary(filePath);
              photoUrls.push(result);
              await fs.unlink(filePath);
            } catch (error) {
              console.error(`Error writing file ${image.name}:`, error);
            }
          } else {
            console.log("No file found for this image slot.");
          }
        }
        if (photoUrls.length > 0) {
          for (const image of photoUrls) {
            const response = await prisma.LowerBanners.createMany({
              data: {
                url: image?.url,
              },
            });
          }
        }
        const responseData = {
          ok: true,
          message: "Post created successfully.",
          data: "successfull",
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
      }
    }
  } catch (err) {
    console.error("Error:", err); // Improved logging for error
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
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DelateBanner(req) {
  try {
    const { id, type } = await req.json();

    if (type === "logo") {
      const response = await prisma.Logo.delete({
        where: {
          id: parseInt(id),
        },
      });
      const responseData = {
        ok: true,
        message: "Delete successfull.",
        data: response,
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
    } else if (type === "hero") {
      const response = await prisma.HeroBanners.delete({
        where: {
          id: parseInt(id),
        },
      });
      const responseData = {
        ok: true,
        message: "Delete successfull.",
        data: response,
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
    } else {
      const response = await prisma.LowerBanners.delete({
        where: {
          id: parseInt(id),
        },
      });
      const responseData = {
        ok: true,
        message: "Delete successfull.",
        data: response,
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
    }
  } catch (err) {
    console.error("Error:", err); // Improved logging for error
    const responseData = {
      ok: false,
      message: "Data Not Updated!",
      data: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
    });
  }
}

async function uploadToCloudinary(file) {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      resource_type: "auto",
      folder: "thumbnails",
    });

    return result;
  } catch (error) {
    // Delete the local file only if the upload fails
    fs.unlink(file, (unlinkError) => {
      if (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
      reject(error);
    });
    console.error(error);
    throw new Error("Failed to upload file to Cloudinary");
  }
}
