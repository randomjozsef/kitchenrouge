# Kitchen Crawl Online

A kitchen-themed dungeon crawler for solo players and two-player online co-op. Choose a courier, battle through dangerous kitchens, collect recipes that change your attacks, and defeat four campaign major bosses across 12 floors, with two additional optional endgame bosses.

Current version: 0.11.0. This is a playable prototype; balancing and browser/device playtesting are still in progress.

## How to play

Explore each floor room by room. Defeat every enemy in a combat room to unlock its doors, collect coins and recipes, and look for the floor boss. After beating that boss, collect your rewards and use the blue hatch to descend.

Recipes improve your run with effects such as stronger shots, extra projectiles, and other attack modifiers. Visit shops and rest rooms, and weigh optional boss deals carefully: some cost maximum lives.

Defeat the final boss on floor 12, then use the END SHIFT hatch to finish the campaign and finish your run. There is no floor 13.

## Random maps, cover, chests, and keys

Each floor uses a fixed 6×6 grid. Random branching layouts occupy about 12–18 rooms, occasionally one more to keep the item room optional, leaving empty spaces. Connected routes, optional loops, and a boss dead end make each floor different. The minimap uses compact room letters.

Standard rooms measure 760×440 world units and remain entirely visible with a fixed camera. Each floor also includes larger 1520×880 combat rooms; the four major-boss arenas are large too. Only larger rooms follow your courier, stopping at room boundaries. In co-op, each browser follows its own player in large rooms; a downed player watches the survivor. Off-screen arrows may point to doors, partners, loot, exits, and attack hazards, but NEVER enemies or bosses. Ground attack warnings remain visible. Standard rooms have no edge arrows.

Standard combat rooms contain 4–6 solid crates; large combat rooms contain 8–12, with proportionally larger crates. Use them to hide from incoming shots, but remember that they also block your shots and movement, including Hop's dash. Enemies collide with cover too. Cover does not protect against warning-marked ground attacks. Boss rooms stay open without crates, keeping their attack patterns readable.

Walk near a chest after clearing its room to open it. It scatters 2–4 coins, which you collect by walking over them. An opened chest stays empty when you revisit the room.

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

Coins, keys, rooms, and pedestal choices are shared. Recipes and upgrades belong only to the courier who collects them. Each browser shows its own courier’s recipe inventory. Either living player can move the team through unlocked doors or the next-floor hatch. Maximum-life deals charge only their collector and must leave that courier at least 2 maximum lives. Damage taken by either player during a boss encounter prevents the flawless blessing.

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

Each courier has four permanent boss-mark slots beside their portrait: one for each major boss. A faint mark means incomplete; a filled mark means that courier has defeated the boss. There are 32 marks to collect across the eight couriers.

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

Twelve regular boss families are shuffled between the fixed milestone floors. A campaign draws eight of the twelve without repeats, so not every boss appears every run. Regular bosses never award completion marks. The four campaign milestones and two optional endgame bosses award their existing marks. See v0.10.0 below for the expanded roster.

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


## Private co-op inventories — v0.5.4

* Each courier has independent damage, fire rate, movement, extra shots, piercing, burning, ricochets, maximum lives, and recipe history. Shared coins pay for the collecting courier’s purchases; keys remain shared.
* Pedestals are still a shared, one-time choice, not duplicated loot: agree who should collect a recipe. If both couriers overlap it, the nearest collects it; exact ties favor P1. Downed players cannot collect.
* Maximum-life deals charge only the collector. Health upgrades and shop meals heal only the collector; dropped health heals one nearby injured courier. Cafe meals still restore 1 life to each living player on first visit.
* Piercing, burning, ricochet, and spread caps are checked per courier. Already-capped items cannot be collected by that courier; their partner can still take them. Each shot retains the effects it had when fired.
* New runs reset both inventories. Boss completion marks remain saved. Inventory changes are host-authoritative and travel in full and compact snapshots, including guest movement-speed upgrades used by prediction.
* That release used network protocol 3 (superseded by protocol 4 in v0.6.0). Refresh both browsers together; old clients are rejected rather than silently applying shared-upgrade rules.
* Automated checks cover ownership for all 14 recipe/deal types, shared shop payments, personal healing and life costs, guest HUD and snapshot stats, shot effects, caps, and resets. Browser visual/play testing has not been performed.


