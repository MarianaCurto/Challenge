import React from "react";
import JsonViewer from "./JsonViewer";
import { Button } from "antd";

const FinalJson = ({ showJson, setShowJson, combineData }) => {
  return (
    <div>
      {showJson && <JsonViewer jsonData={combineData} />}

      <Button type="primary" onClick={() => setShowJson(!showJson)}>
        {showJson ? "Ocultar JSON Final" : "Mostrar JSON Final"}
      </Button>
    </div>
  );
};

export default FinalJson;
