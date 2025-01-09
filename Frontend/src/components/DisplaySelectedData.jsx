"use client"
import React from "react";
import PropTypes from "prop-types";

const DisplaySelectedData = ({ selecteddata }) => {
  return (
    <div className="bg-green-300 h-20 w-full overflow-auto">
      {selecteddata.map((DT, index) => (
        <React.Fragment key={index}>
          <h1>{DT.name}</h1>
          <h1>{DT.language}</h1>
          <h1>{DT.value}</h1>
        </React.Fragment>
      ))}
    </div>
  );
};

DisplaySelectedData.propTypes = {
  selecteddata: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      language: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

export default DisplaySelectedData;
