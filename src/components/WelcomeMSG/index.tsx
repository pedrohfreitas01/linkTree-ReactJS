// src/components/WelcomeMessage/index.tsx
import React from "react";
import { IoMdClose } from "react-icons/io";

interface WelcomeMessageProps {
  onClose: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-11/12 mx-auto animate-bounceIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Bem-vindo(a) !
        </h2>
        <p className="text-gray-700">
          Utilize seu e-mail e senha cadastrados para acessar a área
          administrativa e testar o App.
        </p>
        <p className="text-gray-700 mt-2">email: teste@email.com | senha: 123456</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
