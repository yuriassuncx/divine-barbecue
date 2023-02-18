interface CardProps {
  name: string;
  description?: string;
  photoUrl?: string;
  onDragStart: (e: React.DragEvent) => void;
  handleAddFoodWithClick: () => void;
}

export function Card({ name, description, photoUrl, onDragStart, handleAddFoodWithClick }: CardProps) {
  return (
    <div
      className="flex items-center justify-center overflow-hidden shadow-xl border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl  gap-2 bg-slate-50 min-w-[250px] py-4 px-2 rounded-lg hover:scale-105 duration-150 transition cursor-pointer"
      draggable
      onDragStart={onDragStart}
      onClick={handleAddFoodWithClick}
    >
      <img
        src={photoUrl}
        alt={`Imagem de ${name}`}
        className="w-20 h-16 rounded-lg"
      />

      <div className="flex flex-col gap-1 leading-5 items-start">
        <h1 className="font-bold text-black">{name}</h1>
        <p className="text-slate-400">{description}</p>
      </div>
    </div>
  )
}
