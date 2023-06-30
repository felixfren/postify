"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { User } from "@/types";


const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    },[isLoading, user, router]);


    return ( 
        <div 
            className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-y-4 gap-x-4 cursor-pointer transition px-8 pt-4"
        >   
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

            
            
        </div>
     );
}
 
export default AccountContent;