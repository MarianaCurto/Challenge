import React from "react";

const JsonViewer = ({ jsonData }) => {
  return <pre>{JSON.stringify(jsonData, null, 2)}</pre>;
};

export default JsonViewer;
