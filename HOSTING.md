# Kitchen Crawl Online — two-player co-op prototype

A GitHub-ready Node.js project serving the 12-floor game and its WebSocket relay.
This is a source package, not a deployed website or a production-tested release.

## Deploy on Render

1. Extract this ZIP. Upload the **contents of `kitchen-crawl-online/`** to the
   root of a new GitHub repository. Keep the `public/` and `test/` folders.
2. In Render, create a **Web Service** connected to that repository.
3. Select the Node runtime. Build command: `npm install`. Start command:
   `npm start`. Health check path: `/health`. Use Node 22 or later.
4. Choose an instance/plan and deploy. Review current provider pricing and
   sleep limits; an always-on instance avoids idle wake-up delays.
5. Open the HTTPS URL Render assigns you. Both players use that SAME URL.

Alternatively, use Render's Blueprint flow with the included `render.yaml`.
Review its proposed resources and pricing before confirming deployment.
There is no Netlify frontend setup or separate server URL to configure.

## Menu-button fix

`public/index.html` now contains its game scripts, so Solo, Settings, and Help
also work when that complete file is opened directly in a browser. Host/Join
still require the Node.js server; a static HTML preview cannot supply multiplayer.
If the loading message stays visible, JavaScript has been blocked by the viewer:
open the downloaded page in a normal browser or use the hosted game URL.

After editing `public/game.js` or `public/coop.js`, run `npm run build` to refresh
the embedded scripts. `npm start` does this automatically. The server permits
the bundled scripts through exact content hashes rather than unsafe inline JS.

## Major bosses and completion marks — v0.3

The game now has a **12-floor campaign**, replacing the previous endless loop.
Regular kitchen bosses and champions appear between four fixed milestones:

| Floor | Original major boss | Encounter |
|---|---|---|
| 3 | Boiler Heart | Pulsing heart-shaped pressure vessel; radial barrages and delayed explosions under players |
| 6 | Ash Warden | Horned furnace guardian; targeted stomps and warning-marked furnace columns |
| 9 | The Silent Deep | Sealed blue giant; slow bullet curtains with gaps, plus paired warning columns |
| 12 | The Unravelled | Four shifting forms that echo other bosses; teleport landings are marked in advance |

These are original designs loosely inspired by the encounter archetypes of
Mother's Heart, Satan, Hush and Delirium. They are not those exact characters,
and do not use The Binding of Isaac artwork, music, code, or attack scripts.

Major bosses enrage below half health. Dashed/outlined ground markers with a
countdown are warnings, NOT damage. Solid zones marked DANGER are active.
Warnings last about 1–1.25 seconds. Damage immunity, separate co-op lives,
room-clear revives and flawless-boss deals work with these hazards. Boss health
scales for two players. Hazards stop when the room clears and pause with combat.
The Unravelled's landing marker appears before it moves, not afterwards.

After defeating the floor-12 boss, use the blue **END SHIFT** hatch to finish
and bank the host's run tokens plus a 5-token campaign bonus. You may collect
remaining boss loot first. No floor 13 is generated.

### Your completion sheet

Four stamp slots appear beside the selected courier's portrait. The small
number is the encounter floor. Faint/dashed means incomplete; a dark stamp
means cleared. Hover or keyboard-focus a mark for its accessible boss label.
There are four independent marks for each of the four couriers (16 total).

Marks save immediately on a major-boss room clear, even if the run later ends
in defeat. Regular bosses do not award these four marks. Marks are completion
only: there are no cosmetic unlocks, hard-mode variants, or stat bonuses.

In co-op, the host saves ONLY the host courier's marks. The guest saves ONLY
the guest courier's marks in their own browser when the host's clear reaches
them. Both qualify, including a partner revived by that clear. The run's clear
history travels in later snapshots, so changing floors does not lose a missed
clear notification. A disconnection before any post-clear update can still
prevent a guest from receiving the mark; there is no account/reconnect system.

