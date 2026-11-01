# Kitchen Crawl Online

A kitchen-themed dungeon crawler for solo players and two-player online co-op. Choose a courier, battle through dangerous kitchens, collect recipes that change your attacks, and defeat four major bosses across a 12-floor campaign.

Current version: 0.5.3. This is a playable prototype; balancing and browser/device playtesting are still in progress.

## How to play

Explore each floor room by room. Defeat every enemy in a combat room to unlock its doors, collect coins and recipes, and look for the floor boss. After beating that boss, collect your rewards and use the blue hatch to descend.

Recipes improve your run with effects such as stronger shots, extra projectiles, and other attack modifiers. Visit shops and rest rooms, and weigh optional boss deals carefully: some cost maximum lives.

Defeat the final boss on floor 12, then use the END SHIFT hatch to finish the campaign and finish your run. There is no floor 13.

## Random maps, cover, chests, and keys

Each floor uses a fixed 6×6 grid. Random branching layouts occupy about 12–18 rooms, occasionally one more to keep the item room optional, leaving empty spaces. Connected routes, optional loops, and a boss dead end make each floor different. The minimap uses compact room letters.

Standard rooms measure 760×440 world units and remain entirely visible with a fixed camera. Each floor also includes larger 1520×880 combat rooms; the four major-boss arenas are large too. Only larger rooms follow your courier, stopping at room boundaries. In co-op, each browser follows its own player in large rooms; a downed player watches the survivor. Off-screen arrows may point to doors, partners, loot, exits, and attack hazards, but NEVER enemies or bosses. Ground attack warnings remain visible. Standard rooms have no edge arrows.

Standard combat rooms contain 4–6 solid crates; large combat rooms contain 8–12, with proportionally larger crates. Use them to hide from incoming shots, but remember that they also block your shots and movement, including Hop's dash. Enemies collide with cover too. Cover does not protect against warning-marked ground attacks. Boss rooms stay open without crates, keeping their attack patterns readable.

Walk near a chest after clearing its room to open it. It scatters 5–9 coins, which you collect by walking over them. An opened chest stays empty when you revisit the room.

* Floor 1: chests and item-room entrances are free.
* Floor 2 onward: each chest and each locked item-room entrance costs 1 key. Approaching the chest or walking into the entrance spends the key automatically if you have one.
* An unlocked item room stays open; returning does not cost another key.
* From floor 2 onward, a free key pickup waits in the starting room. Collect it by walking over it.
* Ordinary enemies can drop keys. Shops offer one key for 10 coins per floor.
* Keys carry between floors during the run but reset when you start a new run. They are not permanent upgrades.
* In co-op, keys are shared: either player can collect or spend them. Chest coins are shared too.
* Locked item rooms are optional dead ends. Reaching the boss never requires a key, even if you spend your keys on chests.

Minimap legend: Start = starting room, F = fight, T = item room, K = locked item room, S = shop, R = rest, B = boss, C = champion boss. Gold K-marked doorways lead to locked item rooms.

## Controls

| Action | Control |
|---|---|
| Move | W, A, S, D |
| Shoot | Arrow keys |
| Active ability | E or Space |
| Touch movement and shooting | On-screen touch pads |
| Touch ability | Ability button |
| Pause, settings, and help | In-game Menu button |

Rook and Frost have passive abilities only. Hop and Ember have active abilities with cooldowns. Settings include volume, audio, touch-pad visibility, and reduced menu motion.

## Choose your courier

Each courier has a different starting kit. Both co-op players choose independently, and duplicate characters are allowed.

| Courier | Starting lives | Play style | Ability |
|---|---:|---|---|
| Rook | 3 | Balanced survival | Heals one life after defeating a boss |
| Frost | 2 | Fast-firing crowd control | Hits slow enemy movement by 35% for 1.2 seconds |
| Hop | 2 | Fast movement and evasive play | Double movement speed and damage immunity for 0.4 seconds; 5-second cooldown |
| Ember | 4 | Heavy damage, slower movement | Extra damage at 3 lives or fewer; active doubles firing rate for 3 seconds with a 12-second cooldown |

Hop cannot move through walls. Frost slows enemy movement, not enemy projectiles.

## Multiplayer responsiveness — v0.5.3