## Scarcity and twenty new items — v0.6.0

### Scarcer shared coins

* Start with **3 coins**, down from 20.
* Combat-room clear: **3 coins**, down from 15.
* Boss clear: **8 extra coins** (11 including room reward), down from 25 extra. Champion bosses add 4 more, down from 15.
* Kills have a **20% chance to award 1 coin**, replacing the guaranteed 3. Burning kills use the same rule. Boss burn deaths still receive their room-clear reward.
* Chests scatter **2–4 coins**, down from 5–9. Keys still cost 10 and meals 12.
* Shop recipes cost **20 / 24 / 30 / 40** for common / uncommon / rare / legendary. Free treasure recipes and boss rewards remain available, so progress does not depend on affording a shop purchase.

### Twenty new recipes (28 pedestal items total, plus the 6 existing deal items)

| Item | Rarity | Effect |
|---|---|---|
| Compass seasoning | rare | Fries steer toward enemies in line of sight within 320 units. |
| Popcorn core | legendary | Hits explode in an 80-unit radius for 70% fry damage. No friendly fire. |
| Caramel charges | rare | Hits attach a charge: after 0.8s it bursts for 80% damage in 60 units. Up to 4 per enemy. |
| Pickled venom | uncommon | Hits poison enemies for 3 seconds, dealing 1 damage per second. |
| Static salt | rare | Hits arc to one other enemy within 130 units for 50% damage. Cover blocks arcs. |
| Crumb splitter | rare | A hit releases two short-lived crumbs dealing 40% fry damage. Crumbs cannot split again. |
| Heavy cut | common | Hits push ordinary enemies 18 units; bosses resist. |
| Lucky sesame | uncommon | Each fry has a 15% chance to deal double damage. |
| Last bite | rare | Deal 50% more damage to enemies below 25% health. |
| Icebox glaze | uncommon | Your fries slow enemies by 35% for 1.2 seconds. |
| Long delivery | common | Fries last 40% longer. |
| Express oil | common | Fries travel 25% faster. |
| Thick cut | common | Fries have a larger hitbox. |
| Double dip | rare | Add two angled fries, respecting the six-extra-fries cap. |
| Back-order | uncommon | Also fire one fry backwards. |
| Cross-cut | rare | Also fire two fries at 45-degree angles. |
| Foil wrapper | rare | Block one hit each combat room. Recharges when entering a new uncleared combat room. |
| Midnight snack | legendary | Your direct or secondary-hit kills have a 12% chance to heal you 1 life. |
| Garlic crunch | common | Add 0.5 damage per fry. |
| Kitchen timer | common | Shoot 15% faster. |

Offers use weighted sampling without replacement: each eligible common item has weight 10, uncommon 4, rare 1, legendary 0.25. These are **per-item weights**, not fixed category percentages; odds change as eligible items are removed. Treasure rooms, shops, and boss recipe rewards use this pool. Existing spicy deals/blessings keep their own pools. Most new special effects are unique per courier; Garlic crunch and Kitchen timer stack, and Double dip can stack to the existing spread cap.

All new effects remain personal. Coins and keys stay shared. Homing and arcs respect cover; blasts respect cover and cannot hurt either player. Sticky charges attach to an enemy, cap at 4, and disappear when a killed ordinary enemy is removed; they are not persistent floor bombs. Poison refreshes rather than stacking damage. Foil shields show a ring and do not recharge by revisiting cleared rooms. Split crumbs cannot spawn more crumbs or inherit recursive explosions/arcs. Vampiric healing is credited by player slot, not courier name, so two players can choose the same character safely; ongoing burn/poison kills do not trigger it. Active projectiles are capped at 180.

