import { User } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetUserData = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);

        const fetchUserData = async () => {
            const { data, error } = await supabaseClient.from('users').select('*').eq('id',id).single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setUser(data as User)
            setIsLoading(false);
        }
        fetchUserData();
    },[id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        user
    }), [isLoading, user]);
};

export default useGetUserData;