The guest now predicts movement locally instead of waiting for a full round trip. Input commands carry sequence numbers, frame durations, and a room identifier. The host applies validated commands once and acknowledges them; the guest restores authoritative positions and replays unacknowledged movement. Both paths use the same crate collision and room-boundary code. Health, shooting results, pickups, active abilities and room transitions remain host-authoritative, so their confirmation still depends on latency.

State updates target 30 Hz (previously 15 Hz), subject to the host's frame rate. Most updates carry the current room plus combat state instead of retransmitting the whole floor. Full snapshots are sent on layout changes and approximately once a second to recover missing baselines. Guest input batches target 30 Hz, with changes sent sooner. Commands and prediction queues are bounded. Prediction stops after 500 ms without an authoritative update.

Remote courier/enemy positions use render-only smoothing. Guest projectiles are projected forward visually for up to 80 ms between updates. Neither feature changes host collision or damage decisions. Large position corrections snap instead of drifting across rooms. Client/server output queues have lower backpressure thresholds, reducing accumulation of outdated messages on congested connections.

This reduces avoidable input delay, movement stepping, and repeated layout traffic. It does NOT eliminate Internet latency, packet stalls, slow host devices, or server/resource limits. The host must keep the tab active. Client prediction is not an anti-cheat system, and visual corrections can still occur under poor connections or ability/stat changes.

Update the **whole project**, including lobby.cjs, public/game.js, public/coop.js, and the rebuilt public/index.html, then restart/redeploy and refresh BOTH browsers. Start a new room. Do not mix old/new clients or keep an old server running behind the new client. Boss marks and settings retain their save keys.

Automated tests include immediate movement before host delivery, 160 ms simulated round-trip delay with jitter, acknowledgement replay, cover collision, stale-connection limits, compact-state recovery, command validation/deduplication, and backpressure handling. These use simulated clients, not a live Render deployment. The real HTTP/WebSocket test requires installing ws; browser/mobile and Internet multiplayer QA remain outstanding.

## Damage indicators

Projectile hits show floating damage numbers over enemies and bosses. Taking damage shows −1 above the courier and briefly highlights the affected player's own screen with a red border. Numbers use actual projectile damage, including character and recipe bonuses, capped to the target's remaining health. Ongoing burn ticks do not create separate numbers. Invulnerability prevents both damage and duplicate hurt indicators.

Indicators synchronize to the guest, freeze while paused, and clear on room changes. Reduced motion disables the screen flash and the labels' upward movement, while keeping the numbers visible. Very short effects may be missed under severe network loss, since they travel in regular snapshots.

## Pause menu

Press P or Escape, click Pause, or use Pause menu to pause the run. The pause overlay offers Resume, Settings, How to Play, and Quit to Main Menu. Escape returns from settings/help to the pause menu, then resumes from the pause menu. Quitting requires confirmation and loses this run's coins, keys, and recipes, but keeps earned boss marks.

Movement, attacks, hazards, and ability cooldowns stop while paused. In co-op the pause is team-wide, and either player can request resume. Opening settings during a team pause does not restart combat. If the host resumes, both players return to gameplay. Losing focus also requests a pause.

## Solo expedition

Choose Solo expedition and select your courier. Confirming starts your run immediately. There is no starting HQ, prestige system, token currency, or permanent stat shop. Recipes and other pickups improve only the current run.

## Play with a friend

1. Both players open the same hosted game website.
2. Player 1 selects Host co-op, chooses a courier, and creates a room.
3. Player 1 shares the six-character room code privately.
4. Player 2 selects Join a friend, chooses a courier, and joins using the code.
5. Joining starts a fresh co-op run.

Each player has separate lives. If one player goes down, the survivor can revive them with 1 life by clearing the combat room. If both players go down, the run ends.

Recipes, coins, keys, and loot choices are shared. Either living player can move the team through unlocked doors or the next-floor hatch. Maximum-life deals affect both players. Damage taken by either player during a boss encounter prevents the flawless blessing.

Keep the host's browser tab active. Disconnects, refreshing the page, or a server restart can end the session; reconnecting to an ongoing run is not supported.

## Major bosses

Regular bosses and champions appear between four fixed campaign milestones.

| Floor | Boss | What to expect |
|---|---|---|
| 3 | Boiler Heart | Radial barrages and delayed ground explosions |
| 6 | Ash Warden | Targeted stomps and furnace columns |
| 9 | The Silent Deep | Slow bullet curtains with gaps and paired warning columns |
| 12 | The Unravelled | Shifting attack forms and telegraphed teleport landings |

