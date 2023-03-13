import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetMenuBySlugQuery,
  useGetFoodsQuery,
  useInsertFoodToMenuMutation,
  usePublishMenuMutation
} from '../graphql/generated';

import { RemoveFoodFromMenu } from '../components/RemoveFoodFromMenu';
import { Card } from '../components/Card';

import { CircleNotch } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';

export function FoodsAdmin() {
  const { slug } = useParams<{ slug: string }>();

  const [foodTitle, setFoodTitle] = useState("");
  const [foodSlug, setFoodSlug] = useState("");
  const [foodId, setFoodId] = useState("");

  const { data } = useGetMenuBySlugQuery({
    variables: {
      slug: slug,
    }
  });
  const { 'data': foods } = useGetFoodsQuery();
  const [insertFoodToMenu, { loading }] = useInsertFoodToMenuMutation();
  const [publishMenu, { 'loading': publishLoading }] = usePublishMenuMutation();
  const [isRemoveFoodFromMenuModalOpened, setIsRemoveFoodFromMenuModalOpened] = useState(false);

  async function handleCreateFood(foodName: string, foodSlug: string) {    
    await insertFoodToMenu({
      variables: {
        name: foodName,
        foodSlug: foodSlug,
        slug: slug!
      },
    });

    toast.success(`A comida ${foodName} será adicionada ao cardápio!`, {
      position: 'bottom-center',
    });
  }

  async function handlePublishMenu() {
    await publishMenu({
      variables: {
        slug: slug!
      },
    });
    
    toast.success("Cardápio atualizado com sucesso!", {
      position: 'bottom-center',
    });

    location.reload();
  }

  function handleRemoveFood(title: string, foodSlug: string, foodId: string) {
    setFoodTitle(title);
    setFoodSlug(foodSlug);
    setFoodId(foodId)

    setIsRemoveFoodFromMenuModalOpened(true);
  }

  if (!data || !data.cardapio) {
    return (
      <div className="text-white flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between font-slab font-bold pt-12 gap-12 mx-6 lg:mx-0 h-[130vh] text-white">
      <h1 className={`font-bold text-3xl text-center ${data.cardapio.title === 'Cardápio Vip' ? 'text-[#f4da60]' : 'text-white'}`}>{data.cardapio.title} - Página do Admin</h1>

      <div className={`p-3 pb-3 px-7 md:px-12 h-[90vh] lg:w-[37vw] rounded-md border-2 border-opacity-30 shadow-lg scrollbar overflow-y-scroll border-white ${slug === 'cardapio-simples' ? 'bg-card_simples text-white' : 'bg-card_vip text-[#f4da60]'} bg-cover bg-no-repeat bg-center`}>
        <Dialog.Root>
          <h1 className="text-center pb-12 text-3xl">Entrada</h1>
          <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
            {data.cardapio.comidas.filter((food) => food.type === 'entrada').map(item => (
              <Dialog.Trigger className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id} onClick={() => handleRemoveFood(item.name, item.slug, item.id)}>
                {item.name}
              </Dialog.Trigger>
            ))}
          </div>

          <h1 className="text-center pt-12 pb-12 text-3xl">Acompanhamentos</h1>
          <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
            {data.cardapio.comidas.filter((food) => food.type === 'acompanhamento').map(item => (
              <Dialog.Trigger className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id} onClick={() => handleRemoveFood(item.name, item.slug, item.id)}>
                {item.name}
              </Dialog.Trigger>
            ))}
          </div>

          <h1 className="text-center pt-12 pb-12 text-3xl">Sobremesas</h1>
          <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
            {data.cardapio.comidas.filter((food) => food.type === 'sobremesa').map(item => (
              <Dialog.Trigger className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id} onClick={() => handleRemoveFood(item.name, item.slug, item.id)}>
                {item.name}
              </Dialog.Trigger>
            ))}
          </div>

          <h1 className="text-center pt-12 pb-12 text-3xl">Temos</h1>
          <div className="grid grid-cols-2 gap-3 border-b border-slate-400 pb-12">
            {data.cardapio.comidas.filter((food) => food.type === 'disponivel').map(item => (
              <Dialog.Trigger className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id} onClick={() => handleRemoveFood(item.name, item.slug, item.id)}>
                {item.name}
              </Dialog.Trigger>
            ))}
          </div>

          <h1 className="text-center pt-12 pb-12 text-3xl">Serviços</h1>
          <div className="grid grid-cols-2 gap-3 pb-12">
            {data.cardapio.comidas.filter((food) => food.type === 'servico').map(item => (
              <Dialog.Trigger className="flex text-start items-start uppercase tracking-wider hover:scale-105 duration-150 transition" key={item.id} onClick={() => handleRemoveFood(item.name, item.slug, item.id)}>
                {item.name}
              </Dialog.Trigger>
            ))}
          </div>

          {isRemoveFoodFromMenuModalOpened && (
            <RemoveFoodFromMenu
              key={foodId}
              title={foodTitle}
              foodSlug={foodSlug}
              setRemoveFoodModal={setIsRemoveFoodFromMenuModalOpened}
              slug={slug}
            />
          )}
        </Dialog.Root>
      </div>

      <button
        className="bg-green-500 p-3 rounded-lg hover:bg-green-600 duration-150 transition"
        onClick={handlePublishMenu}
      >
        {publishLoading ? (
          <span className="flex items-center justify-center gap-2">
            <p>Carregando</p>
            <CircleNotch size={14} className="animate-spin" />
          </span>
        ) : (
          <p>Confirmar Alterações</p>
        )}
      </button>

      <div className="relative flex items-center justify-center w-full lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto">
        <div className="flex space-x-6 overflow-x-scroll scrollbar-thin lg:scrollbar-track-red-700 lg:scrollbar-thumb-amber-400 p-2 lg:-m-2">
          {foods?.comidas.map((food) => (
            <Card
              key={food.id}
              name={food.name}
              photoUrl={food.photo?.url}
              handleAddFoodWithClick={() => handleCreateFood(food.name, food.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
