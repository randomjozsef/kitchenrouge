# Kitchen Crawl Online — hosting guide

Current release: 0.5.3. For gameplay and update notes, see README.md.

## Local setup

Use Node.js 22 or newer. From the project folder:

```bash
npm install
npm start
```

Open the local address printed by the server. The default port is 3000. The start command automatically builds the bundled HTML before running the HTTP/WebSocket server.

## GitHub folder structure

Extract the distribution ZIP. Upload the contents of kitchen-crawl-online, preserving the public and test folders. Do not upload only the ZIP or flatten the folders.

```text
package.json
build.cjs
server.cjs
lobby.cjs
render.yaml
README.md
HOSTING.md
public/
    index.html
    game.js
    coop.js
test/
    coop.test.cjs
    page.test.cjs
    transport.test.cjs
```

## Render deployment

Create a Web Service connected to your repository and deployment branch. Do not choose Static Site if you want multiplayer.

| Setting | Value |
|---|---|
| Root Directory | Blank when package.json is at repository root |
| Build Command | npm install |
| Start Command | npm start |
| Health Check Path | /health |
| NODE_VERSION | 22 |
| NODE_ENV | production |

Render provides PORT automatically. The server reads it; do not manually override it. If the project is nested inside a repository folder, set Root Directory to that folder instead.

Use one server instance: room state is held in memory and there is no multi-instance coordination. Restarting or redeploying disconnects active sessions. Deploy between games, then have both players refresh to load the same client version.

The service serves both the game and its WebSocket relay from the same origin. No separate frontend API key, database, domain variable, or login secret is needed. Separate frontend hosting requires additional client/server configuration; merely adding an environment variable will not connect it.

## Custom domain

In Render, add the domain under your service's Settings → Custom Domains. At your domain provider, add the exact DNS records Render specifies, then wait for verification and HTTPS certificate provisioning. A play subdomain usually uses a CNAME, but use Render's current instructions for the exact record and target.

No game-code change is required for a same-origin custom domain. Browser saves are origin-specific: progress on the old Render address does not automatically transfer to the custom domain.

## Testing and build

```bash
npm run build
npm test
```

The real HTTP/WebSocket integration test requires the ws dependency from npm install. Other tests use a mocked DOM and simulated clients. These do not replace browser/mobile visual QA, Internet multiplayer testing, or balance playtesting.

## Updating to v0.5.3

Upload the full extracted project contents, including lobby.cjs and both public JavaScript files. npm start rebuilds the inline HTML, but public/index.html must still be included. Redeploy/restart, then refresh both players' browsers and create a new room. Existing live sessions do not migrate. This update changes the input protocol; do not mix versions.

No extra environment variables or larger RAM allocation are required by this update. This is not a guarantee that 512 MB is sufficient for every concurrent load. Check actual CPU/memory metrics before changing the service plan. Guest movement prediction and compact snapshots reduce avoidable lag, but cannot fix distant server regions, slow connections, or a throttled host browser.

## Operational limits

* Two players per room; no account system, matchmaking, or mid-run reconnect.
* The host browser runs the simulation and must remain active. This is not cheat-proof competitive networking.
* Each browser shows standard rooms in full, and renders a local follow camera only in larger rooms. Camera positions are not shared player state.
* Completion marks and settings save locally in each player's browser. There are no permanent stat upgrades or token rewards in v0.5.1.
* The missing public/index.html error means the deployed folder structure or Render root directory is incorrect; the build expects that source file to already exist.
