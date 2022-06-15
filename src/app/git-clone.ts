import { createAccesstoken } from "../utils/createAccessToken";
import simpleGit from "simple-git";
import fs from "fs";

const BASE = "/Users/wito/code/poc/data";
const REPOSITORY = "WitoDelnat/tmp-poc-repo";

(async function main() {
  const dir = `${BASE}/${REPOSITORY}`;

  if (fs.existsSync(dir)) {
    console.log("delete directory manually");
    return;
  }

  const git = simpleGit()
    .addConfig("user.name", "WitoDelnat using Monokle")
    .addConfig("user.email", "wito.delnat@gmail.com");

  const token = await createAccesstoken();
  const url = `https://x-access-token:${token}@github.com/${REPOSITORY}.git`;
  await git.clone(url, dir);
  await git.cwd({ path: dir });

  const readme = `${dir}/README.md`;
  fs.appendFileSync(readme, "x");
  await git.add("./README.md");
  await git.commit("updated README");
  await git.push();
})();
