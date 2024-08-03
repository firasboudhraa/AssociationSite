import { NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { IncomingMessage } from 'http';

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'public/gallery');
    console.log('Upload directory:', uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log('Uploading file:', fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    upload.single('file')(req as unknown as IncomingMessage, {} as any, (err: any) => {
      if (err) {
        console.error('Error during file upload:', err);
        reject(NextResponse.json({ error: 'File upload failed' }, { status: 500 }));
      } else {
        console.log('File uploaded successfully');
        resolve(NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 }));
      }
    });
  });
}
