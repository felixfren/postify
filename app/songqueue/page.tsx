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
import Header from "@/components/Header";
import { useState } from "react";


const Queue = () => {
    const player = usePlayer();
    const { songs } = useGetSongsByIds(player.ids);

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto pb-24 scrollbar">
            <Header className="bg-neutral-900">
                
            </Header>
            <div className="mb-2 flex flex-col gap-y-6 px-8">
                <h1 className="text-white text-xl font-semibold">
                    Queue
                </h1>
            </div>
            <SongQueue songs={songs}/>
        </div>
    );
}
 
export default Queue;