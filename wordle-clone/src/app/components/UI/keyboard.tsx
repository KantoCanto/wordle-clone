type KeyboardProps = {
  onKeyPress: (key: string) => void;
  disabledKeys: string[];
};

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, disabledKeys }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  const handleClick = (key: string) => {
    if (!disabledKeys.includes(key)) {
      onKeyPress(key);
    }
  };

  return (
    <div className="flex flex-col my-auto  space-y-2 max-w-[75%]">
      <div className="flex gap-2 justify-center ">
        {row1.map((key) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            disabled={disabledKeys.includes(key)}
            className={`bg-gray-700   items-center justify-center rounded-lg p-3 min-w-10 ${
              disabledKeys.includes(key) ? "opacity-50 " : "hover:bg-gray-500"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-2 justify-center mb-2">
        {row2.map((key) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            disabled={disabledKeys.includes(key)}
            className={`key bg-gray-700 items-center justify-center rounded-lg p-3 min-w-10 ${
              disabledKeys.includes(key) ? "opacity-50 " : "hover:bg-gray-500"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex  gap-2 justify-center items-center justify-center mb-2">
        {row3.map((key) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            disabled={disabledKeys.includes(key)}
            className={`key bg-gray-700 rounded-lg p-3 min-w-10 flex items-center justify-center ${
              disabledKeys.includes(key) ? "opacity-50" : "hover:bg-gray-500"
            } ${key === "DELETE" ? "w-2 px-14" : ""}`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Keyboard;
