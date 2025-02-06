"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase"; // Adjust the import path as needed
import { getDoc, doc } from "firebase/firestore";

export default function ProfileContainer() {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("/Icons/icons8-male-user.svg");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If user is signed in with Google, use the displayName and photoURL
        if (user.providerData[0].providerId === "google.com") {
          setUserName(user.displayName);
          setUserPhoto(user.photoURL);
        } else {
          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name);
            setUserPhoto(
              userDoc.data().photoURL || "/Icons/icons8-male-user.svg"
            );
          }
        }
      } else {
        setUserName("");
        setUserPhoto("/Icons/icons8-male-user.svg");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between gap-x-4 p-4 bg-gray-300 rounded-lg">
      <div className="flex self-center items-center gap-x-2">
        <Image
          src={userPhoto}
          width={24}
          height={24}
          alt="user photo"
          className="rounded-full"
        />
        <p>{userName}</p>
      </div>
      <div>
        <Image
          src="/Icons/icons8-settings.svg"
          width={24}
          height={24}
          alt="gear icon for settings"
        />
      </div>
    </div>
  );
}
