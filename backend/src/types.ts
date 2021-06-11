// The interface is going to represent and be the type for the data we want to store in the databse, we will use this to represent the users public information throughout the application

export interface IMongoDBUser {
  googleId?: string;
  twitterId?: string;
  githubId?: string;
  username: string;
  __v: number;
  _id: string;
}
