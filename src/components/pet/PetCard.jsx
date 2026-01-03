import { Link } from "react-router-dom";
import { FaPaw, FaBirthdayCake, FaVenusMars } from "react-icons/fa";

const PetCard = ({ pet }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Adopted":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-48 object-contain"
        />
        <span
          className={`absolute top-2 right-2 ${getStatusColor(
            pet.status
          )} text-white px-3 py-1 rounded-full text-sm font-semibold`}
        >
          {pet.status}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{pet.name}</h3>

        <div className="flex items-center space-x-4 text-gray-600 mb-3">
          <span className="flex items-center space-x-1">
            <FaPaw className="text-blue-600" />
            <span>{pet.species}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaBirthdayCake className="text-pink-600" />
            <span>
              {pet.age} {pet.age === 1 ? "year" : "years"}
            </span>
          </span>
          <span className="flex items-center space-x-1">
            <FaVenusMars className="text-purple-600" />
            <span>{pet.gender}</span>
          </span>
        </div>

        <p className="text-gray-700 mb-2">
          <strong>Breed:</strong> {pet.breed}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pet.description}
        </p>

        <Link
          to={`/pets/${pet._id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
