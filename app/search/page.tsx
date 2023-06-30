import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: {
        title: string;
    }
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto pb-24">
            <Header className="from-bg-neutral-900">
                
            </Header>
            <div className="mb-2 flex flex-col gap-y-6 px-8">
                    <h1 className="text-white text-xl font-semibold">
                        Search
                    </h1>
                    <SearchInput />
            </div>
            <SearchContent songs={songs} />
        </div>
    )
};

export default Search;

