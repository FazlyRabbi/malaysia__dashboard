// const nodemailer = require("nodemailer");

// import contactTampEmail from "../emailtamplates/contactTampEmail";

// export async function sendMail(req) {
//   try {
//     const data = await req.json();

//     // create transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: `syeddelwarh.sdh@gmail.com`,
//         pass: `bfczbozpdwbxwhie`,
//       },
//     });

//     // send mail with defined transport object
//     const mailOptions = {
//       from: `syeddelwarh.sdh@gmail.com`,
//       to: data.email,
//       subject: "Application For Employment!",
//       html: contactTampEmail(),
//     };

//     const info = await transporter.sendMail(mailOptions);

//     console.log("Email Sent: " + info.response);

//     const responseData = {
//       ok: true,
//       message: "Successfully Send Email!",
//     };

//     return new Response(JSON.stringify(responseData), {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (err) {
//     const responseData = {
//       ok: false,
//       message: "Data Not Inserted!",
//       data: err.message,
//     };

//     return new Response(JSON.stringify(responseData), {
//       status: 500,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         "Content-Type": "application/json", // Set the content type header to JSON
//       },
//     });
//   }
// }
