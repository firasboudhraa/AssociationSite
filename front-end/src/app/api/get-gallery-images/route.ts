import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const galleryDir = path.join(process.cwd(), 'public/gallery');

export async function GET() {
    try {
        const files = fs.readdirSync(galleryDir);
        return NextResponse.json(files);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
    }
}
