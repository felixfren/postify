"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SongQueueProps {
    songs: Song[];
}

const SongQueue: React.FC<SongQueueProps> = ({
    songs
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const player = usePlayer();

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    
    console.log(songs);
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (player.ids.length === 0) {
        return (
          <div className="flex flex-col gap-y-2 w-full px-8 text-xl font-semibold text-neutral-400">
            This queue is Empty.
          </div>
        );
      }

    const currentlyPlayingSong = songs.find((song) => song.id === player.activeId);
    const songsBeforeCurrent = songs.filter(
    (song, index) => index < currentIndex
    );
    const songsAfterCurrent = songs.filter(
    (song, index) => index > currentIndex
    );

    return (
    <div className="flex flex-col gap-y-2 w-full px-8">
        <h1 className="text-neutral-400 text-xl font-semibold">
            Currently Playing
        </h1>
        {currentlyPlayingSong && (
        <div className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
            <MediaItem
                onClick={(id: string) => onPlay(id)}
                data={currentlyPlayingSong}
            />
            </div>
            <LikeButton songId={currentlyPlayingSong.id} />
        </div>
        )}

        <h1 className="text-neutral-400 text-xl font-semibold">
            Next in Queue
        </h1>

        {songsAfterCurrent.map((song,index) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="text-neutral-400 font-semibold">{index + 1}</div>
            <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
            </div>
            <LikeButton songId={song.id} />
        </div>
        ))}

        {songsBeforeCurrent.map((song,index) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="text-neutral-400 font-semibold">{index + songsAfterCurrent.length + 1}</div>
            <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
            </div>
            <LikeButton songId={song.id} />
        </div>
        ))}
    </div>
    );
    // return ( 
    //     <div className="flex flex-col gap-y-2 w-full p-6">
    //         {songs.reverse().map((song) => (
    //             <div key={song.id} className="flex items-center gap-x-4 w-full">
    //                 <div className="flex-1">
    //                     <MediaItem onClick={(id: string) => {}} data={song} />
    //                 </div>
    //                 <LikeButton songId={song.id} />
    //             </div>
    //         ))}
    //     </div>
    //  );
}
 
export default SongQueue;