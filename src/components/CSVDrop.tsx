import { CSVReader } from 'react-papaparse';

export const CSVDrop = () => {
    const handleOnDrop = (data) => {
        console.log(data);
      };
    
      const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
      };
    
      const handleOnRemoveFile = (data) => {
        console.log('---------------------------');
        console.log(data);
        console.log('---------------------------');
      };

    return(
  <>
        <h5>Click and Drag Upload</h5>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </>
)}
