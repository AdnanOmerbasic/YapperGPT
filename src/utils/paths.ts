// Navbar
export const homePath = () => '/';
export const signInPath = () => '/auth/sign-in';

// Sign Up
export const signUpPath = () => '/auth/sign-up';

// Sidebar
export const chatPath = (conversationId: string) => `/chat/${conversationId}`;

// Chat
export const chatListPath = () => '/chat';

// OAuth - Google
export const googleOAuth_RedirectURI = () =>
  `${process.env.GOOGLE_REDIRECT_URI_DEV ?? process.env.GOOGLE_REDIRECT_URI_PROD}`;
