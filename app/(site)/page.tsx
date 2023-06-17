import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Welcome Back, Varye
          </h1>
          <div className="grid grid-cols sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4"> 

          </div>
        </div>
      </Header>
    </div>
  )
}
