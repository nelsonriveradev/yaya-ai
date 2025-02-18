import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { redirect } from "next/navigation";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

//Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (!user.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
          });
          // i want to check if user exists in the database in firestore
          // if not, create a new document for the user
          const userDocRef = doc(db, "aiApiCount", user.uid);
          const userDoc = await getDoc(userDocRef);

          await setDoc(userDocRef, {
            apiCallCount: 0,
            name: user.displayName,
            email: user.email,
          });

          console.log(user);
          return { user, token };
        }
      })
      .finally(() => {
        redirect("/make-recipe");
      });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error);
    const errorLog = {
      errorCode,
      errorMessage,
      email,
      credential,
    };
    console.log("Error log:", errorLog);
  }
};
// Handle the redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });

      return { user, token };
    }
  } catch (error) {
    console.error("Error handling redirect result:", error);
  }
};

// Sign up
export const signUp = async (email, password, name) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (credential) {
      onAuthStateChanged(auth, async (user) => {
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          apiCallCount: 0,
        });
      });
      return credential;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Sign in
export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const logOut = async () => {
  await signOut(auth);
  return redirect("/");
};
