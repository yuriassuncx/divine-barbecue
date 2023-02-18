import { useApplication } from '../hooks/useApplication';
import { Link } from 'react-router-dom';
import { userData } from '../constants/data';

import * as Popover from '@radix-ui/react-popover';

import { CaretDown, List, X } from 'phosphor-react';

export function Header() {
  const { isActiveMenu, setIsActiveMenu, user, logout } = useApplication();

  return (
    <div className="flex relative items-center justify-between bg-red-700 w-full px-4 lg:px-12 py-6 text-slate-50">
      <Link to={'/'} className="flex flex-col leading-3 tracking-wide font-bold cursor-pointer hover:scale-105 duration-150 transition-all">
        <h1 className="text-4xl">Divine</h1>
        <p className="flex pl-10 text-orange-400">Barbecue</p>
      </Link>

      <button
        className="flex lg:hidden relative hover:bg-zinc-400 p-2 rounded-full opacity-90"
        onClick={() => setIsActiveMenu(true)}
      >
        <List size={32} />
      </button>

      {!user ? (
        <Link to={'/login'} className="hidden lg:flex gap-2 bg-white shadow-2xl py-3 px-5 items-center justify-center rounded-lg cursor-pointer text-black">
          Entrar como Admin
        </Link>
      ) : (
        <Popover.Root>
          <Popover.Trigger className="hidden lg:flex gap-2 bg-white shadow-2xl py-3 px-5 items-center justify-center rounded-lg cursor-pointer text-black">
            <h1 className="font-bold">{user?.name} Logado</h1>
            <CaretDown size={14} />
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content className={`${user ? 'flex flex-col' : 'hidden'} min-w-[200px] p-6 rounded-2xl gap-2 bg-zinc-900 text-white ml-1 lg:ml-0`}>
                <Link to={'/admin/cardapios/'} className="font-semibold text-zinc-400/90 hover:text-zinc-400">Cadastrar produtos</Link>
                <button
                  onClick={logout}
                  className="font-semibold text-zinc-400/90 hover:text-zinc-400"
                >
                    Sair da conta
                </button>

                <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}


      {isActiveMenu && (
        <>
          <div className="fixed lg:hidden inset-0 w-screen h-screen z-10 bg-black/80" />
        
          <div className="flex lg:hidden flex-col min-w-[280px] h-1/2 bg-orange-400 shadow-2xl fixed z-50 inset-0 mx-auto p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md transition duration-150">
            <button
              className="flex items-end justify-end text-white"
              onClick={() => setIsActiveMenu(false)}
            >
              <X className="bg-black p-1 rounded-full" size={30} />
            </button>

            <div className="flex flex-col gap-3 items-center justify-center pt-6">
              {userData.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsActiveMenu(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