Rarity labels and individual symbols appear on pedestals. Homing, explosive, and sticky shots have distinct treatments; sticky enemies show a countdown, blasts show a radius, arcs show their link. All status, projectile, inventory, shield, and coin state is host-authoritative and synchronized in full/compact snapshots. New runs reset the effects; existing boss marks are unchanged.

**v0.6.0 used protocol 4 (superseded by protocol 5 in v0.7.0):** update the full project, refresh both browsers, and start a new room. Mixed client versions are not supported. Automated tests cover the economy, rarity selection, effects, personal ownership, synchronization, and bundled-page startup. Real browser visuals, combat feel, and final difficulty balance still require playtesting. The real WebSocket integration check requires installing the project dependency.


## Four new couriers and ten combination items — v0.7.0

In v0.7.0, all **8 couriers** were available without unlocks; v0.11.0 replaces that with the challenge system documented below. There are now **38 ordinary pedestal items**, plus the 6 existing deal items. Private inventories, shared coins/keys, scarce money, campaign milestones, and existing save keys are unchanged.

### New couriers

| Courier | Role | Lives | Damage / move / fire multipliers | Passive | Active |
|---|---|---|---|---|---|
| Bastion | Tank | 5 | 0.80 / 0.80 / 0.85 | Ordinary enemies are knocked back by fries | Brace: damage immunity for 1 second, 12-second cooldown. Cannot pass through walls. |
| Vex | Trickster | 2 | 1.00 / 1.20 / 1.00 | 15% critical chance; Lucky sesame raises it to 30% | False delivery: a stationary 3-second decoy attracts nearby enemy aim, 10-second cooldown. |
| Fuse | Explosive specialist | 3 | 0.90 / 0.90 / 0.85 | Every fourth firing volley has explosive hits | Pressure burst: 150-unit radius, damage 8 + 0.8 per floor, 14-second cooldown. |
| Sage | Support | 3 | 0.80 / 1.00 / 1.00 | Receives 1 additional life from healing, capped at maximum | Packed provisions: once per floor, heal each living courier 1 life (Sage receives 2). No revive. |

All four have original portraits, on-arena identifiers, independent abilities, and individual completion sheets. The save reader adds the new couriers while preserving previous courier marks; total mark slots are now 32. Both co-op players can select any courier, including identical ones. The server allowlist accepts all eight IDs.

Decoys do not absorb projectiles or block movement. They affect nearest-target enemy aim, disappear at room changes, and freeze with combat on pause. Fuse explosions and the active burst respect cover and never hurt either player. Fuse's fourth-volley effect does not multiply an existing Popcorn core explosion. Sage cannot spend provisions when everyone living is full, cannot revive downed players, and cannot carry unused charges into a later floor. Sage's passive applies to meals, cafes, recipe healing and vampiric healing, but not room-clear revives or Emergency ration.

### Ten new items

| Item | Rarity | Effect |
|---|---|---|
| Return receipt | uncommon | Fries turn back toward their firing courier after 0.45s. Each fry can hit each enemy once. |
| Serrated skewer | uncommon | Hits cause 2 seconds of bleeding at 1.5 damage per second; refreshes, does not stack. |
| Overtime stamp | rare | Every sixth firing volley deals 75% more damage. |
| Magnetic pouch | common | Pull loose coins and keys toward you from 140 units. Cover still blocks them. |
| Fermentation jar | rare | Your direct hits that kill poisoned enemies burst for 2 damage in 85 units. Bursts cannot chain. |
| Thermal sauce | rare | Your hits deal 35% more damage to already chilled enemies. Combines with Frost and Icebox glaze. |
| Charge card | rare | Every eighth direct fry hit arcs for 3 damage to a nearby enemy within 180 units. Cover blocks arcs. |
| Spiked takeaway | uncommon | When you lose a life, retaliate for 3 damage within 90 units. No friendly fire. |
| Emergency ration | legendary | Once per run, a fatal hit leaves you at 1 life instead. Does not trigger on maximum-life deals. |
| Lunchbox drone | legendary | During combat, fire a small homing fry at a visible enemy every 1.5 seconds for half your fry damage. |

