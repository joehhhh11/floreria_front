import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export const IconActions = ({ onView, onEdit, onDelete, show = {} }) => {
  return (
    <div className="flex gap-2">
      {show.view && (
        <button onClick={onView} title="Ver">
          <EyeIcon className="w-5 h-5 text-blue-600 hover:text-blue-800" />
        </button>
      )}
      {show.edit && (
        <button onClick={onEdit} title="Editar">
          <PencilSquareIcon className="w-5 h-5 text-yellow-600 hover:text-yellow-800" />
        </button>
      )}
      {show.delete && (
        <button onClick={onDelete} title="Eliminar">
          <TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" />
        </button>
      )}
    </div>
  );
};
