<h1 align="center">
  <br>
  <img src="csus.png" alt="csus" width="200">
  <br>
  csus
  <br>
</h1>

<h4 align="center">A minimalistic, client-side URL shortener
</h4>

<p align="center">
  <img src="https://github.com/TheWilley/csus/actions/workflows/main.yml/badge.svg" alt="example workflow">
</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

## Introduction

**csus** is a fully client-side URL shortener, eliminating the need for any external server or database. This means:

- All shortened URLs are saved locally in your browser
- No information is transmitted over the internet or stored on remote servers
- Shortened URLs are not shareable across devices or users (unless you export/import them)
- Anyone with access to your browser can view and modify the shortened URLs

## How to use

Simply go to the [official webpage](https://thewilley.github.io/csus/) to get started, or run the app yourself by following these steps:

```bash
# Clone this repository
$ git clone https://github.com/TheWilley/csus

# Go into the repository
$ cd csus

# Install dependencies
$ npm install

# Run tests
$ npm run test

# Build app
$ npm run build

# If you want to start the app
$ npm run preview

# If you want to develop the app
$ npm run dev
```

## License

[MIT](https://github.com/TheWilley/csus/blob/main/LICENSE)
