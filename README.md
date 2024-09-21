<h1 align="center">
  <br>
  <img src="csus.png" alt="FruityDancitor" width="200">
  <br>
  csus
  <br>
</h1>

<h4 align="center">A client-side Url Shortener built with localForage and React.
</h4>

<p align="center" style="color: yellow;">
  ⚠️ <strong>Do not use in production, currently under development</strong> ⚠️
</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

## Introduction

csus is a fully client-side URL shortener, eliminating the need for any external server or database. Instead, it leverages IndexedDB, a browser-based storage solution, to store and retrieve data. This means all shortened URLs are saved locally in your browser, meaning that no information is transmitted over the internet or stored on remote servers, enhancing privacy and security.

However, this approach comes with the limitation that shortened URLs are not shareable across devices or users. Since the data is kept within your browser's storage, only you can access and use the shortened links on that specific browser and device. This trade-off results in a highly private URL shortening experience, where your data remains entirely under your control, but at the cost of portability.

csus is ideal for personal use cases where privacy is a priority, and link sharing isn't necessary. It also provides the convenience of quick access to frequently used URLs without exposing them to third-party services.

## How to use

Simply go to the [official webpage](https://thewilley.github.io/csus/) to get started, or run the app yourself by following these steps:

```bash
# Clone this repository
$ git clone https://github.com/TheWilley/csus

# Go into the repository
$ cd csus

# Install dependencies
$ npm install

# Build app
$ npm run build

# If you want to start the app
$ npm run preview

# If you want to develop the app
$ npm run dev
```

## License

[MIT](https://github.com/TheWilley/csus/blob/main/LICENSE)
