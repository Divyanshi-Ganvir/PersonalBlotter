import './Components.css';
import { useContext, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';
import { WebSocketContext } from "./WebSocketConnection"


function Table({table}) {
  const sharedData = useContext(WebSocketContext);
  const modules = [AllCommunityModule];
  const getRowId = useCallback((params) => String(params.data.CustomerID), []);
  const gridAPI = useRef(null);
  const onGridReady = (params) => {
    console.log("grid is ready", params.api)
    gridAPI.current = params.api;
  }

  useEffect(() => {
    console.log("returned update: ", sharedData?.returnedUpdate);
    console.log("gridAPI.current: ", gridAPI.current);
    console.log("duration: ", sharedData?.duration);
    if (!sharedData?.returnedUpdate || !gridAPI.current){
      return;
    }
    const cellNode = gridAPI.current.getRowNode(String(sharedData.returnedUpdate.CustomerID));
    cellNode.setDataValue(sharedData.returnedUpdate.column, sharedData.returnedUpdate.value);
  
  }, [sharedData?.returnedUpdate])
  
  return (
    <>
      <div className="table">
        <AgGridProvider modules={modules}>
          <div className="ag-theme-alpine" style={{ height: 500 }}>
            
            <AgGridReact
              onGridReady={onGridReady}
              getRowId={getRowId}
              rowData={table}
              cellFlashDuration={parseInt(sharedData?.duration) * 1000}
              columnDefs={[
                { field: "CustomerID", flex: 1 },
                { field: "CustomerName", flex: 2 },
                { field: "ContactName", flex: 2 },
                { field: "Address", flex: 2 },
                { field: "City", flex: 1 },
                { field: "PostalCode", flex: 1 },
                { field: "Country", flex: 1 },
                { field: "Updates", flex: 1, enableCellChangeFlash: true},
              ]}
            />
          </div>
        </AgGridProvider>
      </div>

    </>

  );
}

export default Table;