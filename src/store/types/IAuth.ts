export default interface IAuth {
  isLoggedIn: boolean;
  redirectToDiscord: () => void;
}
