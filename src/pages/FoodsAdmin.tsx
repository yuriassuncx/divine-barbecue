import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetMenuBySlugQuery,
  useGetFoodsQuery,
  useInsertFoodToMenuMutation 
} from '../graphql/generated';

import { Card } from '../components/Card';

import toast from 'react-hot-toast';

export function FoodsAdmin() {
  const { slug } = useParams<{ slug: string }>();
  const { 'data': foods } = useGetFoodsQuery();
  const { data } = useGetMenuBySlugQuery({
    variables: {
      slug: slug,
    },
  });

  const [widgets, setWidgets] = useState<string[]>([]);

  const [insertFoodToMenu, { loading }] = useInsertFoodToMenuMutation();

  async function handleCreateFood(foodName: string, foodSlug: string) {
    if (widgets.includes(foodName)) {
      toast.error("Ops! já existe este item no cardápio.", {
        position: "bottom-center",
      });

      return;
    } else {
      setWidgets([...widgets, foodName]);
    }
    
    await insertFoodToMenu({
      variables: {
        name: foodName,
        foodSlug: foodSlug,
        slug: slug!
      },
    })
  }

  if (!data || !data.cardapio) {
    return (
      <div className="text-white flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(e: React.DragEvent) {
    const widgetType = e.dataTransfer.getData("widgetType") as string;

    if (widgets.includes(widgetType)) {
      toast.error("Ops! já existe este item no cardápio.", {
        position: "bottom-center",
      });

      return;
    } else {
      setWidgets([...widgets, widgetType]);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col items-center justify-between pt-12 gap-12 mx-2 lg:mx-0 h-screen text-white">
      <h1 className="font-bold text-3xl">{data.cardapio.title} - Página do Admin</h1>

      <div
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
        className={`p-6 pb-3 h-[80vh] lg:w-[60vh] rounded-md border-2 border-opacity-30 shadow-lg border-white ${slug === 'cardapio-simples' ? 'bg-card_simples' : 'bg-card_vip'} bg-cover bg-no-repeat`}
      >
        <div className="grid grid-cols-2 gap-3">
          {data.cardapio.comidas.map((item, index) => (
            <div className="uppercase tracking-wider" key={index}>
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center w-full lg:max-w-[1400px] mx-auto">
        <div className="flex space-x-6 overflow-x-scroll lg:overflow-hidden lg:hover:overflow-x-scroll p-2 lg:-m-2">
          {foods?.comidas.map((food) => (
            <Card
              key={food.id}
              name={food.name}
              photoUrl={food.photo?.url}
              onDragStart={(e) => handleOnDrag(e, food.name)}
              handleAddFoodWithClick={() => handleCreateFood(food.name, food.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
