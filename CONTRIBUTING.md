# Contributing to ciphex

Thanks for your interest in contributing! ciphex is a small, focused library — a great place to learn open source contribution without getting overwhelmed.

---

## Getting Started

```bash
git clone https://github.com/rohan-shridhar/ciphex.git
cd ciphex
node test.js   # smoke test — no dependencies needed
```

No build step. No bundler. Just Node.js.

---

## How to Contribute

1. **Pick an issue** from the lists below (or open your own).
2. **Fork** the repo and create a branch: `git checkout -b fix/your-issue-name`
3. **Make your changes** and verify `node test.js` still passes.
4. **Open a Pull Request** with a short description of what and why.

Please keep PRs focused — one issue per PR is ideal.

---

## 🟢 Good First Issues
> Perfect if you're new to open source or just want a quick win.

---

### #1 — Add input validation for non-ASCII characters
**Label:** `good first issue`, `bug`

`encrypt()` silently produces garbage output when passed characters outside the printable ASCII range (e.g. emojis, accented letters). Add a validation check that throws a descriptive `Error` — or returns `null` — when unsupported characters are detected, and document the behaviour.

---

### #2 — Write a proper test suite using Jest
**Label:** `good first issue`, `testing`

`test.js` is a quick manual smoke test. Replace it (or supplement it) with a proper [Jest](https://jestjs.io/) test file that covers: encrypt → decrypt round-trip, `null` inputs, edge-case characters (space, `~`, `!`), and a known key pair producing a known output.

---

### #3 — Add JSDoc comments to all exported functions
**Label:** `good first issue`, `documentation`

`encrypt`, `decrypt`, `generateKeys`, and `modInverse` have no inline documentation. Add JSDoc comments describing parameters, return values, and any thrown errors. This enables IDE autocomplete for anyone using the package.

---

### #4 — Add a `README` example showing how to store and reuse keys
**Label:** `good first issue`, `documentation`

A common beginner mistake is losing the keys after encryption. Add a short code snippet in the README showing how to serialize keys to a JSON file (using `fs`) and reload them for decryption later.

---

### #5 — Export `modInverse` only in dev/test mode
**Label:** `good first issue`, `refactor`

`modInverse` is an internal helper but is currently exported alongside the public API. Investigate whether it should stay exported (for testing), be moved to a separate `utils.js`, or be made accessible only via a test export pattern. Open a PR with your recommendation and the implementation.

---

### #6 — Add a `README` badge for npm downloads
**Label:** `good first issue`, `documentation`

The README already has npm version and license badges. Add a weekly/monthly download count badge from [shields.io](https://shields.io/) using the `npm/dw/ciphex` endpoint to give visitors a sense of package activity.

---

### #7 — Create a `CHANGELOG.md`
**Label:** `good first issue`, `documentation`

Document the differences between v1.0.0 and v1.1.0 (check the git log). Use the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format with sections: `Added`, `Changed`, `Fixed`.

---

### #8 — Handle `undefined` input gracefully in `encrypt` / `decrypt`
**Label:** `good first issue`, `bug`

Currently only `null` is checked. Passing `undefined` will cause a runtime error on the `.length` call inside the loop. Extend the null guard to cover `undefined` (and possibly non-string types) and add a test case for it.

---

### #9 — Add a simple CLI interface
**Label:** `good first issue`, `feature`

Add a `cli.js` entry point that lets users run:
```bash
node cli.js encrypt "hello world" 42 17
node cli.js decrypt "..." 42 17
```
Register it as a `bin` entry in `package.json`. Keep it dependency-free.

---

### #10 — Publish a live demo on README using RunKit
**Label:** `good first issue`, `documentation`

[RunKit](https://runkit.com) lets npm packages have an interactive notebook embed. Add a "Try it live" section to the README with a RunKit badge/link that pre-loads a `generateKeys → encrypt → decrypt` example. No code changes needed — just the link and documentation.

---

## 🔵 Upgrade Issues
> These are medium-effort improvements that extend ciphex meaningfully.

---

### #11 — Add Unicode / full UTF-16 support
**Label:** `enhancement`, `breaking-change`

Extend the cipher to handle the full Unicode range by operating on Unicode code points rather than a fixed ASCII base. This is a breaking change (ciphertext from v1 would not decrypt under the new engine) — design it as an opt-in `{ unicode: true }` option flag so the default behaviour stays backward-compatible. Update tests accordingly.

---

### #12 — Add key derivation from a passphrase
**Label:** `enhancement`

Instead of requiring users to manage a raw `[b, a]` array, expose a `deriveKeys(passphrase: string): [number, number]` function that deterministically maps a human-readable passphrase to a valid key pair (e.g. using a simple hash or checksum). This makes ciphex easier to use for demos and educational projects.

---

### #13 — Publish TypeScript type definitions
**Label:** `enhancement`, `typescript`

Add a `index.d.ts` declaration file so TypeScript users get full type inference:
```ts
export function generateKeys(): [number, number];
export function encrypt(text: string | null, keys: [number, number]): string | null;
export function decrypt(text: string | null, keys: [number, number]): string | null;
export function modInverse(a: number): number;
```
Register it in `package.json` under `"types"`. No build step needed.

---

### #14 — Add an `encryptBuffer` / `decryptBuffer` API for Node.js Buffers
**Label:** `enhancement`, `feature`

Power users may want to encrypt binary data (e.g. short tokens or IDs stored as `Buffer`). Add `encryptBuffer(buf, keys)` and `decryptBuffer(buf, keys)` that operate byte-by-byte using a modulus of 256 instead of 96, keeping the same affine formula. Keep these separate from the string API to avoid breaking changes.

---

### #15 — Set up GitHub Actions CI
**Label:** `enhancement`, `devops`

Add a `.github/workflows/ci.yml` that runs the Jest test suite on every push and pull request (Node 18 and 20). Include a status badge in the README. This is a prerequisite for safely merging future contributions.

---

## Questions?

Open a [GitHub Discussion](https://github.com/rohan-shridhar/ciphex/issues) or just drop a comment on the relevant issue. Happy to help you get unstuck.
