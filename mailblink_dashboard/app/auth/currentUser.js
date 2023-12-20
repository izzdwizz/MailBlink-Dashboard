// This file will be used to access the details of the loged in user
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const currentUser = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.log(error.message);
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default currentUser;
