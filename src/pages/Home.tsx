export function Home() {
  return (
    <main className="flex flex-col relative h-screen gap-12 px-3 text-center justify-center items-center bg-background2 md:bg-background1 bg-cover text-slate-50 bg-opacity-10">
      <div className="flex flex-col max-w-2xl">
        <span className="text-xl pb-4">Quem somos nós?</span>
        <h1 className="text-4xl font-bold uppercase tracking-widest pb-8">Divine Barbecue</h1>
        <p className="leading-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit id repellat velit, eum optio deserunt adipisci ullam placeat eligendi iure suscipit quae est harum ratione quo omnis quasi reprehenderit quisquam?</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <button className="flex items-center py-3 px-4 rounded-full bg-black text-white hover:scale-110 duration-150 transition-all cursor-pointer">Peça já a sua!</button>
        <button className="flex items-center py-3 px-4 rounded-full text-black bg-slate-50 hover:scale-110 duration-150 transition-all cursor-pointer">Reserve a sua mesa agora!</button>
      </div>
    </main>
  )
}
