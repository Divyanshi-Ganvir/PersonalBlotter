import './Components.css';
import { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';


function Table({table}) {

  const modules = [AllCommunityModule];

  return (
    <>
      <div className="table">
        <AgGridProvider modules={modules}>
          <div className="ag-theme-alpine" style={{ height: 300 }}>
            <AgGridReact
              enableCellChangeFlash={true}
              rowData={table}
              columnDefs={[
                { field: "CustomerID", flex: 1 },
                { field: "CustomerName", flex: 2 },
                { field: "ContactName", flex: 2 },
                { field: "Address", flex: 2 },
                { field: "City", flex: 1 },
                { field: "PostalCode", flex: 1 },
                { field: "Country", flex: 1 },
                { field: "Updates", flex: 1 },
              ]}
            />
          </div>
        </AgGridProvider>
      </div>

    </>

  );
}

export default Table;