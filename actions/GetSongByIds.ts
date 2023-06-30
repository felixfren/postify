import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetSongsByIds = (ids?: string[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!ids || ids.length === 0) {
      return;
    }

    setIsLoading(true);

    const fetchSongs = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .in("id", ids);

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSongs(data as Song[]);
      setIsLoading(false);
    };

    fetchSongs();
  }, [ids, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      songs,
    }),
    [isLoading, songs]
  );
};

export default useGetSongsByIds;
