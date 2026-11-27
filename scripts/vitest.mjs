// Runs Vitest from the project's real path (`npm test` / `npm run test:watch`).
//
// On Windows, editors and terminals often open the folder as `d:\...` while
// Node resolves real paths as `D:\...`. Started through `npx vitest`, the CLI
// then loads from one spelling and the test files import `vitest` from the
// other: two runner copies, and every file fails with "Vitest failed to find
// the current suite" or "Cannot read properties of undefined (reading 'config')".
// Launching the CLI from the canonical path keeps a single copy.
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const root = fs.realpathSync.native(process.cwd())
const cli = path.join(root, "node_modules", "vitest", "vitest.mjs")

const { status, error } = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
})
if (error) throw error
process.exit(status ?? 1)
