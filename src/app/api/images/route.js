import path from 'path';
import fs from 'fs';

export async function GET() {
  const dir = path.join(process.cwd(), 'public/Images');

  const files = fs.readdirSync(dir);

  const imagePaths = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg'].includes(ext);
    })
    .map(file => `/Images/${file}`);

  return new Response(JSON.stringify(imagePaths), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
