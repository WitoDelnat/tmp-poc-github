import axios from "axios";
import { createAccesstoken } from "../utils/createAccessToken";

// See http://thecodebarbarian.com/building-a-github-app-with-node-js.html

(async function main() {
  const readme = await createGitHubRequest(
    "/repos/WitoDelnat/tmp-poc-repo/contents/README.md"
  );

  const readmeContent = Buffer.from(readme.content, "base64").toString("utf8");

  console.log("GitHub readme", readmeContent, readme);
})();

async function createGitHubRequest(url: string) {
  const token = await createAccesstoken();

  const res = await axios.get(`https://api.github.com${url}`, {
    headers: {
      authorization: `bearer ${token}`,
      // Because the GitHub API is in some sort of preview stage
      accept: "application/vnd.github.machine-man-preview+json",
    },
  });

  return res.data;
}
