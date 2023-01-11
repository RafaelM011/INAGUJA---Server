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
const {proceso, fecha, tipo, numero, descripcion, modalidad} = datos_generales;
const {razon, rnc, nombre, domicilio, telefono} = datos_proveedor;
const {anticipo, forma_de_pago, plazo, monto, moneda} = datos_contrato;

const tabla = datos_tabla.map(dato => {
    const {item, codigo, descripcion, cantidad, unidad, precio, itbis} = dato;
    return [
        {text:item, margin:[0,2.5,0,2.5]},
        {text:codigo, margin:[0,2.5,0,2.5]},
        {text:descripcion, alignment:'left', margin:[0,2.5,0,2.5]},
        {text:cantidad, margin:[0,2.5,0,2.5]},
        {text:unidad, margin:[0,2.5,0,2.5]},
        {text:precio, margin:[0,2.5,0,2.5]},
        {text:itbis, margin:[0,2.5,0,2.5]},
    ]
})
tabla.unshift(
    [
        {text:"Item", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
        {text:"Código", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
        {text:"Descripción", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
        {text:"Cantidad", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
        {text:"Unidad", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
        {text:"Precio", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
        {text:"ITBIS", bold:true, color: "#fff", fillColor:'#1155cc', margin:[0,2.5,0,2.5]},
    ]
)

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
                        [{text: proceso, border: [true,false,true,true], bold: true}]
                    ]
                },
                alignment: 'center'        
            }
        ]},
        {text: [{text: 'Fecha de emisión: ', bold:true}, fecha + '\n\n'], alignment: 'right', margin: [0,0,40,0]},
        {text: 'INDUSTRIA NACIONAL DE LA AGUJA', bold: true, alignment:'center'},
        {text: tipo + '\n\n', bold: true, alignment:'center'},
        {text: 'Unidad operativa de Compras y Contrataciones\n\n', alignment:'center'},
        {text: ['No. Orden: ', {text: numero + "\n\n",bold:true}]},
        {text: ['Descripción: ', {text: descripcion + "\n\n",bold:true}]},
        {text: ['Modalidad de compras: ', {text: modalidad + "\n\n",bold:true}]},
        {table: {
            widths:['*'], 
            body: [[{text:"Datos del Proveedor", bold:true, color: "#fff", fillColor:'#1155cc', border: [false]}]] 
        }},
        {text: ['\nRazón social: ', {text: razon + '\n\n', bold:true}]},
        {text: ['RNC: ' , {text: rnc + '\n\n', bold:true}]},
        {text: ['Nombre Comercial: ', {text: nombre + '\n\n', bold:true}]},
        {text: ['RDomicilio Comercial: ', {text: domicilio + '\n\n', bold:true}]},
        {text: ['Telefono: ', {text: telefono + '\n\n', bold:true}]},
        {table: {
            widths:['*'], 
            body: [[{text:"Datos Generales del Contrato", bold:true, color: "#fff", fillColor:'#1155cc', border: [false]}]] 
        }},
        {text: ['\nAnticipo: ', {text: anticipo + '\n\n', bold:true}]},
        {text: ['Forma de pago: ', {text: forma_de_pago + '\n\n', bold:true}]},
        {text: ['Plazo de pago con recepción conforme: ', {text: plazo + '\n\n', bold:true}]},
        {text: ['Monto Total: ', {text: monto + '\n\n', bold:true}]},
        {text: ['Moneda: ', {text: moneda + '\n\n', bold:true}]},
        {table: {
            widths:['*'], 
            body: [[{text:"Detalle", bold:true, color: "#fff", fillColor:'#1155cc', border: [false]}]] 
        }},
        {text:"\n"},
        {table: {
            widths:['auto','auto','*','auto','auto','auto','auto'], 
            body: tabla,
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
        {text: '\n' + proceso, alignment:'center', fontSize: 10}
    ],
    pageMargins: [20,40,20,190]
}


const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('Orden.pdf'));
pdfDoc.end();
res.json('Orden Generada')
}


