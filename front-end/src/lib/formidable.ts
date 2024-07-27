
import formidable from 'formidable';
import path from 'path';

export const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/gallery'),
    keepExtensions: true,
});