All ten are unique per courier and use the existing weighted rarity pool and rarity-based shop prices. Suggested combinations: Thermal sauce with Frost/Icebox glaze; Fermentation jar with Pickled venom; Overtime stamp with Fuse's fourth volleys; Return receipt with piercing/homing. Returning fries switch from enemy homing to owner tracking after 0.45 seconds, never reset their per-enemy hit history, and still expire normally. Bleed refreshes rather than stacking. Fermentation bursts and capacitor arcs are secondary hits and cannot trigger recursive item procs. Capacitor counts the owner's direct item-bearing fry hits; its charge resets at eight even if no secondary target is available. Drone fries have no recursively inherited item procs and respect the projectile cap. Emergency ration is spent once per run, cannot prevent maximum-life deal costs, and still counts as taking boss damage. Thorn retaliation cannot hurt teammates.

**Network protocol 5:** deploy the complete project including the updated lobby server, refresh both players, and create a fresh room. Older clients are not compatible. No deployment has been performed. Browser visual/play testing and difficulty balancing remain outstanding; automated tests exercise the bundled HTML, new couriers, abilities, personal items, combat combinations, simulated co-op, and existing save migration.


## Viewport UI — v0.8.0

* The run now fills the browser viewport instead of sitting inside a boxed page, with a compact HUD, minimap dock, boss bar, loot readout, and ability control.
* Canvas scaling preserves the 760×440 camera aspect ratio. Standard rooms remain fully visible; large rooms still follow the local courier.
* HUD and controls adapt to narrow and short windows. Touch pads overlay the arena in short landscape windows. Long menus scroll internally instead of extending the page.
* Press **I** or choose **Inventory** to pause and browse your own recipes, four per page. In co-op, opening inventory requests the shared host-authoritative pause.
* The desktop **Fullscreen** button uses the browser fullscreen API when supported. If unavailable, open the game in its own tab and use browser fullscreen.
* Network protocol remains **5**; no gameplay or wire-format changes are introduced by this UI update. Refresh both browsers after updating.

Automated regression checks cover viewport-fit calculations, solo inventory pagination and navigation, guest inventory pause synchronization, bundled-page startup, and existing gameplay. Real-browser visual QA remains outstanding.


## Secret endgame and model refresh — v0.9.0

### The Last Call — timed route

Defeat the floor-9 boss **before 25:00 active run time**. A gold gate appears beside the normal blue hatch. The timer is visible in the HUD and stops during pauses, including inventory browsing. Once earned, the gate stays open: taking time to choose rewards will not close it.

Entering is optional and one-way. The Last Call is an original mechanical closing-bell boss with gapped bullet rings, warned shutter columns, and stamped ground attacks. It becomes faster below half health. Its arena is large and keeps the follow camera.

Defeating it guarantees a violet Banquet rift. You may instead use its normal blue hatch to continue to floor 10. The timed arena does not replace or remove the normal floor-9 boss.

### The Endless Banquet — chance-based final route

A violet rift has a **25% chance** to appear after the floor-12 boss. The roll happens once when the room is cleared: revisiting cannot reroll it. Defeating The Last Call guarantees this rift instead of rolling.

A violet rift is a **one-way optional final route**. The Endless Banquet cycles three original masks with rotating volleys, aimed fans and stamped plates, and a clearly warned teleport landing. Defeat it and use the blue END SHIFT hatch to win the run—even if you entered from the floor-9 timed route. You cannot return to the previous floor after entering either optional arena.

Either co-op player may enter a gate for the team. Arena entry, portal rolls, attacks, rewards, and completion marks remain host-authoritative. Each optional boss adds its own browser-saved, courier-specific completion mark; existing four-boss marks are preserved. There are now six marks per courier. No permanent stat upgrades are added.

### Enemies and props

