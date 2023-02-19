import { useDisconnectFoodFromMenuMutation } from '../graphql/generated';

import * as Dialog from '@radix-ui/react-dialog';
import { CircleNotch } from 'phosphor-react';
import { toast } from 'react-hot-toast';

interface RemoveFoodFromMenuProps {
  slug: string | undefined;
  foodSlug: string;
  title: string;
  setRemoveFoodModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RemoveFoodFromMenu({ slug, foodSlug, title, setRemoveFoodModal }: RemoveFoodFromMenuProps) {
  const [disconnectFoodFromMenu, { loading }] = useDisconnectFoodFromMenuMutation();

  async function handleRemoveFood() {
    await disconnectFoodFromMenu({
      variables: {
        slug: slug!,
        foodSlug: foodSlug,
      },
    });

    setRemoveFoodModal(false);

    if (!loading) {
      toast.success(`${title} será removido do cardápio!`, {
        position: 'bottom-center',
      });
    }
  }

  return (
    <Dialog.Portal className="relative">
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-4 px-4 sm:py-8 sm:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[350px] sm:w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Deseja remover {title} do Cardápio?
        </Dialog.Title>

        <footer className="flex items-center justify-end gap-3 pt-12">
          <Dialog.Close
            type="button"
            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors duration-150"
          >
            Cancelar
          </Dialog.Close>

          <button
            type="button"
            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors duration-150"
            onClick={handleRemoveFood}
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
      </Dialog.Content>
    </Dialog.Portal>
  )
}
