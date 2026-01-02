import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { petAPI } from "../api/petAPI";
import { applicationAPI } from "../api/applicationAPI";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import {
  FaPaw,
  FaBirthdayCake,
  FaVenusMars,
  FaRuler,
  FaPalette,
  FaSyringe,
} from "react-icons/fa";
import { HOUSING_OPTIONS } from "../utils/constants";

const PetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    reason: "",
    experience: "",
    housingType: "",
    hasYard: false,
    otherPets: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const { data } = await petAPI.getPetById(id);
      setPet(data.pet);
    } catch (error) {
      toast.error("Failed to fetch pet details");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to apply for adoption");
      navigate("/login");
      return;
    }

    setSubmitting(true);
    try {
      await applicationAPI.createApplication({
        pet: id,
        ...applicationData,
      });
      toast.success("Application submitted successfully!");
      setShowApplicationForm(false);
      fetchPet();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit application"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!pet) return <div className="text-center py-12">Pet not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold">{pet.name}</h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  pet.status === "Available"
                    ? "bg-green-500 text-white"
                    : pet.status === "Pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {pet.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaPaw className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Species</p>
                  <p className="font-semibold">{pet.species}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <FaBirthdayCake className="text-pink-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-semibold">
                    {pet.age} {pet.age === 1 ? "year" : "years"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <FaVenusMars className="text-purple-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-semibold">{pet.gender}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <FaRuler className="text-orange-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-semibold">{pet.size}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <FaPalette className="text-red-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-semibold">{pet.color}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <FaSyringe className="text-green-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Vaccinated</p>
                  <p className="font-semibold">
                    {pet.vaccinated ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Breed</h3>
              <p className="text-gray-700">{pet.breed}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">About {pet.name}</h3>
              <p className="text-gray-700">{pet.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Medical History</h3>
              <p className="text-gray-700">{pet.medicalHistory}</p>
            </div>

            {pet.status === "Available" && user && user.role !== "admin" && (
              <button
                onClick={() => setShowApplicationForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Apply for Adoption
              </button>
            )}

            {pet.status === "Adopted" && (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-700 font-semibold">
                  This pet has been adopted and is now in a loving home! 🎉
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              Adoption Application for {pet.name}
            </h2>

            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Why do you want to adopt {pet.name}? * (min 50 characters)
                </label>
                <textarea
                  name="reason"
                  value={applicationData.reason}
                  onChange={handleApplicationChange}
                  required
                  minLength="50"
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us why you'd be a great match..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Describe your experience with pets *
                </label>
                <textarea
                  name="experience"
                  value={applicationData.experience}
                  onChange={handleApplicationChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your experience caring for pets..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Housing Type *
                </label>
                <select
                  name="housingType"
                  value={applicationData.housingType}
                  onChange={handleApplicationChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select housing type</option>
                  {HOUSING_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="hasYard"
                    checked={applicationData.hasYard}
                    onChange={handleApplicationChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">I have a yard</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Do you have other pets? If yes, describe them
                </label>
                <textarea
                  name="otherPets"
                  value={applicationData.otherPets}
                  onChange={handleApplicationChange}
                  rows="2"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="None or describe your other pets..."
                />
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetailsPage;
