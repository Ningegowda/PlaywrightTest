import xlsx from 'xlsx';
import path from 'path';

type testData={
    username: string;
    password: string;
    expected: string;
    run: string;
}

export function readExcelData(filePath: string, sheetName: string): testData[] {
   const fullPath = path.resolve(filePath);
    console.log('Full Path is ', fullPath);

    const workbook = xlsx.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    return data as testData[];
}
