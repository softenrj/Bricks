// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { auth } from "@/feature/Firebase";
import { ApiResponse } from "@/types/Api";
import { API_BRICKS_SIGN_IN } from "@/utils/api/APIConstant";
import { postApi } from "@/utils/api/common";
import Cookie from "js-cookie";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  User,
} from "firebase/auth";
import toast from "react-hot-toast";

export enum AuthType {
    EMAIL_PASS = "EMAIL",
    GOOGLE = "GOOGLE",
    GITHUB = "GITHUB"
}

type AuthReturn = { user: User; token: string };

export class AuthProvider {
  private static GOOGLE_PROVIDER = new GoogleAuthProvider();
  private static GITHUB_PROVIDER = new GithubAuthProvider();

  public static async registerWithEmail(
    email: string,
    password: string,
    username: string
  ): Promise<AuthReturn | null> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      this.persistToken(token);
      await this.syncWithBackend(user, token, username, email, AuthType.EMAIL_PASS);
      toast.success("Registered successfully! 🎊");
      return { user, token };
    } catch (err) {
      console.error("Email signup error:", err);
      toast.error("Registration failed 😞");
      return null;
    }
  }

  public static async loginWithEmail(
    email: string,
    password: string
  ): Promise<AuthReturn | null> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      this.persistToken(token);
      toast.success("Welcome back! You are logged in 🎉");
      return { user, token }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed 😞");
      return null;
    }
  }

  public static async signInWithGoogle(): Promise<void> {
    try {
      const { user } = await signInWithPopup(auth, this.GOOGLE_PROVIDER);
      const token = await user.getIdToken();
      this.persistToken(token);
      this.syncWithBackendMethod(user,token,AuthType.GOOGLE)
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Google sign-in failed 😞");
    }
  }

  public static async signInWithGitHub(): Promise<void> {
    try {
      const result = await signInWithPopup(auth, this.GITHUB_PROVIDER);
      const user = result.user;
      const token = await user.getIdToken();
      this.persistToken(token);
      this.syncWithBackendMethod(user,token,AuthType.GITHUB)
    } catch (err) {
      console.error("GitHub sign-in error:", err);
      toast.error("GitHub login failed 😞");
    }
  }

  private static async syncWithBackend(
    user: User,
    token: string,
    username?: string | null,
    email?: string | null,
    authType?: AuthType
  ): Promise<void> {
    try {
      const response = await postApi<ApiResponse<any>>({
        url: API_BRICKS_SIGN_IN,
        values: { email: email!, username: username!, firebaseId: user.uid, token, authType },
      });

      if (response?.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Sync backend error:", error);
      toast.error("Please try again later 😞");
    }
  }

  private static async syncWithBackendMethod(
    user: User,
    token: string,
    authType: AuthType
  ): Promise<void> {
    try {
      const username = user.displayName;
      const email = user.email;
      const profile = user.photoURL || "";
      const response = await postApi<ApiResponse<any>>({
        url: API_BRICKS_SIGN_IN,
        values: { email: email!, username: username!, profile: profile, firebaseId: user.uid, token, authType },
      });

      if (response?.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Sync backend error:", error);
      toast.error("Please try again later 😞");
    }
  }

  private static persistToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem("bricks:auth", token);
    }
  }

  public static clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("bricks:auth");
    }
  }

  public static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("bricks:auth");
  }

  public static logOut(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem("bricks:auth");
    auth.signOut();
    window.location.href = "/";
  }
}
