# Welnes Video Platform

Welnes Video Platform is a web application that enables you upload, display, and play videos. you can test the application [here](https://welnes-video-platform.vercel.app/)

## Run locally

- Just clone the repo.
- Run `npm install` followed by `npm start`.
- Visit `localhost:3000` to see this beauty!

## Technologies used

- React `^17.0.2`
- Redux `^4.1.2`
- TypeScript `^4.1.2`
- Firebase SDK `^9.4.1`
- Bootstrao `^5.1.3`

## Project folders

- `components` contains all the UI components needed by the app.
- `firbase` contains firebase configutaion and operations.
- `redux` contains redux slices and store.
- `styles` contains all css and scss files.
- `helpers.ts` implements several functions as helpers for the main components.

## Execution flow

- User selects a video or captures it via webcam
- A screenshot is taken to be saved as this video thumbnail.
- User uploads the video
- Both the video and the thumbnail are uploaded and saved in the Firebase Storage.
- Both URLs for the video and the thumbnail are stored as a new document in the Firebase Firestore database.
- The videos redux stored will be updated with the new video.
- The video will be displayed with it's thumbnail in the videos list.

## Challenges

The only challenge for me was using the Canvas API, it was the first time using it. I struggled a bit with it but eventually, every thing worked as expected.

## Potential improvements

- Add pagination.
- Display more info about the videos (date created, description, etc...).
- Open videos in a new tab.
- Add user account.
- Add unit and integration testing.
