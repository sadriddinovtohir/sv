// @vitest-environment node
/* global process */
import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import en from "./en.json"
import ru from "./ru.json"
import uz from "./uz.json"

// Vitest runs from the project root.
const SRC = path.resolve(process.cwd(), "src")

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return sourceFiles(full)
    return /\.(jsx?)$/.test(e.name) && !e.name.includes(".test.") ? [full] : []
  })
}

describe("locales", () => {
  it("uz, ru and en define exactly the same keys", () => {
    const keys = Object.keys(en).sort()
    expect(Object.keys(ru).sort()).toEqual(keys)
    expect(Object.keys(uz).sort()).toEqual(keys)
  })

  it("has no empty translations", () => {
    for (const [lang, dict] of Object.entries({ en, ru, uz })) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value === "" || value == null, `${lang}.${key} is empty`).toBe(false)
      }
    }
  })

  it("every literal t('KEY') used in the code exists", () => {
    const missing = []
    for (const file of sourceFiles(SRC)) {
      const code = fs.readFileSync(file, "utf8")
      for (const m of code.matchAll(/\bt\(\s*["']([A-Za-z0-9_]+)["']/g)) {
        if (!(m[1] in en)) missing.push(`${path.relative(SRC, file)}: ${m[1]}`)
      }
    }
    expect(missing).toEqual([])
  })
})
