import { auth } from "@/feature/Firebase";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

type AuthReturn = { user: User; token: string };

export class AuthProvider {
  private static GOOGLE_PROVIDER = new GoogleAuthProvider();
  private static GITHUB_PROVIDER = new GithubAuthProvider();

  public static async registerWithEmail(
    email: string,
    password: string
  ): Promise<AuthReturn | null> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      this.persistToken(token);
      await this.syncWithBackend(user, token);
      return { user, token };
    } catch (err) {
      console.error("Email signup error:", err);
      return null;
    }
  }

  public static async signInWithGoogle(): Promise<AuthReturn | null> {
    try {
      const result = await signInWithPopup(auth, this.GOOGLE_PROVIDER);
      const user = result.user;
      const token = await user.getIdToken();
      this.persistToken(token);
      await this.syncWithBackend(user, token);
      return { user, token };
    } catch (err) {
      console.error("Google sign-in error:", err);
      return null;
    }
  }

  public static async signInWithGitHub(): Promise<AuthReturn | null> {
    try {
      const result = await signInWithPopup(auth, this.GITHUB_PROVIDER);
      const user = result.user;
      const token = await user.getIdToken();
      this.persistToken(token);
      await this.syncWithBackend(user, token);
      return { user, token };
    } catch (err) {
      console.error("GitHub sign-in error:", err);
      return null;
    }
  }

  private static async syncWithBackend(user: User, token: string): Promise<void> {
    // Example: await fetch("/api/auth", { method: "POST", body: JSON.stringify({ user, token }) });
  }

  private static persistToken(token: string): void {
    localStorage.setItem("bricks:auth", token);
  }

  public static clearToken(): void {
    localStorage.removeItem("bricks:auth");
  }

  public static getToken(): string | null {
    return localStorage.getItem("bricks:auth");
  }
}
