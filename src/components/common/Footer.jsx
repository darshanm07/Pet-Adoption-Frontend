import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center space-x-2">
          <span>Made with</span>
          <FaHeart className="text-red-500" />
          <span>for pets in need</span>
        </p>
        <p className="mt-2 text-gray-400">
          © 2026 Pet Adoption System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
