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




