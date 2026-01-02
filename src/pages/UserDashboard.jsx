import { useState, useEffect } from "react";
import { applicationAPI } from "../api/applicationAPI";
import ApplicationCard from "../components/application/ApplicationCard";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await applicationAPI.getUserApplications();
      setApplications(data.applications);
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const getStatusCount = (status) => {
    return applications.filter((app) => app.status === status).length;
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">Manage your adoption applications</p>
      </div>

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
          <h3 className="text-lg font-semibold text-red-800 mb-2">Rejected</h3>
          <p className="text-4xl font-bold text-red-600">
            {getStatusCount("Rejected")}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">My Applications</h2>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              You haven't submitted any applications yet
            </p>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Browse available pets
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                isAdmin={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
