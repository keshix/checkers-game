# Checkers Game

<img align="center" src="assets/tech-stack.png" alt="tech stack" width="500"/>

This is a classic checkers game, running on [Phaser 3](https://github.com/photonstorm/phaser).

I used [TypeScript](https://www.typescriptlang.org/) and [Rollup](https://rollupjs.org) with ⚡️ lightning fast HMR through [Vite](https://vitejs.dev/).

<img align="center" src="assets/screenshot.png" alt="screenshot" width="500"/>

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Builds project and open web server, watching for changes |
| `npm run build` | Builds code bundle with production settings  |
| `npm run serve` | Run a web server to serve built code bundle |

## Development

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run dev` and navigate to <http://localhost:3000>.

## Production

After running `npm run build`, the files you need for production will be on the `dist` folder.
To test code on your `dist` folder, run `npm run serve` and navigate to <http://localhost:5000>

## Run the tests

All Jest unit tests can be run with `npm run test`.

## Playing the game

Click on a checker piece to select it. Afterwards click on a free field to move there or jump
over an opponents piece.

You can do single and double jumps.

When you reach the opposite border you get a king piece which then can also move backwards.

_Tradeoff: Due to complexity a king piece currently can't move longer distances than a normal piece._

You win when your opponent has no pieces anymore. 🏆