Completion saves use `kitchen-crawl-completions-v1`, separate from tokens,
settings, and character choice. Storage is local to the website origin/browser:
clearing site data or changing the website address does not transfer marks.
If browser storage is blocked, the UI reports **session only**. Existing saved
upgrades remain compatible. Co-op remains host-authoritative and is not
cheat-proof; completion marks are not competitive verification.

Automated coverage adds milestone mapping, all four boss attacks, warned
teleport timing, hazard damage windows, final victory, mark persistence,
character isolation, missed-snapshot recovery, and blocked storage. These are
mocked-DOM/in-memory tests, not real browser playtests. Balance and visual QA
still need human playtesting. The real WebSocket test requires `npm install`.

## Courier roster — v0.2

Choose **Solo expedition**, **Host co-op**, or **Join a friend** to open the
original parchment-style character sheet. Browse with Left/Right arrows or
click a portrait, inspect the base stats/abilities, then confirm. Solo proceeds
to HQ for permanent upgrades. Host and guest choose independently BEFORE they
create/join the room. Duplicate characters are allowed. Selection saves locally.

The presentation is inspired by hand-drawn roguelike selection screens, but
uses original portraits, names, layout and text—not Binding of Isaac assets.
The cyan, mint and coral outfits are delivery-brand-inspired; they are NOT
official Wolt, Deliveroo, or DoorDash characters. No official logos are used in
the portraits. Replace brand references or obtain permission for public release.

| Courier | Base lives | Damage / fry | Movement | Firing rate | Kit |
|---|---:|---:|---:|---:|---|
| Rook — original | 7 | 1.00 | 1.00× | 1.00× | Passive: +1 extra life healed on combat-room clear |
| Frost — Wolt-inspired | 6 | 0.90 | 1.05× | 1.15× | Passive: hits slow enemy movement 35% for 1.2s |
| Hop — Deliveroo-inspired | 5 | 0.85 | 1.25× | 1.20× | Active: double movement + damage immunity for 0.4s; 5s cooldown |
| Ember — DoorDash-inspired | 8 | 1.35 | 0.85× | 0.80× | Passive: +0.35 fry damage at 3 lives or fewer. Active: double firing rate for 3s; 12s cooldown |

**E / Space**, or the **ability button**, activates Hop/Ember's ability. Rook
and Frost are passive-only; their ability button is intentionally disabled.
Cooldowns advance only during live play, persist between rooms, and reset for a
new run. Downed players cannot use abilities. Hop cannot pass through walls.
Frost slows movement only, not enemy projectiles or firing timers.

Character color identifies the courier; **P1 / P2 labels identify the player**.
Your HUD shows your ability and cooldown. Room-clear revives still restore up
to 3 lives. Shared health upgrades and max-life deals apply to BOTH couriers,
but their different base health is preserved. A deal cannot leave either player
below 2 maximum lives. Shared recipe upgrades apply to both; character-specific
passives and abilities do not transfer to the partner. The host's permanent HQ
bonuses still apply to the team; the guest's local HQ upgrades are not imported.

Validation adds starting-stat and projectile tests for all four couriers,
passive/active effects, cooldown/death/pause checks, co-op ID allowlisting,
independent guest abilities, and health-deal safety. Automated tests use mocked
DOM/canvas and in-memory networking, not a real browser. Browser/mobile visual
and combat balancing tests are still required after deployment.

## New dark-dungeon menu

- **Solo expedition** opens character selection, then HQ: buy permanent upgrades, then start.
- **Host co-op** lets you choose a courier, then create a shareable room code.
- **Join a friend** lets you choose a courier, then enter a six-character code.
- **How to play** covers movement, shooting, exploration, and team revives.
- **Settings** saves game audio, master volume, touch-pad visibility, and reduced
  menu motion in this browser. The audio toggle includes gameplay tones.
- The in-game **Menu** button pauses the team and opens settings/help. Ending a
  run requires confirmation; this disconnects the partner. Runs cannot reconnect.
- Preferences and upgrade saves stay local; they do not transfer between origins.

## Can this run on Netlify?

