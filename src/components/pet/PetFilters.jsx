import { SPECIES_OPTIONS, AGE_RANGES } from "../../utils/constants";

const PetFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Filters</h3>
        <button
          onClick={onReset}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by name or breed..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Species</label>
          <select
            value={filters.species}
            onChange={(e) => onFilterChange("species", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Species</option>
            {SPECIES_OPTIONS.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Breed</label>
          <input
            type="text"
            placeholder="Enter breed..."
            value={filters.breed}
            onChange={(e) => onFilterChange("breed", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Age Range</label>
          <select
            value={`${filters.minAge || ""}-${filters.maxAge || ""}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-");
              onFilterChange("minAge", min || null);
              onFilterChange("maxAge", max || null);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {AGE_RANGES.map((range, idx) => (
              <option key={idx} value={`${range.min || ""}-${range.max || ""}`}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PetFilters;
