import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    }

    // const { data, error } = await supabase.from('songs').select('*').ilike('title', `%${title}%`).order('created_at', {ascending: false});
    try {
        const queryByTitle = supabase.from('songs').select('*').ilike('title', `%${title}%`).order('created_at', {ascending: false});

        const queryByArtist = supabase.from('songs').select('*').ilike('artist', `%${title}%`).order('created_at', {ascending: false});
    
        const [titleResults, artistResults] = await Promise.all([
            queryByTitle, queryByArtist,
        ]);

        const mergedResults = [];
    
        if (titleResults.data) {
            mergedResults.push(...titleResults.data);
        }

        if (artistResults.data) {
            mergedResults.push(...artistResults.data);
        }
    
        return mergedResults;
    } catch (error) {
        console.error(error);
        return []
    }
    

    // if (error) {
    //     console.log(error);
    // }

    // return (data as any) || [];
}

export default getSongsByTitle;