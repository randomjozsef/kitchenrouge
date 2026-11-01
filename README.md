# Kitchen Crawl Online

A kitchen-themed dungeon crawler for solo players and two-player online co-op. Choose a courier, battle through dangerous kitchens, collect recipes that change your attacks, and defeat four major bosses across a 12-floor campaign.

Current version: 0.3.0. This is a playable prototype; balancing and browser/device playtesting are still in progress.

## How to play

Explore each floor room by room. Defeat every enemy in a combat room to unlock its doors, collect coins and recipes, and look for the floor boss. After beating that boss, collect your rewards and use the blue hatch to descend.

Recipes improve your run with effects such as stronger shots, extra projectiles, and other attack modifiers. Visit shops and rest rooms, and weigh optional boss deals carefully: some cost maximum lives.

Defeat the final boss on floor 12, then use the END SHIFT hatch to finish the campaign and bank your rewards. There is no floor 13.

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
| Rook | 7 | Balanced and forgiving | Heals one extra life when a combat room is cleared |
| Frost | 6 | Fast-firing crowd control | Hits slow enemy movement by 35% for 1.2 seconds |
| Hop | 5 | Fast movement and evasive play | Double movement speed and damage immunity for 0.4 seconds; 5-second cooldown |
| Ember | 8 | Heavy damage, slower movement | Extra damage at 3 lives or fewer; active doubles firing rate for 3 seconds with a 12-second cooldown |

Hop cannot move through walls. Frost slows enemy movement, not enemy projectiles.

## Solo expedition

Choose Solo expedition, select your courier, then visit HQ to spend permanent tokens on upgrades before starting your run.

## Play with a friend

1. Both players open the same hosted game website.
2. Player 1 selects Host co-op, chooses a courier, and creates a room.
3. Player 1 shares the six-character room code privately.
4. Player 2 selects Join a friend, chooses a courier, and joins using the code.
5. Joining starts a fresh co-op run.

Each player has separate lives. If one player goes down, the survivor can revive them by clearing the combat room. If both players go down, the run ends.

Recipes, coins, and loot choices are shared. Either living player can move the team through unlocked doors or the next-floor hatch. Maximum-life deals affect both players. Damage taken by either player during a boss encounter prevents the flawless blessing.

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

In co-op, the host's HQ upgrades apply to the team. Permanent token rewards save to the host's browser only; guest token rewards and cloud saves are not implemented.

## Update notes

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
