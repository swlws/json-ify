import { resolve, dirname } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HOME_PATH = resolve(__dirname, "..");

/**
 * 库版本号
 */
function setNewPackageVersion() {
  console.log("Next Version: ");
  execSync("pnpm version patch", {
    cwd: HOME_PATH,
    stdio: "inherit",
  });
}

/**
 * 打包
 */
function buildDist() {
  execSync("pnpm build", {
    cwd: HOME_PATH,
    stdio: "inherit",
  });
}

/**
 * 发布到私有NPM
 */
function publish() {
  execSync("npm publish", {
    cwd: HOME_PATH,
    stdio: "inherit",
  });
}

/**
 * 主入口
 */
function main() {
  setNewPackageVersion();
  buildDist();
  publish();
}
main();