* Original donut, burger, and pizza enemies remain, with shadows, feet, sprinkles, sesame/lettuce details, or crust/topping details.
* **Pepper Mortar** joins from floor 3: marks a courier's position before an area strike.
* **Pretzel Skirmisher** joins from floor 5: moves across your approach while firing a three-shot fan.
* **Tin Sentry** joins from floor 7: fires a tight triple volley, with a short aim-line warning.
* New types can become champions. Existing enemy types remain in the roster on later floors.
* Crates have reinforced braces, metal bands, shadows and corner details; some are rendered as vented kitchen equipment. Their collision boxes and shot-blocking behavior are unchanged.
* Chests have curved lids, bands, locks, shadows and a distinct open state. Opening rules, key costs, and coin drops are unchanged.

**Network protocol 6:** update the full project, refresh both browsers, and create a new room. Mixed old/new clients are not supported. No deployment has been performed.

Validation: automated tests cover timer boundaries, pause behavior, one-time chance boundaries, guaranteed rifts, optional endings and continuing to floor 10, both bosses' attacks and teleport warnings, gradual enemy unlocks, model drawing paths, simulated guest-triggered arena transitions, mark persistence, and prior gameplay. Browser visual/playtesting and endgame balance testing remain outstanding. The real HTTP/WebSocket integration test requires the project's dependency and is skipped when it is not installed.


## Six new synergy recipes — v0.9.1

The ordinary pedestal/shop recipe pool now contains **44 items** (plus the six existing boss-deal recipes). The six additions are non-stackable per courier, use the normal rarity-weighted offers, and cost 24 coins for uncommon or 30 for rare in shops. Existing items and saves are preserved.

| Item | Standalone effect | Example combination |
| --- | --- | --- |
| Steam sachet · Rare | Direct fries slow enemies for 1.2 seconds. | Chili drizzle / Inferno sauce, or a target already burning: a 70-unit steam pulse deals 50% hit damage and slows. At most one pulse per 0.6 seconds per firing courier. Cover blocks the pulse; no friendly fire. |
| Brine battery · Rare | Every fourth direct fry hit arcs to another visible enemy within 160 units for 1 damage. Charge is spent even without another target. | Pickled venom / already-poisoned target: arc damage becomes 2. Static salt produces its separate normal arc as well. |
| Glaze relay · Rare | Direct fries bleed for 1 second. Serrated skewer keeps its longer 2-second bleed. | Your fry arcs, fry explosions, and sticky bursts carry your slow, poison and bleed flags. Works with Frost, Steam sachet, Static salt, Charge card, Brine battery, Popcorn core, Fuse's fourth volley, and Caramel charges as applicable. It does not upgrade active-ability blasts. |
| Wallflower seasoning · Uncommon | Fries bounce once and gain 25% damage on each bounce. | Rubber fries grants a second bounce. Compass seasoning, Return receipt, and other projectile effects remain on the bouncing fry. |
| Prism wrapper · Rare | Every fifth firing volley is prismatic. Each prismatic fry's first hit releases three shards dealing 35% hit damage. | Shards inherit Compass seasoning's homing and Skewer fries' piercing. Crumb splitter adds its two normal crumbs for five secondary projectiles. Glaze relay can carry statuses onto the prism shards. |
| Marinade dust · Uncommon | Direct hits add seasoning lasting 4 seconds, up to 3 stacks. Each existing stack adds 0.15 damage to that courier's next direct hit. | Enemies already poisoned or bleeding gain 2 stacks instead of 1. Combines with Pickled venom, Serrated skewer, or Glaze relay. Each courier has separate stacks. |

### Visible effects and rules

New recipes have distinct pedestal icons, steam rings, lightning bolts, prism-shaped shot outlines and shard flashes, ricochet sparks, and visible seasoning dots. Inventory browsing shows the combinations currently active on **your** courier; the HUD also shows an active-synergy count. A listed synergy does not mean every shot triggers it: each recipe's description gives its own cooldown or volley/hit count.

