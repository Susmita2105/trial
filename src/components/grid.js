import React, { useEffect, useRef, useState } from 'react';
import './grid.css';
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { useNavigate } from 'react-router-dom';

function Grid() { 
  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    { headerName: "ID", field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "body" }
  ]);

  const defColumnOptions = {
    sortable: true, editable: true, filter: true, floatingFilter: true, flex: 1
  };

  const [gridHeight, setGridHeight] = useState('auto');
  const gridRef = useRef();
  const navigate = useNavigate();

  const onGridReady = (params) => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then((res) => {
        // const limitedData = res.slice(0, 10); 
        // params.api.applyTransaction({ add: limitedData });
        // setRowData(limitedData)

        // const filteredData = res.filter(item => item.id === 2|| item.id===4|| item.id===6|| item.id===8 || item.id===10); 
        // setRowData(filteredData); 

        params.api.applyTransaction({ add: res });
        setRowData(res); 
        
      });
  };


  const onRowClicked = (event) => {
    navigate(`/detail/${event.data.id}`);
  };

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      const rowCount = gridRef.current.api.getDisplayedRowCount();
      const rowHeight = gridRef.current.api.getSizesForCurrentTheme().rowHeight;
      const headerHeight = gridRef.current.api.getSizesForCurrentTheme().headerHeight;
      setGridHeight((rowCount * rowHeight) + headerHeight);
    }
  }, [rowData]);

  return (
    <div className='grid-container'>
      <div className="ag-theme-quartz" style={{ height: gridHeight, width: '100%' }} >
        <AgGridReact
          ref={gridRef}
          rowData={rowData} 
          columnDefs={colDefs}
          defaultColDef={defColumnOptions}
          domLayout='autoHeight'
          onGridReady={onGridReady}
          onRowClicked={onRowClicked} 
          pagination={true} 
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default Grid;
