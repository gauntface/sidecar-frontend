import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAdditionalUserInfo, getAuth, GithubAuthProvider, signInWithPopup, type Auth, type UserCredential, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

class SidecarsAuth extends EventTarget {
	private _user: User | null = null;
  private _app: FirebaseApp;
  private _auth: Auth;

  constructor() {
    super();
    this._app = initializeApp(firebaseConfig);
    this._auth = getAuth(this._app);

    onAuthStateChanged(this._auth, (user) => {
      this._user = user;
      this.dispatchEvent(new Event('user-change'));
    });
  }

	get user(): User | null {
		return this._user;
	}

	async signIn(): Promise<User> {
		const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(this._auth, provider);
    this._user = userCredential.user;
    await this.checkNewUser(userCredential);
    return this._user;
	}

	async signOut() {
		if (!this._user) {
			return;
		}

		await this._user.delete();
		this._user = null;
	}

  private async checkNewUser(uc: UserCredential) {
    if (!uc) {
      console.warn('No user credentials given.');
      return;
    }

    if (!window.beampipe) {
      console.warn('Unable to report user metrics to beampipe.');
      return;
    }

    const aui = getAdditionalUserInfo(uc);
    if (aui?.isNewUser) {
      window.beampipe('new-user');
    }
  }
}


export const auth = new SidecarsAuth();
