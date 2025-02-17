import "tailwindcss";



function Home() {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className=" md:text-4xl text-3xl font-bold text-amber-50 mt-20">Pedro Developer</h1>
      <span className="text-gray-50 mb-5 mt-3">All my links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105">
          <a href="#">
            <p className="text-base md:text-lg">
              Youtube Chanel
            </p>
          </a>
        </section>

        <footer className="flex justify-center gap-2 my-4">

        </footer>
      </main>
    </div>
  )
}

export default Home