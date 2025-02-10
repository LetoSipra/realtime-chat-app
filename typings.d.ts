interface Messages {
  id: string;
  text: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
    toDate: Function;
  };
  userImg: string;
  username: string;
}
