import { Link } from 'react-router-dom';

import { data } from "../constants/data";
import { WhatsappLogo, EnvelopeSimple, MagnifyingGlass } from 'phosphor-react';

export function Submenu() {
  return (
    <div className="hidden lg:flex relative items-center justify-between bg-red-600 w-full py-3 px-4 md:pl-12 md:pr-20">
      <div className="flex gap-6 font-bold items-center text-slate-50">
        {data.map((item, index) => (
          <Link to={item.path!} className="group" key={index}>
            <h2 className="relative cursor-pointer uppercase text-sm font-medium before:bg-[#f9f9f9] before:rounded-bl before:-bottom-1.5 before:h-0.5 before:inset-x-0 before:absolute before:transform before:origin-left before:scale-x-0 before:transition-all before:duration-200 group-hover:before:scale-x-100">{item.title}</h2>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button className="bg-white p-1 rounded-full hover:scale-105 duration-150 transition-all cursor-pointer">
          <EnvelopeSimple size={28} color="#f04747" weight="bold" />
        </button>

        <button className="bg-white p-1 rounded-full hover:scale-105 duration-150 transition-all cursor-pointer">
          <WhatsappLogo size={28} color="#f04747" weight="bold" />
        </button>

        <button className="bg-white p-1 rounded-full hover:scale-105 duration-150 transition-all cursor-pointer">
          <MagnifyingGlass size={28} color="#f04747" weight="bold" />
        </button>
      </div>
    </div>
  )
}
