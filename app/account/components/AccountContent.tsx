"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { Song, User } from "@/types";
import MediaItem from "@/components/MediaItem";
import { BsTrash } from "react-icons/bs";
import useOnPlay from "@/hooks/useOnPlay";
import useUploadModal from "@/hooks/useUploadModal";
import ConfirmModal from "@/components/ConfirmModal";

interface AccountContentProps {
    songs: Song[];
}

const AccountContent = ({ songs }: AccountContentProps) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);
    const confirmModal = ConfirmModal();
    const uploadModal = useUploadModal();

    const [loading, setLoading] = useState(false);

    const onClick = () => {
        return confirmModal.onOpen();
    };

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    },[isLoading, user, router]);


    return ( 
        <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-y-4 gap-x-4 cursor-pointer transition px-8 pt-4">   
            <div className="flex flex-row items-start w-full gap-y-1 px-4 py-4 text-xl bg-neutral-400/5 hover:bg-neutral-400/10 transition">
                <p className="font-semibold truncate w-full">
                    UUID
                </p>
                <p className="text-neutral-400 text-xl font-semibold w-full truncate">
                    {user?.id}
                </p>
            </div>
            <div className="flex flex-row items-start w-full gap-y-1 px-4 py-4 text-xl bg-neutral-400/5 hover:bg-neutral-400/10 transition">
                <p className="font-semibold truncate w-full">
                    Email
                </p>
                <p className="text-neutral-400 text-xl font-semibold w-full truncate">
                    {user?.email}
                </p>
            </div>
            {
                songs.length === 0 ? (
                <div className="flex flex-col gap-y-2 w-full text-white">
                    No songs uploaded.
                </div>
                ) : (
                <div className="mt-2">
                    <h1 className="text-white text-2xl font-semibold">
                    Your uploads
                    </h1>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full justify-center">
                    {
                        songs.map((song) => (
                        <div
                            key={song.id}
                            className="flex items-center justify-between w-full"
                        >
                            <div className="flex-1 truncate">
                            <MediaItem
                                onClick={(id: string) => onPlay(id)}
                                data={song}
                            />
                            </div>
                            {/* <button
                                className="text-gray-500 hover:text-rose-500 hover:scale-110 transition-all pr-3"
                                onClick={onClick}
                            >
                                <BsTrash size={20} />
                            </button> */}
                        </div>
                        ))
                    }
                    </div>
                </div>
                )
            }
            

            
            
        </div>
     );
}
 
export default AccountContent;