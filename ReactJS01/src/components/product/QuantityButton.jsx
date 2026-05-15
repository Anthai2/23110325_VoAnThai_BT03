import React from "react";

const QuantityButton = ({ value, setValue, min = 1, max = 9999 }) => {
  const dec = () => setValue((v) => Math.max(min, (v || 0) - 1));
  const inc = () => setValue((v) => Math.min(max, (v || 0) + 1));

  return (
    <div className="inline-flex items-center border rounded">
      <button onClick={dec} className="px-3 py-1">
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value || 0);
          if (Number.isNaN(n)) return;
          setValue(Math.max(min, Math.min(max, n)));
        }}
        className="w-16 text-center"
      />
      <button onClick={inc} className="px-3 py-1">
        +
      </button>
    </div>
  );
};

export default QuantityButton;
