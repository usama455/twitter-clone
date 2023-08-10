# Twitter Clone

A basic Twitter clone where users can tweet, follow each other, like, and retweet.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/usama455/twitter-clone.git
   ```
2 - Navigate to the server directory and install server dependencies:
   
  ```bash
  cd twitter-clone/server
  npm install
  ```
3 - Start the server:
  ```bash
  npm run dev
  ```
4 - In a separate terminal, navigate to the client directory and install client dependencies:

```bash
cd ../client
npm install
```

5 - npm run start
```bash
npm run start
```

The client will run on port 3000, and the server will run on port 8000. Make sure these ports are free. You can modify these port values in the respective environment files if needed.


## Usage

- Users can create tweets, follow other users, and view their timeline.
- Users can like and retweet tweets from other users.

## Technologies Used

- React
- Redux
- TypeScript
- Express.js
- Node.Js
- MongoDB
- Axios
- Tailwind css
- Material UI

## Specs
- Login / Signup User
- Home Page will display tweets and retweets of user and followers
- Explore People will have a list of all users and follow / unfollow button respectively
- Profile people will have followers and followed count and tweets and retweets of particular user
- in Navbar, Right bar is static and could be improved in further development
- User can post tweets upto 255 characthers
- User can like, unlike, retweet , undo retweet and delete (if own tweet)
- User can follow or unfollow any other user



## Project Screens
1 - Login 
<img width="1426" alt="Screenshot 2023-08-10 at 3 46 02 PM" src="https://github.com/usama455/twitter-clone/assets/82389871/d8ea336b-2d0b-4f58-ae25-cd0597f4ed97">

2 - Signup
<img width="1425" alt="Screenshot 2023-08-10 at 3 46 35 PM" src="https://github.com/usama455/twitter-clone/assets/82389871/436bfbec-d17a-400b-889d-5ef67c4f8622">

3 -  Home page
<img width="1346" alt="Screenshot 2023-08-10 at 3 47 40 PM" src="https://github.com/usama455/twitter-clone/assets/82389871/f5a02207-8fff-4563-b62d-dc84d59e473e">


4 - Explore Users Page
<img width="1418" alt="Screenshot 2023-08-10 at 3 48 07 PM" src="https://github.com/usama455/twitter-clone/assets/82389871/fe917e53-874a-44af-b81a-3ac54840399e">

5 - Profile Page
<img width="1283" alt="Screenshot 2023-08-10 at 3 48 41 PM" src="https://github.com/usama455/twitter-clone/assets/82389871/a636041c-8e23-4e66-a823-6c5271d8f404">

## Potential For Improvement

- Implement real-time updates using WebSockets for instant notifications on likes and retweets.
- Add a comments feature to allow users to comment on tweets and engage in discussions.
- Introduce the ability to quote tweets, allowing users to share and comment on others' tweets.
- Enhance user authentication and security measures.
- Forget and reset password implementation on frontend
- Email verification based on Nodemailer
- Improve the user interface and overall user experience.
- Implement responsive design to ensure a seamless experience on different devices.
- Explore additional features such as user mentions, hashtags, and trending topics.
- Optimize database queries and performance for scalability.
- Add unit and integration tests to ensure robust functionality.
- Provide user settings and customization options.

