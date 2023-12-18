"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import currentUser from "../currentUser"
import Spinner from "@/app/components/Spinner";

const Dashboard = () => {
  // Access routing functionality
  const router = useRouter();
  // Initialize Supabase client
  const supabase = createClientComponentClient();

  const { user, loading } = currentUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <p>userId: {user.id}</p>
      
      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
