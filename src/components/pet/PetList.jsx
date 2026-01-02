import PetCard from "./PetCard";
import Loader from "../common/Loader";

const PetList = ({ pets, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!pets || pets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">
          No pets found matching your criteria.
        </p>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet._id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
