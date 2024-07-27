import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const galleryDir = path.join(process.cwd(), 'public/gallery');

export async function POST(req: NextRequest) {
    const { image } = await req.json();
    const imagePath = path.join(galleryDir, image);

    try {
        fs.unlinkSync(imagePath);
        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
