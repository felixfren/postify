import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";
import getSongsByUserId from "@/actions/getSongsByUserId";

const Account = async() => {
    const userSongs = await getSongsByUserId();
    return ( 
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto scrollbar">
            <Header className="from-bg-neutral-900">
                
            </Header>
            <div className="mb-2 flex flex-col gap-y-6 px-8">
                <h1 className="text-white text-3xl font-semibold">
                    Your Account
                </h1>
            </div>
            <AccountContent songs={userSongs}/>
            
        </div>
     );
}
 
export default Account;