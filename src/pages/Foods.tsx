import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScreenshotButton } from '../components/ScreenshotButton';

import { useGetMenuBySlugQuery } from '../graphql/generated';

export function Foods() {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetMenuBySlugQuery({
    variables: {
      slug: slug,
    },
  });

  if (!data || !data.cardapio) {
    return (
      <div className="text-white flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between pt-12 gap-12 mx-6 lg:mx-0 h-screen text-white">
      <h1 className={`font-bold text-3xl text-center ${data.cardapio.title === 'Cardápio Vip' ? 'text-[#f4da60]' : 'text-white'}`}>{data.cardapio.title}</h1>

      <div className={`p-3 pb-3 px-7 md:px-12 h-[90vh] lg:w-[37vw] rounded-md border-2 border-opacity-30 shadow-lg scrollbar overflow-y-scroll border-white ${slug === 'cardapio-simples' ? 'bg-card_simples text-white' : 'bg-card_vip text-[#f4da60]'} bg-cover bg-no-repeat bg-center`}>
        <h1 className="text-center pb-12 text-3xl">Entrada</h1>
        <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
          {data.cardapio.comidas.filter((food) => food.type === 'entrada').map(item => (
            <span className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>

        <h1 className="text-center pt-12 pb-12 text-3xl">Acompanhamentos</h1>
        <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
          {data.cardapio.comidas.filter((food) => food.type === 'acompanhamento').map(item => (
            <span className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>

        <h1 className="text-center pt-12 pb-12 text-3xl">Sobremesas</h1>
        <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
          {data.cardapio.comidas.filter((food) => food.type === 'sobremesa').map(item => (
            <span className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>

        <h1 className="text-center pt-12 pb-12 text-3xl">Temos</h1>
        <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
          {data.cardapio.comidas.filter((food) => food.type === 'disponivel').map(item => (
            <span className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>

        <h1 className="text-center pt-12 pb-12 text-3xl">Serviços</h1>
        <div className="grid grid-cols-2 gap-3 pb-12">
          {data.cardapio.comidas.filter((food) => food.type === 'servico').map(item => (
            <span className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex items-center gap-4 justify-center w-full lg:max-w-[1400px] mx-auto pb-3">
        <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenshot}
        />
        
        <button className="flex items-center py-3 px-4 rounded-lg text-black bg-slate-50 hover:scale-110 duration-150 transition-all cursor-pointer">Fazer um pedido</button>
      </div>
    </div>
  )
}
