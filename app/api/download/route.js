import { promises as fs } from "fs";
import path from "path";

export const GET = async () => {
  try {
    const filePath = path.join(process.cwd(), "Game Files", "Deep Dark Setup.exe");
    const fileBuffer = await fs.readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="setup.exe"',
      },
    });
  } catch (error) {
    return Response.json(
      { error: "setup.exe not found" },
      { status: 404 }
    );
  }
};
