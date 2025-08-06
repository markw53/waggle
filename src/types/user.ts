export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  isSiteAdmin?: boolean; // If you use custom claims later
}