Major bosses enrage below half health. Outlined or dashed ground markers with countdowns warn of upcoming attacks; solid DANGER zones deal damage. Move out of the warning area before it activates.

## Completion marks and saved progress

Each courier has four permanent boss-mark slots beside their portrait: one for each major boss. A faint mark means incomplete; a filled mark means that courier has defeated the boss. There are 16 marks to collect across the four couriers.

Marks are recorded when the major boss is defeated, even if the run later ends in defeat. In co-op, each player's browser saves marks for their own courier after receiving the host's clear update. These marks track completion only; they do not currently unlock cosmetics or increase stats.

Progress is saved locally in your browser, not to an online account. Clearing site data, changing browser or device, or switching website addresses does not transfer your saves. If browser storage is blocked, marks last only for the current session.

Permanent stat upgrades and token rewards were removed in v0.5.1. Old upgrade data is ignored and does not affect starting health or damage. It is not deleted from browser storage. Courier completion marks, character selection, and settings keep their existing save keys; no account or cloud save is implemented.

## Brutal difficulty and random bosses

Starting lives are 3 for Rook, 2 for Frost, 2 for Hop, and 4 for Ember. These no longer receive permanent HQ bonuses. Completion marks remain saved; there is no difficulty selector or separate hard-mode mark sheet.

* Combat-room clears and advancing floors no longer heal you.
* Rook heals 1 life after a boss, not after normal combat rooms.
* Cafes restore 1 life on the first visit only.
* Enemy healing-drop chance is 8%, down from 40%.
* Warm snacks cost 12 coins and restore 1 life. Healing recipes restore 1 life rather than several.
* Co-op room-clear revives restore 1 life.
* Enemies have more health, faster movement or dashes, faster shooting, and more frequent champions. Later combat rooms can contain up to 10 enemies rather than being capped at six.

Nine regular boss families are shuffled between the fixed milestone floors. A campaign draws eight of the nine without repeats, so not every boss appears every run. Regular bosses, including the three newcomers below, never award completion marks. Only the four milestone bosses award marks.

| New regular boss | Attacks |
|---|---|
| Cleaver Crab | Twin staggered projectile fans and warning-marked ground strikes |
| Pickle Hydra | Three-headed spread volleys and alternating radial bursts |
| Pressure Chef | Warning-marked pressure columns, targeted circles, and aimed spreads |

The six existing regular bosses have increased health, faster projectiles and attack cycles, and additional warning-marked ground strikes. Champions can also appear among the new random bosses. Boss warnings remain visible before hazards activate.

## Update notes

### Version 0.5.3 — Multiplayer responsiveness

* Added local guest movement prediction and host acknowledgements/reconciliation.
* Added render-only smoothing and bounded projectile projection.
* Targeted 30 Hz state updates and compact current-room snapshots with periodic full recovery snapshots.
* Bounded network queues and validated movement command batches.
* Added simulated-latency and networking regression tests.
* Preserved mixed room sizes, damage indicators, completion marks and settings.

### Version 0.5.2 — Room-aware cameras and damage feedback

* Restored full-room fixed views for standard rooms. Only larger battles and major-boss arenas scroll.
* Mixed standard/large room sizes within each floor while preserving the fixed 6×6 map.
* Removed enemy and boss direction arrows.
* Added projectile damage numbers, lost-life indicators, and a brief local-player damage flash.
* Preserved independent co-op cameras, completion marks, settings, and pause behavior.
* Added room-size transition, hidden-marker, damage expiry, pause, and co-op feedback tests.
* Refresh both browsers after deployment; old/new clients cannot share this room-size protocol.
* Browser/mobile visual and balance testing remain outstanding.

### Version 0.5.1 — Pause, explore, repeat

