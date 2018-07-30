var cloudinary = require('cloudinary');

console.log('cloudinary' , cloudinary)

const CLOUDINARY_API = "649787242853369";
const CLOUDINARY_SECRET = "fgYkK7KCXK2YdXDsUsI4KYF86do";

cloudinary.config({
  cloud_name: "cloudsts",
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET
});

export default {
  cloudinary
}