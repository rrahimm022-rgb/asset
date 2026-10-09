# AssetForge — usable local ID mapping application

This is a working Next.js application for parsing Roblox asset IDs, creating/editing old-to-new mappings, removing rows, copying complete mappings, and exporting CSV. The mapping workflow runs in the browser and does not require credentials.

## Requirements
Node.js 20 LTS recommended.

## Local run
1. Extract the ZIP.
2. Copy `.env.example` to `.env.local` (not required for the mapping UI).
3. Run `npm install`
4. Run `npm run dev`
5. Open `http://localhost:3000`

## Vercel
Import this folder as a GitHub repository into Vercel. The build command is `npm run build`. No environment variables are required for the mapping/export features.

## Environment variables
`ROBLOX_API_KEY`, `ROBLOX_CREATOR_ID`, and `ROBLOX_CREATOR_TYPE` are placeholders for a future server-side integration. They are intentionally not read by the current app because it does not upload assets. Never expose API keys with `NEXT_PUBLIC_` or commit `.env.local`.

## Honest feature scope
This is not a fake mockup: the parsing, mapping editor, remove action, copy, and CSV export are implemented. It is not an account/asset spoofer and does not upload, modify, or republish Roblox assets. A real upload feature must be built against supported Roblox Open Cloud APIs and tested with an authorized creator account; this ZIP does not claim that capability.
