import { getAdditionalUserInfo, getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User, type UserCredential } from "firebase/auth";
import { app } from "../firebase/client";

const auth = getAuth(app);

let user: User | null = null;
onAuthStateChanged(auth, (u) => {
	user = u;
});

export function getUser() {
	return user;
}

export async function signInUser(url?: string) {
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);
  checkNewUser(result);
  if (url) {
    window.location.assign(url);
  }
}

export async function signOutUser() {
  await signOut(auth);
	window.location.assign('/');
}

async function checkNewUser(uc: UserCredential) {
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
