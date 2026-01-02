import { useState, useEffect } from "react";
import { petAPI } from "../api/petAPI";
import { applicationAPI } from "../api/applicationAPI";
import ApplicationCard from "../components/application/ApplicationCard";
import PetForm from "../components/pet/PetForm";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pets");
  const [pets, setPets] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPetForm, setShowPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (activeTab === "pets") {
      fetchPets();
    } else {
      fetchApplications();
    }
  }, [activeTab, statusFilter]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const { data } = await petAPI.getAllPets({ limit: 100 });
      setPets(data.pets);
    } catch (error) {
      toast.error("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await applicationAPI.getAllApplications(statusFilter);
      setApplications(data.applications);
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (petData) => {
    setLoading(true);
    try {
      // Upload the image first if it exists
      let imageUrl = petData.image;
      if (petData.image instanceof File) {
        const formData = new FormData();
        formData.append("image", petData.image);
        const imageUploadResponse = await petAPI.uploadImage(formData);
        imageUrl = imageUploadResponse.data.imageUrl; // Get the URL of the uploaded image
      }

      // Now include the image URL in the pet data
      const petDataWithImage = { ...petData, image: imageUrl };

      await petAPI.createPet(petDataWithImage);
      toast.success("Pet added successfully");
      setShowPetForm(false);
      fetchPets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePet = async (petData) => {
    setLoading(true);
    try {
      let imageUrl = petData.image;
      if (petData.image instanceof File) {
        const formData = new FormData();
        formData.append("image", petData.image); // File object from the form
        const imageUploadResponse = await petAPI.uploadImage(formData); // Call the upload API
        imageUrl = imageUploadResponse.data.imageUrl; // Get the URL of the uploaded image
      }

      const petDataWithImage = { ...petData, image: imageUrl };
      await petAPI.updatePet(editingPet._id, petDataWithImage);
      toast.success("Pet updated successfully");
      setShowPetForm(false);
      setEditingPet(null);
      fetchPets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update pet");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await petAPI.deletePet(id);
      toast.success("Pet deleted successfully");
      fetchPets();
    } catch (error) {
      toast.error("Failed to delete pet");
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await applicationAPI.updateApplicationStatus(applicationId, { status });
      toast.success(`Application ${status.toLowerCase()} successfully`);
      fetchApplications();
    } catch (error) {
      toast.error("Failed to update application status");
    }
  };

  const getStatusCount = (status) => {
    return applications.filter((app) => app.status === status).length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("pets")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeTab === "pets"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Manage Pets
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeTab === "applications"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Manage Applications
        </button>
      </div>

      {activeTab === "pets" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Pets ({pets.length})</h2>
            <button
              onClick={() => {
                setEditingPet(null);
                setShowPetForm(true);
              }}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
            >
              <FaPlus />
              <span>Add New Pet</span>
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Species</th>
                    <th className="px-6 py-3 text-left">Breed</th>
                    <th className="px-6 py-3 text-left">Age</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet) => (
                    <tr key={pet._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold">{pet.name}</td>
                      <td className="px-6 py-4">{pet.species}</td>
                      <td className="px-6 py-4">{pet.breed}</td>
                      <td className="px-6 py-4">{pet.age}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            pet.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : pet.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {pet.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingPet(pet);
                              setShowPetForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePet(pet._id, pet.name)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "applications" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Pending
              </h3>
              <p className="text-4xl font-bold text-yellow-600">
                {getStatusCount("Pending")}
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Approved
              </h3>
              <p className="text-4xl font-bold text-green-600">
                {getStatusCount("Approved")}
              </p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Rejected
              </h3>
              <p className="text-4xl font-bold text-red-600">
                {getStatusCount("Rejected")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Applications</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <Loader />
          ) : applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-xl text-gray-600">No applications found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((application) => (
                <ApplicationCard
                  key={application._id}
                  application={application}
                  isAdmin={true}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {showPetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingPet ? "Edit Pet" : "Add New Pet"}
            </h2>
            <PetForm
              initialData={editingPet}
              onSubmit={editingPet ? handleUpdatePet : handleAddPet}
              onCancel={() => {
                setShowPetForm(false);
                setEditingPet(null);
              }}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
