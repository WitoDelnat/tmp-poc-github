import fs from "fs";
import { createAppAuth } from "@octokit/auth-app";

const INSTALLATION_ID = process.env.INSTALLATION_ID;
const APP_ID = "210807";
const APP_CLIENT_ID = "Iv1.adb5edf525c04b73";
const APP_CLIENT_SECRET = process.env.CLIENT_SECRET;
const APP_PRIVATE_KEY_PATH = "./app.private-key.pem";
const APP_PRIVATE_KEY = fs.readFileSync(APP_PRIVATE_KEY_PATH, "utf8");

export async function createAccesstoken() {
  const auth = createAppAuth({
    appId: APP_ID,
    privateKey: APP_PRIVATE_KEY,
    installationId: INSTALLATION_ID,
    clientId: APP_CLIENT_ID,
    clientSecret: APP_CLIENT_SECRET,
  });

  const { token } = await auth({ type: "installation" });
  return token;
}
