const FilterPanel = ({ category, setCategory, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <select onChange={(e) => setCategory(e.target.value)} value={category || ''}>
        <option value="">Todas las categorías</option>
        <option value="Ramos">Ramos</option>
        <option value="Plantas">Plantas</option>
        <option value="Accesorios">Accesorios</option>
        <option value="Plantas de Exterior">Plantas del exterior</option>
      </select>

      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy || ''}>
        <option value="">Ordenar por</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="rating-desc">Mejor valorado</option>
      </select>
    </div>
  )
}
export default FilterPanel
