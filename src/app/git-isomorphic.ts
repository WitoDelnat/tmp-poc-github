import { createAccesstoken } from "../utils/createAccessToken";
import { Volume, createFsFromVolume, DirectoryJSON } from "memfs";
import http from "isomorphic-git/http/node";
import git from "isomorphic-git";

const REPOSITORY = "WitoDelnat/tmp-poc-repo";

(async function main() {
  const token = await createAccesstoken();
  const url = `https://x-access-token:${token}@github.com/${REPOSITORY}.git`;

  const volume = new Volume();
  const fs = createFsFromVolume(volume);

  await git.clone({ fs, http, dir: "/data", url });
  console.log(preprocessFiles(volume.toJSON()));
})();

function preprocessFiles(content: DirectoryJSON): DirectoryJSON {
  // Filter irrelevant files
  const entries = Object.entries(content)
    .filter(([key]) => !key.includes("/.git/"))
    .filter(([key]) => !key.includes(".DS_Store"));

  // Remove content of unsupported files while keeping file tree intact
  entries.map(([key, value]) => {
    return [key, isFileSupported(key) ? value : CONTENT_PRUNED_TOKEN];
  });

  return Object.fromEntries(entries);
}

const CONTENT_PRUNED_TOKEN = "_#_";
const SUPPORTED_EXTENSIONS = [".yaml", ".yml", ".md", ".json"];
function isFileSupported(name: string): boolean {
  return SUPPORTED_EXTENSIONS.some((extension) => name.endsWith(extension));
}
