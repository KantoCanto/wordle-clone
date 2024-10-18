interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center shadow-xl">
      <div className="items-center bg-gray-900  p-6 rounded-lg shadow-lg">
        <h2 className=" text-2xl font-bold mb-4"> {message}</h2>
        <div className="flex justify-center">
          {" "}
          <button
            onClick={onClose}
            className="w-24 bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
