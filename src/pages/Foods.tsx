import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMenuBySlugQuery } from '../graphql/generated';

import { Card } from '../components/Card';

import toast from 'react-hot-toast';

export function Foods() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGetMenuBySlugQuery({
    variables: {
      slug: slug,
    },
  });

  const [widgets, setWidgets] = useState<string[]>([]);

  if (!data || !data.cardapio) {
    return (
      <div className="text-white flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between pt-12 gap-12 mx-6 lg:mx-0 h-screen text-white">
      <h1 className="font-bold text-3xl text-center">{data.cardapio.title}</h1>

      <div className={`p-6 pb-3 h-[80vh] lg:w-[60vh] rounded-md border-2 border-opacity-30 shadow-lg border-white ${slug === 'cardapio-simples' ? 'bg-card_simples' : 'bg-card_vip'} bg-cover bg-no-repeat`}>
        <div className="grid grid-cols-2 gap-3">
          {data.cardapio.comidas.map((item) => (
            <p className="uppercase tracking-wider hover:scale-105 duration-150 transition cursor-pointer" key={item.id}>
              {item.name}
            </p>
          ))}
        </div>
      </div>

      <div className="relative flex items-center gap-3 justify-center w-full lg:max-w-[1400px] mx-auto pb-3">
        <button className="flex items-center py-3 px-4 rounded-lg text-black bg-slate-50 hover:scale-110 duration-150 transition-all cursor-pointer">Compartilhar com os amigos</button>
        <button className="flex items-center py-3 px-4 rounded-lg text-black bg-slate-50 hover:scale-110 duration-150 transition-all cursor-pointer">Fazer um pedido</button>
      </div>
    </div>
  )
}
