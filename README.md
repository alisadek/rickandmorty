## Introduction

- This is a React client application built using Typescript to search and view characters in Rick and Morty TV Show.
- It consumes the [Rick and Morty API](https://rickandmortyapi.com/graphql)

> You can view a live demo [here](https://rickandmorty-brown-nine.vercel.app/)

## Installation in Dev Mode

- Download package
- Go to project directory
- Copy `.env.example` and create a `.env` file with values in `.env.example` filled
- Run `yarn` to install dependencies
- Run `yarn start` to start app on [http://localhost:3000](http://localhost:3000)
- Go to [http://localhost:3000](http://localhost:3000) to view app.

## Features

- Search Rick and Morty characters.
- Filter characters.
- View characters that appeared in a specific episode.
- View characters by last known location.

## Technical Details

- Initialized using Create-React-App
- **Data Fetching**: Apollo Client for data fetching and state management
- **UI:** Material UI.
- Lazy Loading.
