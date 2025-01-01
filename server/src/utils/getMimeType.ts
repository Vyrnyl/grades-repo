import path from "path";

const getMimeType = (filePath: string): string => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
    if (ext === '.png') return 'image/png';
    if (ext === '.gif') return 'image/gif';
    if (ext === '.bmp') return 'image/bmp';
    if (ext === '.webp') return 'image/webp';
    return 'application/octet-stream';
}

export default getMimeType