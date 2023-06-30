"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useGetSongById from "@/hooks/useGetSongById";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import useGetQueue from "@/actions/GetSongByIds";
import { Song } from "@/types";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import SongQueue from "./components/songQueue";
import useGetSongsByIds from "@/actions/GetSongByIds";


const Queue = () => {
    const player = usePlayer();
    const { songs } = useGetSongsByIds(player.ids);

    // console.log(player);
    // const onPlay = useOnPlay(song);

    if (!songs) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400 ">
                No Songs Found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6 pb-40">
            test
            <SongQueue songs={songs}/>
        </div>
    );
}
 
export default Queue;