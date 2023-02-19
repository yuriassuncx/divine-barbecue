import { useRef } from 'react';
import { CircleNotch, Cookie } from 'phosphor-react';

import { useCreateNewFoodMutation } from '../graphql/generated';
import toast from 'react-hot-toast';

export function NewFood() {
  const foodRef = useRef<HTMLInputElement>(null);

  const [createNewFood, { loading }] = useCreateNewFoodMutation();

  async function handleCreateFood(e: React.FormEvent) {
    e.preventDefault();

    if (foodRef.current!.value.length < 3) {
      toast.error("Nome muito curto para uma comida!", {
        position: 'bottom-center',
      });

      return;
    }

    await createNewFood({
      variables: {
        name: foodRef.current!.value,
        slug: foodRef.current!.value.toLowerCase().split(' ').join('-')
      },
    });

    if (!loading) {
      toast.success(`${foodRef.current!.value} será adicionado ao cardápio!`, {
        position: 'bottom-center',
      });
    }
  }

  return (
    <form onSubmit={handleCreateFood} className="flex flex-col gap-8 bg-slate-800 py-6 px-6 max-w-lg mx-auto mt-12 rounded-lg">
      <h1 className="text-2xl text-white font-bold tracking-wide pb-3 text-center">Criação de nova comida</h1>
      <div className="flex items-center rounded-md bg-gray-600 px-4 py-1 mr-4 w-full">
          <Cookie className="text-white text-lg block float-left cursor-pointer mr-2" />

          <input
            type="text"
            ref={foodRef}
            className="text-base bg-transparent w-full py-2 flex-1 text-white focus:outline-none"
            placeholder="Nome da comida"
          />
      </div>

      <footer className="flex items-center justify-end gap-3 pt-6">
        <button
          type="button"
          onClick={() => {}}
          className="bg-red-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-red-600 transition-colors duration-15 text-white"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors duration-150 text-white"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <p>Carregando</p>
              <CircleNotch size={14} className="animate-spin" />
            </span>
          ) : (
            <p>Confirmar</p>
          )}
        </button>
      </footer>
    </form>
  )
}
