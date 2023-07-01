"use client";

import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BiShuffle } from "react-icons/bi";
import { BsRepeat, BsRepeat1 } from "react-icons/bs";
import { HiSpeakerXMark, HiSpeakerWave, HiQueueList} from "react-icons/hi2";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import PlayingMediaItem from "./PlayingMediaItem";
import SeekSlider from "./SeekSlider";
import { useRouter } from "next/navigation";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const router = useRouter();
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
    const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);

    
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);

        let nextSong;

        if (isRepeatEnabled) {
            nextSong = player.activeId;
        } else {
            const lastIndex = player.ids.length - 1;
            const isLastSong = currentIndex === lastIndex;
            nextSong = isLastSong ? player.ids[0] : player.ids[currentIndex + 1];
        }

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        let previousSong;

        if (isRepeatEnabled) {
            previousSong = player.activeId;
        } else {
            const firstIndex = 0;
            const isFirstSong = currentIndex === firstIndex;
            previousSong = isFirstSong ? player.ids[player.ids.length - 1] : player.ids[currentIndex - 1];
        }

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);  
    };

    const onShuffle = () => {
        setIsShuffleEnabled(true);
        player.shuffle();
    };

    const onRevertShuffle = () => {
        setIsShuffleEnabled(false);
        player.revertShuffle();
        
    }

    const onEnableRepeat = () => {
        setIsRepeatEnabled(true);
    };

    const onDisableRepeat = () => {
        setIsRepeatEnabled(false);
    }

    const [play, { pause, duration, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                if (isRepeatEnabled) {
                    play();
                } else {
                    onPlayNext();
                }
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    const [time, setTime] = useState({
        min: "00", sec: "00"
    });

    const [currTime, setCurrTime] = useState({
        min: "00", sec: "00"
    });

    const [seconds, setSeconds] = useState(0);

    //useEffect for duration calculations
    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: isNaN(min) ? "00" : min.toString().padStart(2, '0'),
                sec: isNaN(sec) ? "0" : secRemain.toString().padStart(2, '0')
            });
        }
    },[isPlaying, duration, setTime]);

    //useEffect for seek timer
    useEffect(() => {
        const interval = setInterval(() => {
            if (sound){
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min: isNaN(min) ? "00" : min.toString().padStart(2, '0'),
                    sec: isNaN(sec) ? "0" : sec.toString().padStart(2, '0')
                });
            }
        }, 1000);
        return () => {
            sound?.unload();
            clearInterval(interval);
        };
    },[sound, setSeconds, setCurrTime])

    //useEffect for audio playback
    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return ( 
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <PlayingMediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            <div className="flex md:hidden col-auto w-full justify-end items-center ">
                <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
                    <Icon size={30} className="text-black" />
                </div>

            </div>

            <div className="hidden h-full grid-cols-2 flex-col md:flex justify-center items-center w-full max-w-[722px] gap-y-2">
                <div className="flex items-center gap-x-6 justify-center">
                    <BiShuffle 
                    onClick={isShuffleEnabled ? onRevertShuffle : onShuffle}
                    size={20} className={`cursor-pointer hover:text-white transition ${
                        isShuffleEnabled ? "text-emerald-500" : "text-neutral-400"
                      }`}/>

                    <AiFillStepBackward 
                    onClick={onPlayPrevious}
                    size={25} className="text-neutral-400 cursor-pointer hover:text-white transition" />

                    <div 
                        onClick={handlePlay}
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                        <Icon size={30} className="text-black" /> 
                    </div>

                    <AiFillStepForward 
                    onClick={onPlayNext}
                    size={25} className="text-neutral-400 cursor-pointer hover:text-white transition" />

                    <BsRepeat 
                    onClick={isRepeatEnabled ? onDisableRepeat : onEnableRepeat}
                    size={20} className={` cursor-pointer hover:text-white transition ${
                        isRepeatEnabled ? "text-emerald-500" : "text-neutral-400"
                      }`}/>

                </div>
                <div className="flex items-center gap-x-6 w-full justify-center">
                    <p className="text-sm text-neutral-400">
                        {currTime.min}:{currTime.sec}
                    </p>
                    <SeekSlider 
                        max={duration ? duration / 1000 : 0}
                        value={seconds}
                        onChange={(value) => {
                            pause();
                            setSeconds(value);
                            sound.seek([value]);
                        }}
                        onCommit={play}
                    />
                    <p className="text-sm text-neutral-400">
                        {time.min}:{time.sec}
                    </p>
                </div>
                
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-4 w-full max-w-[150px]">
                    <HiQueueList 
                        onClick={() => router.push('/songqueue')}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                        size={34}
                    />
                    <VolumeIcon 
                        onClick={toggleMute}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                        size={34}
                    />
                    <Slider 
                        max={1}
                        value={volume}
                        onChange={(value) => {
                            setVolume(value);
                        }}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default PlayerContent;