* Replaced the small pause panel with a consistent pause overlay: Resume, Settings, How to Play, and confirmed Quit to Main Menu.
* Removed the starting HQ, permanent stat upgrades, token rewards, and token HUD. Courier selection starts solo runs immediately.
* Preserved courier boss completion marks and browser preferences; legacy prestige data is ignored.
* Fixed floor grids at 6×6 while keeping random branching room layouts.
* Doubled room width and height to 1520×880 world units and added a player-follow camera with boundary clamping.
* Added independent co-op cameras and survivor spectating for downed players.
* Increased ordinary combat-room cover to 8–12 crates while keeping the central cross and door lanes clear.
* Added edge direction markers for off-screen objectives, enemies, and partners.
* Added automated coverage for the new pause flow, removed-upgrade behavior, fixed grids, denser cover, and cameras.
* Refresh both clients after deploying. Browser/mobile visual and balance testing remain outstanding.

Older notes below describe the rules at their release dates; v0.5.2 changes above supersede earlier camera rules; v0.5.1 removed prestige rewards.

### Version 0.5.0 — Branching kitchens and locked loot

* Added randomized 6×6–12×12 floor grids with branching room layouts and empty spaces.
* Updated the minimap, discovery, room transitions, and co-op snapshots for variable map sizes.
* Added solid crate cover to ordinary combat rooms, with body and projectile collisions.
* Added coin-scattering chests that can be opened after combat.
* Added shared run keys, enemy key drops, a shop key, and a guaranteed starting-room key from floor 2 onward.
* Made chests and item-room entrances free on floor 1 and cost 1 key from floor 2 onward.
* Kept boss paths key-free and preserved opened chests, collected coins, and unlocked doors during revisits.
* Preserved courier stats, milestone completion marks, and permanent save keys from the previous update.
* Added regression tests for map connectivity, optional locks, chest rewards, key collection, cover, and larger co-op snapshots. Browser/device playtesting is still required.
* Both players should refresh after deployment to load the same client version. Existing live runs cannot migrate across a server restart.

### Version 0.4.0 — Brutal kitchen shift

* Reduced courier starting lives to 3/2/2/4 and sharply reduced free healing.
* Strengthened ordinary enemies and all six existing regular boss families.
* Added Cleaver Crab, Pickle Hydra, and Pressure Chef to the shuffled regular boss pool.
* Kept milestone floors and their completion marks unchanged.
* Preserved browser save keys and HQ upgrades. Deploy updates between runs; active multiplayer sessions disconnect on server restart.
* Added automated checks for healing limits, all nine regular bosses, mark exclusion, shuffled boss selection, enemy counts, and guest synchronization.
* This is a balance pass, not a browser-playtested difficulty guarantee. Human combat and mobile testing are still needed.


### Version 0.3.0 — Major bosses and completion marks

* Added a fixed 12-floor campaign in place of the endless floor loop.
* Added Boiler Heart, Ash Warden, The Silent Deep, and The Unravelled at milestone floors.
* Added warning-marked ground attacks, boss enrage phases, and telegraphed teleport landings.
* Added permanent completion marks for each courier, including separate co-op browser saves.
* Added the END SHIFT finish hatch after the final boss and a 5-token campaign completion bonus for the host.
* Added automated checks for boss attacks, hazard timing, campaign completion, and mark persistence.

### Version 0.2 — Courier selection

* Added four playable couriers with distinct starting stats and abilities.
* Added a character-selection sheet with portraits, stats, and ability descriptions.
* Added independent character selection for co-op players.
* Added a clearer ability HUD and character-specific combat behavior.

### Menu and usability improvements

* Added solo, hosting, joining, help, and settings screens.
* Added saved audio and touch-control preferences.
* Added team pause controls and confirmation before ending a run.
* Bundled game scripts into the delivered HTML so standalone solo play does not depend on sibling script files. Online co-op still requires the game server.

## Current limitations

* Two players per room; no public matchmaking, accounts, cloud saves, or mid-run reconnect.
* The host runs the combat simulation. This is friendly co-op, not a cheat-proof competitive game.
* Browser/mobile visual checks, Internet co-op testing, and combat balancing remain necessary. Automated checks do not replace playtesting.
* Optional accounts, cosmetic unlocks, and hard mode are ideas for future updates, not features of this release.

## Running or hosting the game

For local setup, Render deployment, and technical details, see [HOSTING.md](HOSTING.md).

## About this project

Kitchen Crawl Online uses original courier portraits and boss designs inspired by roguelike dungeon crawlers. It does not use The Binding of Isaac artwork, music, code, or characters. Delivery-brand-inspired outfits are unofficial; the game is not affiliated with Wolt, Deliveroo, or DoorDash. Brand references should be reviewed before public distribution.
