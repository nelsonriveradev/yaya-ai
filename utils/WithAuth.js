import { useRouter } from "next/navigation"; // Ensure Next.js navigation is initialized
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Ensure Firebase Auth is initialized
import { auth } from "@/app/lib/firebase"; // Replace with your Firebase configuration path
import LoadingCircle from "@/app/Components/LoadingCircle";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setLoading(false);
        } else {
          router.push("/sign-up"); // Redirect to login page if not authenticated
        }
      });

      return () => unsubscribe(); // Clean up the listener
    }, [router]);

    if (loading) {
      return (
        <div className="flex h-screen">
          <div className=" w-1/2 mx-auto mt-20">
            <LoadingCircle width="200" height="200" />
          </div>
        </div>
      ); // Display a loading state while checking authentication
    }

    return <WrappedComponent user={user} {...props} />;
  };
};

export default withAuth;
