import { useState, useEffect } from "react";
import { petAPI } from "../api/petAPI";
import PetList from "../components/pet/PetList";
import PetFilters from "../components/pet/PetFilters";
import Pagination from "../components/common/Pagination";
import { toast } from "react-toastify";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPets, setTotalPets] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    species: "",
    breed: "",
    minAge: null,
    maxAge: null,
  });

  useEffect(() => {
    fetchPets();
  }, [currentPage, filters]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
        ...filters,
      };

      Object.keys(params).forEach(
        (key) =>
          (params[key] === "" || params[key] === null) && delete params[key]
      );

      const { data } = await petAPI.getAllPets(params);
      setPets(data.pets);
      setTotalPages(data.totalPages);
      setTotalPets(data.totalPets);
    } catch (error) {
      toast.error("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      species: "",
      breed: "",
      minAge: null,
      maxAge: null,
    });
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Find Your Perfect Companion</h1>
        <p className="text-gray-600">
          Browse {totalPets} adorable pets waiting for their forever home
        </p>
      </div>

      <PetFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <PetList pets={pets} loading={loading} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;