Secondary hits cannot recursively trigger on-hit effects, more shards, charges, or arcs. Prism shards count toward the existing 180-friendly-projectile cap, and new visual effect emission is capped. Slow, poison, and bleed refresh rather than stack. A projectile snapshots its effect flags at firing time; later pickups are not retroactive. All damage, cooldowns, charges and stacks are host-authoritative in co-op. Item ownership, battery charge, steam cooldown and seasoning bonuses remain personal; enemies' burn, bleed and poison can enable team combinations. Items and counters reset on a new run.

**Snapshot protocol 7:** deploy the complete update, refresh both players' browsers, and create a fresh co-op room. Mixed client versions are unsupported. No deployment has been performed.

Validation: **102 automated tests passed; 1 dependency-based HTTP/WebSocket integration test skipped**. Tests cover precise damage, cooldowns, cover, personal ownership and resets, relay propagation, non-recursion, actual-update bounce limits, shard and effect limits, snapshots, inventory markup, and existing gameplay. Real-browser visual checks and balance playtesting remain outstanding.


## Boss arsenal expansion — v0.10.0

Three new regular bosses bring the total roster to **18**: twelve regular families, four fixed campaign milestones and two optional endgame bosses. All previous bosses and saved completion marks remain available. No new permanent-stat rewards or completion marks are introduced. The campaign is still twelve floors; it draws eight of the twelve regular families without repeats.

### New bosses

- **Waffle Iron Duke:** alternates vertical and horizontal iron-press bars with a missing lane. Read the dashed waffle grid, then move out of the bars before the press lands.
- **Tempura Tempest:** locks a triangular batter-fan area before releasing a scalding spray. Alternates in aimed projectile fans; at half health, two spread-out batter cones replace the single cone.
- **Neon Noodle:** lashes three locked noodle lanes, alternating with aimed noodle volleys. At half health, its special gains a fourth lane.

Each has its own drawn model, uses ordinary boss HP and champion scaling, and enrages into faster cycles without reducing the special's warning time. Normal specials warn for 1.2–1.3 seconds. Finite lane ends and triangular cone corners are real geometry, not invisible circular approximations. Warning positions and angles lock when created and do not chase players.

### Existing-boss signature attacks

Every existing boss gains the following extra special on every third attack cycle, alongside its previous patterns. HP is not increased by this update.

| Boss | Added signature special |
| --- | --- |
| Donut Overlord | Sugar scissors: two sprinkle lanes with a gap. |
| Burger Baron | Grill press: a triangular heated grill zone. |
| Pizza Supreme | Cheese cutter: one broad slicing lane. |
| Sushi Shogun | Cross-cut: three narrow cleaver lanes. |
| Gelato Giant | Deep freeze: five radiating ice-fracture lanes. |
| Espresso Emperor | Scalding pour: a coffee cone. |
| Boiler Heart | Boiler rupture: twin pressure jets. |
| Ash Warden | Furnace breath: a broad flame cone. |
| The Silent Deep | Undertow: two opposing tidal arms. |
| The Unravelled | Unravelling seams: four rift lanes. |
| Cleaver Crab | Twin chop: two diverging cleaver lanes. |
| Pickle Hydra | Brine breath: three spread-out cones. |
| Pressure Chef | Valve failure: a broad steam jet. |
| The Last Call | Final chime: two long bell rays. |
| The Endless Banquet | Table service: three hunger wedges. |

### Effects and readability

Boss projectiles now use themed blade, shard, noodle, pickle, batter and other silhouettes rather than identical red circles. Ground attacks retain accurate dashed gold countdown outlines while warning and solid danger outlines when active, with clipped interior effects such as animated flame tongues, ice cracks, flowing steam/noodles, rift seams, grill grids and pressure pulses. Decorative animation cannot extend the damage area. Existing circular attacks keep their honest circular boundaries but gain themed interior effects; not every previous attack was converted into a lane or cone.

Reduced Motion keeps these internal patterns stationary. Pause freezes warnings and active hazards. Existing invulnerability protects against overlapping attacks. Room clears remove boss projectiles and hazards. The existing caps remain **32 hazards** and **420 hostile projectiles**.

