import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ApplicationCard = ({ application, isAdmin, onStatusUpdate }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-green-500" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        <img
          src={application.pet?.image}
          alt={application.pet?.name}
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">{application.pet?.name}</h3>
              <p className="text-gray-600">
                {application.pet?.species} - {application.pet?.breed}
              </p>
              {isAdmin && (
                <p className="text-sm text-gray-500 mt-1">
                  Applicant: {application.user?.name} ({application.user?.email}
                  )
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(application.status)}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  application.status
                )}`}
              >
                {application.status}
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <strong>Reason:</strong> {application.reason}
            </p>
            <p>
              <strong>Experience:</strong> {application.experience}
            </p>
            <p>
              <strong>Housing:</strong> {application.housingType}{" "}
              {application.hasYard && "(Has Yard)"}
            </p>
            {application.otherPets && (
              <p>
                <strong>Other Pets:</strong> {application.otherPets}
              </p>
            )}
            {application.adminNotes && (
              <p className="text-gray-700">
                <strong>Admin Notes:</strong> {application.adminNotes}
              </p>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Applied: {new Date(application.createdAt).toLocaleDateString()}
          </p>

          {isAdmin && application.status === "Pending" && onStatusUpdate && (
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => onStatusUpdate(application._id, "Approved")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
              >
                Approve
              </button>
              <button
                onClick={() => onStatusUpdate(application._id, "Rejected")}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
