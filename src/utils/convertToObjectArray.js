import * as XLSX from 'xlsx';

export const ConverToObjectArray = async (file) => {
  let result = [];
  let fileReader = new FileReader();

  fileReader.readAsBinaryString(file);
  fileReader.onload = (event) => {
    let data = event.target.result;
    let workbook = XLSX.read(data, { type: 'binary' });

    workbook.SheetNames.forEach(sheet => {
      let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
      // let jsonObject = JSON.stringify(rowObject);
      result.push(rowObject);
    });
  };

  return result;
};

export default ConverToObjectArray;