Netlify can host static frontend files, but this package's long-lived WebSocket
server needs a separate persistent Node.js host. Netlify Functions are not a
replacement for that server. The included client currently connects to `/ws`
on its own origin: split Netlify/Render hosting would require changing the
client's server URL and the server's allowed-origin check, then testing both.
This package deliberately keeps frontend and server together on Render, so
no cross-origin configuration is needed. There is no Netlify split-hosting
configuration included.

## Play online

- Player 1 selects **Host co-op**, then **Create a room** and shares the six-character room code.
- Player 2 enters that code and selects **Join expedition**.
- Joining starts a fresh co-op run. Host = P1; guest = P2. Character choice sets outfit color.
- Both use WASD to move and arrow keys to shoot, or the touch pads. E/Space or the ability button uses an active ability.
- Lives are separate. Downed players wait until the surviving partner clears
  the combat room, then revive with up to 3 lives. Both down ends the run.
- Either living player can take the whole team through an unlocked door or
  next-floor hatch. Loot choices, recipes, coins, and maximum-life deals are
  shared. A deal reduces BOTH players' maximum-life limit.
- Either player taking actual boss damage invalidates the flawless blessing.
- Either player can request team pause/resume. Keep the host's tab active.

Solo play is still available through the **Solo expedition** menu and HQ start button.

## Update the live game

Edit `public/game.js` (gameplay), `public/index.html` (layout), or the server
files, then commit and push to GitHub. With auto-deploy enabled, Render
redeploys the same service URL. Players refresh to load the new client.
A server redeploy/restart disconnects active co-op sessions; schedule updates
between games. Keep browser save keys and the deployment URL unchanged.

## Local development and checks

Install Node.js 22+, open a terminal in this folder, then:

```sh
npm install
npm test
npm start
```

Open `http://localhost:3000` in two separate tabs/windows to test both roles.
On a LAN, friends can use your computer's LAN address and the same port;
use the managed HTTPS site for Internet play rather than exposing your PC.

The initial dependency installation needs Internet access. `npm install`
creates `package-lock.json`; commit it to pin versions. Subsequent builds
can use `npm ci` once that lock file is committed.

## Deployment limits and safety

- **Host-authoritative friendly co-op**, NOT a server-authoritative competitive
  game. The host simulates combat and sends snapshots; the server enforces
  lobby membership, player limits, allowed input, message limits, and roles.
  A modified host client can cheat in its own session.
- One server instance only. Room membership lives in RAM. No autoscaling,
  host migration, reconnect, matchmaking, accounts, or mid-run persistence.
- Host permanent upgrades drive the team run. Earned permanent tokens save
  to the HOST browser only. Guest browser upgrades are not overwritten;
  guest token rewards/cloud saves are not implemented in this prototype.
- Browser progress is per origin/device; older hosted/browser saves do not
  automatically transfer to the new service address.
- Keep room codes private. They are bearer invitations, not authenticated
  accounts. Do not send sensitive information through this application.
- Relay messages are limited to 256 KiB and 90 per second per connection;
  snapshots run at 15 Hz, guest inputs at 20 Hz. Slower networks will have
  noticeable latency. There is no client prediction/interpolation yet.
- Connections must originate from the game's own host. HTTPS hosting uses
  secure WebSockets automatically. The provider terminates TLS.
- Replace Wolt-inspired branding or obtain permission before public release.
  This is not an official Wolt application. No brand rights are granted.
  The package is marked UNLICENSED; choose your own distribution terms.

## Validation status

Passed here: JavaScript syntax; room-code isolation/capacity; input filtering;
role enforcement; cleanup/rate limiting; simulated two-client synchronization,
movement, shots, shared recipe pickup, room-clear revives, team defeat, and
boss damage tracking; menu navigation; persistent settings; lobby feedback;
and exit confirmation. These use in-memory transports and mocked drawing.

Not performed here: installing the `ws` dependency, real WebSocket handshake
integration, browser/device playtesting, Internet latency testing, or managed
hosting deployment. The included real-transport test runs after `npm install`
and is skipped when `ws` is unavailable. Before sharing widely, test two
separate browsers/devices, disconnects, pause/resume, bosses, deals, floor
changes, music, touch controls, and refresh/save behavior on the live URL.
