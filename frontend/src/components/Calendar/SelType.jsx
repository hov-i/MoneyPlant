import React, { useState } from "react";

const SelType = ({ onChange, value }) => {
    const handleCategoryChange = (e) => {
        const newValue = parseInt(e.target.value);
        onChange(newValue);
    };

  return (
      <div>
        <select className="dropBox" value={value} onChange={handleCategoryChange}>
          <option value="1">시급</option>
          <option value="2">건별</option>
          <option value="3">일급</option>
          <option value="4">월급</option>
        </select>
      </div>
  );
};

export default SelType;
