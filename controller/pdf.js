import PdfPrinter from "pdfmake";
import fs from 'fs';
const fonts = {
    Roboto: {
      normal: './fonts/Roboto-Regular.ttf',
      bold: './fonts/Roboto-Medium.ttf',
      italics: './fonts/Roboto-Italic.ttf',
      bolditalics: './fonts/Roboto-MediumItalic.ttf'
    }
  };
const printer = new PdfPrinter(fonts);

export const generatePdf =(req,res) => {
const {datos_generales, datos_proveedor, datos_contrato, datos_tabla} = req.body;

const docDefinition = {
    header: function(currentPage, pageCount){
        return {
            text: [
            'Pagina ', 
            {text: currentPage.toString(), bold:true},
            ' de ', 
            {text: pageCount, bold: true }
            ],
            alignment: 'right',
            margin: [0,20,20,0]
        }
    },
    content: [
        {image:'./Logo.png',width:270, alignment:'left'},
        {columns: [
            {width: '*', text: '' },
            {width: 'auto',
                table: {
                    headerRows: 0,
                    widths: [230],
                    body:[
                        [{text: 'No. EXPEDIENTE', border: [true,true,true,false], fillColor: '#1155cc', bold: true, color: '#fff'}],
                        [{text: 'INSERTE NUMERO EXPEDIENTE', border: [true,false,true,true], bold: true}]
                    ]
                },
                alignment: 'center'        
            }
        ]},
        {text: [{text: 'Fecha de emisión: ', bold:true}, '01/01/2022\n\n'], alignment: 'right', margin: [0,0,40,0]},
        {text: 'INDUSTRIA NACIONAL DE LA AGUJA', bold: true, alignment:'center'},
        {text: 'ORDEN DE COMPRA\n\n', bold: true, alignment:'center'},
        {text: 'Unidad operativa de Compras y Contrataciones\n\n', alignment:'center'},
        {text: ['No. Orden: ', {text:"INAGUJA-2022-0016\n\n",bold:true}]},
        {text: ['Descripción: ', {text:"COMPRA DE UTENSILIOS PARA COCINCA DE LA INSTUTICION, DESTINADO A MIPIMES Y MIPYMES MUJER\n\n",bold:true}]},
        {text: ['Modalidad de compras: ', {text:"Compra por debajo del umbral\n\n",bold:true}]},
        {table: {
            widths:['*'], 
            body: [[{text:"Datos del Proveedor", bold:true, color: "#fff", fillColor:'#1155cc', border: [false]}]] 
        }},
        {text: ['\nRazón social: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['RNC: ' , {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['Nombre Comercial: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['RDomicilio Comercial: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['Telefono: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {table: {
            widths:['*'], 
            body: [[{text:"Datos Generales del Contrato", bold:true, color: "#fff", fillColor:'#1155cc', border: [false]}]] 
        }},
        {text: ['\nAnticipo: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['Forma de pago: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['RDomicilio Comercial: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['Plazo de pago con recepción conforme: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['Monto Total: ', {text: 'INSERTE TEXTO\n\n', bold:true}]},
        {text: ['Moneda: ', {text: 'IDOP\n\n', bold:true}]},
        {table: {
            widths:['*'], 
            body: [[{text:"Detalle", bold:true, color: "#fff", fillColor:'#1155cc', border: [false]}]] 
        }},
        {text:"\n"},
        {table: {
            widths:['auto','auto','*','auto','auto','auto','auto'], 
            body: [
                [
                    {text:"Item", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
                    {text:"Código", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
                    {text:"Descripción", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
                    {text:"Cantidad", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
                    {text:"Unidad", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
                    {text:"Precio", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
                    {text:"ITBIS", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
                ],
            ],
            },
            alignment: 'center' 
        },
        {text: "\n\n\n"},
        {table: {
            widths: ['*','auto'],
            body: [
                [{text:'Subtotal RD$', bold:true, alignment:'right', margin:[0,2.5,0,2.5]}, {text:'10,000.00', bold:true, alignment:'left', margin:[0,2.5,10,2.5]}],
                [{text:'Total descuento RD$', bold:true, alignment:'right', margin:[0,2.5,0,2.5]}, {text:'0.00', alignment:'left', margin:[0,2.5,10,2.5]}],
                [{text:'Total ITBIS RD$', bold:true, alignment:'right', margin:[0,2.5,0,2.5]}, {text:'18,000.00', alignment:'left', margin:[0,2.5,10,2.5]}],
                [{text:'Total otros impuestos RD$', bold:true, alignment:'right', margin:[0,2.5,0,2.5]}, {text:'165,000.00', alignment:'left', margin:[0,2.5,10,2.5]}],
                [{text:'Total RD$', bold:true, alignment:'right', margin:[0,2.5,0,2.5]}, {text:'118,000.00', bold:true, alignment:'left', margin:[0,2.5,10,2.5]}],
            ]
        }}
    ],
    footer: [
        {
            table: {
                widths:['*'], 
                body: [[{text:"FIRMAS RESPONSABLES AUTORIZADOS", bold:true, color: "#fff", fillColor:'#000', border: [false]}]] 
            },
            margin: [20,0]
        },
        {text:"\n\n\n"},
        {
            table: {
                widths:['*',50,'*'], 
                body: [
                    [{text: 'FIRMA', bold:true, border: [false,true,false,false], alignment:'center'},{text: '',border: [false]},{text: 'FIRMA', bold:true, border: [false,true,false,false], alignment:'center'}]
                ] 
            },
            margin: [20,0]
        },
        {text:"\n\n\n"},
        {
            table: {
                widths:['*',50,'*'], 
                body: [
                    [{text: 'Nombre y Apellido', bold:true, border: [false,true,false,false], alignment:'center'},{text: '',border: [false]},{text: 'Nombre y Apellido', bold:true, border: [false,true,false,false], alignment:'center'}]
                ] 
            },
            margin: [20,0]
        },
        {text: '\nINAGUJA-UC-CD-2022-0041', alignment:'center', fontSize: 10}
    ],
    pageMargins: [20,40,20,190]
}

const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();
res.json('Done')
}


