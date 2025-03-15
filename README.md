# Welcome to Git Central! :computer:

## About

## Getting started :open_file_folder:

Fork and clone this repository to your local machine.

After moving into the cloned directory, run `npm i` to download the dependencies.

### Features :mega:
- User authentication and encryption (sign up, login, logout)
- Posting text, links, or images within subreddits
- Upvote system for posts and forums
- Comment threads with nested replies


Create a `.env` file in the root of the project:

```bash
touch .env
```

and add your MongoDB URI and a secret JWT string to it. Your MongoDB URI will look something like the first entry, but with your username and password:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@sei.azure.mongodb.net/myApp?retryWrites=true
JWT_SECRET=supersecret
```

Start the app in your terminal with:

``` sh
npm run dev
```
