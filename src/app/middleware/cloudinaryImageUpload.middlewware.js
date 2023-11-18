import fs from "fs";

export async function imgMiddleware(req, res, next) {
  try {
    // file validation
    if (!req.files) {
      const responseData = {
        ok: false,
        message: "No files were choose",
      };

      return new Response(JSON.stringify(responseData), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    let files = Object.values(req.files).flat();

    // file type validatoin
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);

        const responseData = {
          ok: false,
          message: "invalid file format!",
        };

        return new Response(JSON.stringify(responseData), {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
          },
        });
      }

      // file size validatoin
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);

        const responseData = {
          ok: false,
          message: "file size is too large mx 10mb is allowd!",
        };

        return new Response(JSON.stringify(responseData), {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
          },
        });
      }
    }
    next();
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

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
