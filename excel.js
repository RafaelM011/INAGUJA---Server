import XLSX from 'xlsx';
import express from 'express';
import cors from 'cors';
import { generateOrder } from './controller/ordergenerator.js';

//Retrieve data from excel
const catalogo = XLSX.readFile('Catalogo_de_Bienes2.xlsx');  
const segmento = XLSX.readFile('Segmentos.xlsx');  
const familia = XLSX.readFile('Familias.xlsx');  
const clase = XLSX.readFile('Clases.xlsx');  

const sheetCatalogo = catalogo.SheetNames;
const sheetSegmento = segmento.SheetNames;
const sheetFamilia = familia.SheetNames;
const sheetClase = clase.SheetNames;

const data0 = XLSX.utils.sheet_to_json(catalogo.Sheets[sheetCatalogo[0]]);
const data1 = XLSX.utils.sheet_to_json(segmento.Sheets[sheetSegmento[0]]);
const data2 = XLSX.utils.sheet_to_json(familia.Sheets[sheetFamilia[0]]);
const data3 = XLSX.utils.sheet_to_json(clase.Sheets[sheetClase[0]]);

//Server
const server = express();
const PORT = process.env.PORT ?? 4000;
server.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`)})

//CORS and middleware
server.use(cors());
server.use(express.json());

//Server startup
server.get('/', (req,res) => res.json('server is running properly'))

//Get excel data
server.get('/getdata', (req,res) => {
    res.json({data0, data1, data2, data3})
})
//Put data and generate order
server.put('/createorder', generateOrder)
//Download data
server.get('/download', (req,res) => {
    res.download('./Orden.xlsx')
})