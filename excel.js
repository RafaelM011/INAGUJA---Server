import XLSX from 'xlsx';
import express from 'express';
import cors from 'cors';
// import {info} from './data.js'

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

// const segments = [];
// let Segmento = "";

// Defining segments, families and classes
// data.forEach(info => {
//     if (Segmento !== info['Código Producto'].toString().slice(0,6) + "00") {
//         Segmento = info['Código Producto'].toString().slice(0,6) + "00"
//         segments.push({Segmento})
//     }
// })

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

// const newBook = XLSX.utils.book_new();
// newBook.Props = {
//     Title: "Guia Imputacion",
//     Subject: "Catalogo",
//     Author: "Rafael Martinez",
//     CreatedDate: new Date()
// };
// const opts = { bookType:   "xlsx", bookSST:false, type:"array"};
// let copy = [];
// let del = [];
// let counter = 0;

/* Create New Book with 1 Sheet, from book with multiple sheets */

// for(let i = 1; i <= sheets.length; i += 2)
// {
//    let temp = XLSX.utils.sheet_to_json(file.Sheets[sheets[i]])
//    temp.forEach( sheet => {
//      data.push(sheet);
//    })
// }

/* ------------------------------------------------------------ */

/* Create New Book with Auxuliar on them */

// info.forEach((element,i) => {
//   data.forEach( obj => {
//     if (obj['Código\r\nProducto'] === parseInt(element[1])) {
//         if (obj.Auxiliar) {
//             copy.push(obj);
//             copy[copy.length-1].Auxiliar = element[8]
//             copy[copy.length-1].Denominacion = element[11]
//         }else{
//             obj.Auxiliar = element[8]
//             obj.Denominacion = element[11] 
//         }
//     }
//   })
// })

// data.push(...copy)

/* --------------------------------------------------------  */

/* Delete items that doesn't exists */

// data.forEach((obj,i) => {
//   if (!Boolean(obj?.Auxiliar)) del.push(i)
// })

// del.forEach(index => {
//   data.splice(index-counter,1)
//   counter++;
// })

/* ---------------------------------------------------------- */

//17131

// const worksheet = XLSX.utils.json_to_sheet(data.slice(0,data.length - 40))
// XLSX.utils.book_append_sheet(newBook,worksheet,"Catalogo");

// XLSX.writeFileXLSX(newBook, 'Segmentos.xlsx',opts);