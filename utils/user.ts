export const isUserLocalUser = (user: string | null, localUser: string | null) =>
  user && localUser && user.trim().toLowerCase() === localUser.trim().toLowerCase();
