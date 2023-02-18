import { Link } from "react-router-dom";
import { useApplication } from "../hooks/useApplication";
import { useGetMenusQuery } from "../graphql/generated";

export function Menu() {
  const { user } = useApplication();
  const { data } = useGetMenusQuery();

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-center mx-3 md:mx-auto text-white pt-12 cursor-pointer max-w-3xl">
      {data?.cardapios.map((menu) => (
        <Link to={user ? `/admin/cardapios/${menu.slug}` : `/cardapios/${menu.slug}`} key={menu.id} className="group relative overflow-hidden rounded-xl hover:cursor-pointer">
          <div className="group-hover:bg-black/70 absolute z-40 transition-all duration-300" />

          <img src={menu.photo?.url} alt={`Imagem de ${menu.title}`} className="group-hover:scale-125 transition-all duration-500" />

          <div className="absolute -bottom-full left-4 group-hover:bottom-24 transition-all duration-500 z-50">
              <span className="text-gradient text-3xl">{menu.title}</span>
          </div>

          <div className="absolute -bottom-full left-4 group-hover:bottom-14 transition-all duration-700 z-50">
              <span className="text-lg text-white">Clique para saber mais.</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
