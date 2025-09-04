import React, { useRef, useState, useEffect } from "react";
import {
  Spreadsheet,
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective,
  RowDirective,
  RowsDirective,
  CellsDirective,
  CellDirective,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-react-spreadsheet";
import {accomplishmentData, print} from "./SpreadsheetData";

const MySpreadsheetComponent = () => {
  console.log('2')
  const spreadsheetRef = React.useRef(null);
  const [isSaved, setIsSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [spreadsheetInstance, setSpreadsheetInstance] = useState(null);

  
  const created = () => {
    let spreadsheet = spreadsheetRef.current;
    if (spreadsheet) {

      spreadsheet.cellFormat({ textAlign: 'center'}, 'A:M');
      spreadsheet.cellFormat({ verticalAlign: 'middle' }, 'A:M');
      spreadsheet.wrap('A:M', true);
      spreadsheet.numberFormat('.0', 'C2:C41');
      
      spreadsheet.numberFormat('.00', 'E2:E42');
      spreadsheet.numberFormat('.00', 'J2:J42');
      spreadsheet.numberFormat('.00', 'M2:M42');

      spreadsheet.numberFormat('0%', 'F2:F42');
      spreadsheet.numberFormat('0.00%', 'G2:G42');
      spreadsheet.numberFormat('0.00%', 'I2:I41');
      spreadsheet.numberFormat('0.00%', 'L2:L42');
      spreadsheet.numberFormat('0.00%', 'K2:K41');
      
    }
  };

const saveSpreadsheet = () => {
    try {
      const spreadsheet = spreadsheetRef.current;
      
      if (spreadsheet) {
        //Get the current data from the spreadsheet
        requestAnimationFrame(() => {
          const currentData = getSpreadsheetData(spreadsheet);

          //Save the data to localStorage
          localStorage.setItem('spreadsheetData', JSON.stringify(currentData));
          localStorage.setItem('spreadsheetSaveTime', new Date().toISOString());
          
          setIsSaved(true);
          setLastSaved(new Date());
          console.log('Data saved successfully!');
        });
        
      }
    } catch (error) {
      console.error('Error saving spreadsheet:', error);
    }
  };


const getSpreadsheetData = (spreadsheet) => {
  const data = [];
  
  // Optimized: Check sheet existence once
  const sheet = spreadsheet.sheets && spreadsheet.sheets[0];
  if (!sheet || !sheet.rows) return data;
  
  const rows = sheet.rows;
  const rowCount = rows.length;
  
  // Pre-allocate array size for better performance
  data.length = rowCount;
  
  for (let i = 0; i < rowCount; i++) {
    const row = rows[i];
    if (!row || !row.cells) {
      data[i] = {};
      continue;
    }
    
    const rowData = {};
    const cells = row.cells;
    const cellCount = cells.length;
    
    for (let j = 0; j < cellCount; j++) {
      const cell = cells[j];
      // Only save if there's actual data to avoid storing empty cells
      if (cell && (cell.value !== undefined || cell.formula !== undefined)) {
        rowData[`cell_${j}`] = {
          value: cell.value || '',
          formula: cell.formula || ''
        };
      }
    }
    
    data[i] = rowData;
  }
  
  return data;
};

  // Helper function to restore data to spreadsheet
const restoreSpreadsheetData = (spreadsheet, savedData) => {
  const sheet = spreadsheet.sheets && spreadsheet.sheets[0];
  if (!sheet || !sheet.rows) return;
  
  const rows = sheet.rows;
  const rowCount = Math.min(rows.length, savedData.length);
  
  for (let i = 0; i < rowCount; i++) {
    const row = rows[i];
    const savedRow = savedData[i];
    
    if (!row || !row.cells || !savedRow) continue;
    
    const cells = row.cells;
    const cellCount = cells.length;
    
    for (let j = 0; j < cellCount; j++) {
      const cell = cells[j];
      const cellKey = `cell_${j}`;
      const savedCell = savedRow[cellKey];
      
      if (cell && savedCell) {
        // Only update if values are different to prevent unnecessary re-renders
        if (cell.value !== savedCell.value) {
          cell.value = savedCell.value;
        }
        if (cell.formula !== savedCell.formula) {
          cell.formula = savedCell.formula;
        }
      }
    }
  }
};


// Load saved data automatically when component mounts
useEffect(() => {
  const loadSavedData = () => {
    try {
      const savedDataJson = localStorage.getItem('spreadsheetData');
      const saveTime = localStorage.getItem('spreadsheetSaveTime');
      
      if (savedDataJson && spreadsheetRef.current) {
        const savedData = JSON.parse(savedDataJson);
        const spreadsheet = spreadsheetRef.current;
        

        const loadWithRetry = (attempt = 0) => {
          if (spreadsheet.sheets && spreadsheet.sheets[0] && spreadsheet.sheets[0].rows) {
            // Spreadsheet is ready, restore data
            restoreSpreadsheetData(spreadsheet, savedData);
            setLastSaved(saveTime ? new Date(saveTime) : null);
            setIsSaved(true);
          } else if (attempt < 5) {
            //Retry after a short delay
            setTimeout(() => loadWithRetry(attempt + 1), 50 * (attempt + 1));
          }
        };
        
        loadWithRetry();
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  //delay
  const timer = setTimeout(loadSavedData, 50);
  return () => clearTimeout(timer);
}, []);

  //spreadsheet changes
  const onActionComplete = (args) => {
    const changeActions = [
      'cellSave', 'format', 'insertRow', 'insertColumn', 
      'deleteRow', 'deleteColumn', 'cut', 'copy', 'paste',
      'autoFill', 'clear', 'sort', 'filter'
    ];

    if (changeActions.includes(args.action)) {
      setIsSaved(false);
    }
  };

  const onCellEdit = (args) => {
    setIsSaved(false);
  };

  return (
    <div className="p-4">
      <div onClick={() => console.log('sdf')}>dsafh</div>
      <SpreadsheetComponent 
        created={created} 
        ref={spreadsheetRef} 
        actionComplete={onActionComplete}
        cellEdit={onCellEdit}
        allowInsert={true}
        allowDelete={true}
        allowEditing={true}
        allowSorting={true}
        allowFiltering={true}
        showFormulaBar={true}
        showSheetTabs={true}
        showRibbon={true}
        >
        <SheetsDirective>
          <SheetDirective name="Accomplishment Report">
            <RowsDirective>

            </RowsDirective>
            <RangesDirective>
              <RangeDirective dataSource={accomplishmentData}></RangeDirective>
            </RangesDirective>
            <ColumnsDirective>
              <ColumnDirective width={80}></ColumnDirective>
              <ColumnDirective width={250}></ColumnDirective>
              <ColumnDirective width={80}></ColumnDirective>
              <ColumnDirective width={80}></ColumnDirective>
              <ColumnDirective width={150}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={150}></ColumnDirective>
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
          <button 
          className="e-primary" 
          onClick={saveSpreadsheet}
          disabled={isSaved}
        >
          {isSaved ? 'Saved' : 'Save Changes'}
        </button>
        
        {lastSaved && (
          <span className="save-info">
            Last saved: {lastSaved.toLocaleString()}
          </span>
        )}
        
    </div>
  );
}

export default MySpreadsheetComponent;