**Network protocol 8:** damage and attack creation remain host-authoritative; exact shape geometry, style and projectile skins travel in normal snapshots. Deploy the complete project, refresh both co-op browsers, and start a fresh room. Protocol-7 clients are rejected rather than misrendering the new hazards. No deployment has been performed.

Validation: **113 automated tests passed; 1 dependency-based HTTP/WebSocket integration test skipped.** Tests include all eighteen attack/render paths, all fifteen old-boss specials, warning safety, lane/cone geometry, locked aim, pause, guest-only damage, snapshot fidelity, old-protocol rejection, hazard/projectile caps, campaign selection and prior regressions. Real-browser visual checks and balance playtesting remain outstanding.


## v0.11.0 — themed floors and courier challenges

Eight floor biomes now have distinct palettes, floor patterns, wall accents, obstacle shapes and obstacle artwork. They rotate in order across the existing 12-floor campaign:

1. City Kitchen — tiled floors and delivery crates.
2. Sushi Station — wood boards and sushi counters.
3. Frozen Pantry — frosted floors and freezer cabinets.
4. Midnight Diner — checkerboard floors and diner booths.
5. Spice Market — woven-rug patterns and spice racks.
6. Royal Food Court — diamond floors and crowned plinths.
7. Boiler Works — pipework floors and boiler tanks.
8. Neon Rooftops — ventilation panels and rooftop vents.

These are solid cover, not decorative-only props: existing body/projectile collision applies. Standard combat rooms have 4–6 pieces; large rooms have 8–12. Central crossing lanes and entrances remain open. Optional boss arenas inherit their originating floor biome. Boss rooms remain clear of solid cover.

### Start with Rook; unlock the other seven

| Courier | Unlock challenge |
| --- | --- |
| Rook | Starter, available on first launch. |
| Frost | Defeat the floor 1 boss. |
| Hop | Clear 10 combat rooms across runs (boss rooms count). |
| Ember | Defeat Boiler Heart on floor 3. |
| Bastion | Defeat 5 bosses across runs. |
| Vex | Defeat a boss without either courier taking damage in that encounter. |
| Fuse | Personally collect 12 recipes across runs, including deal recipes. |
| Sage | Visit 3 unused cafe breaks while injured across runs. |

Locked couriers remain browsable with their kits and challenge progress, but cannot be chosen to start or join a run. Only unlocked selections are remembered. Each browser stores unlocks and cumulative challenge progress under `kitchen-crawl-unlocks-v1`. Progress saves during play, including runs that end in defeat or are abandoned. A new run resets its counters without resetting lifetime progress. Repeated snapshots do not count the same event twice.

In co-op, room/boss clears credit both couriers, recipes credit only the collector, and cafe credit requires that particular courier to be living and injured. Each browser saves only its own courier's progress after receiving host-authored counters. Cumulative run counters let a later snapshot recover missed events. The host cannot unlock characters for the guest's browser merely by already having them unlocked.

On first migration, existing major-boss completion marks provide evidence toward first-boss, Boiler Heart and boss-count challenges; unknown historical room, recipe, cafe and flawless counts are not invented. Completion marks remain intact. A completely fresh browser starts with Rook only. Clearing browser storage clears unlocks; unavailable storage means session-only progress and is reported in the selection screen. There are no accounts or cloud saves, and local saves are not anti-cheat protected.

**Snapshot protocol 9:** update the full project, refresh both browsers, and create a fresh co-op room. Older snapshots are refused by the receiving client. No deployment has been performed.

Validation covers first-launch locks, challenge thresholds, immediate unlocks, reloads, quitting, co-op credit ownership, missed snapshots, all eight biome render paths, clear crossing lanes/spawns, and appearance synchronization. Real-browser visual/playtesting and balance checks remain outstanding; the HTTP/WebSocket integration test requires the project dependency.

Final checks: `node --check public/game.js`, `node build.cjs`, and `node --test` succeeded: **120 passed, 1 dependency-based integration test skipped, 0 failures**.
