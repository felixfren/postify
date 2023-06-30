import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/app/(site)/components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const latest = songs.slice(0,5);

  const genrePop = (songs.filter(data => data.genre === 'Pop'))
  const japaneseRock = (songs.filter(data => data.genre === 'Japanese Rock'))
  const danceElectronic = (songs.filter(data => data.genre === 'Dance/Electronic'))
  const japanesePop = (songs.filter(data => data.genre === 'Japanese Pop'))

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full pb-64 overflow-hidden overflow-y-auto scrollbar">
      <Header>
      </Header>
      <div className="mb-2 px-6">
          <h1 className="text-white text-3xl font-bold">
            What do you want to Listen to?
          </h1>
          <div className="grid grid-cols sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4"> 
            <ListItem 
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      <div className="mt-7 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            Release Radar
          </h1>
        </div>
        <PageContent songs={latest} />
      </div>

      <div className="mt-7 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            Explore Pop
          </h1>
        </div>
        <PageContent songs={genrePop.slice(0,5)} />
      </div>

      <div className="mt-7 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            Explore Japanese Rock
          </h1>
        </div>
        <PageContent songs={japaneseRock.slice(0,5)} />
      </div>

      <div className="mt-7 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            Explore Dance/Electronic
          </h1>
        </div>
        <PageContent songs={danceElectronic.slice(0,5)} />
      </div>

      <div className="mt-7 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            Explore Japanese Pop
          </h1>
        </div>
        <PageContent songs={japanesePop.slice(0,5)} />
      </div>

      <div className="mt-7 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            Browse All Songs
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>

    </div>
  )
}

