import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

dotenv.config()
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'Home',
    resource_type: 'auto', // this can be 'raw', 'auto', 'image', 'video', 'audio', 'sprite', 'zip', 'pdf', 'other'
    allowed_formats: ['jpg', 'png', 'mp4'], // define the allowed formats
    public_id: (req, file) => `${Date.now()}`,
  },
})

const uploadCloud = multer({ storage: storage })

export default uploadCloud
