import XLSX from 'sheetjs-style'

export const generateOrder = (req,res) => {
    const {datos_generales, datos_proveedor, datos_contrato, datos_tabla} = req.body;

    const wb = XLSX.utils.book_new();
    const file = XLSX.readFile('./controller/ordenmodelo.xlsx');
    const sheets = file.SheetNames
    const ws = file.Sheets[sheets[0]];
    
    const docData = {
        datos_generales,
        datos_proveedor,
        datos_contrato
    }

    const tableData = datos_tabla.map(dato => {
        const {item, codigo, descripcion, cantidad, unidad, precio, itbis} = dato;
        const obj = {
            item,
            codigo,
            descripcion,
            d: "",
            e: "",
            cantidad,
            unidad,
            precio: parseInt(precio),
            itbis: parseInt(itbis)
        }
        return(obj)
    })

    const tableElementsLenght = tableData.length;
    const lastRow = 50 + tableElementsLenght;
    const tableColumns = ['A','B','C','D','E','F','G','H','I'];
    const merge = [];
    
    //ARRAY OF CELLS TO STYLE
    const cellsMiddleAlign = ['G3','G4','G5','C8','C9','C11','C44','A38','A42','F38','F42'];
    const cellsLeftAlign = ['C13','C14','C15','C19','C20','C21','C22','C23','C27','C28','C29','C30','C31'];
    const cellsBlueLeft = ['A17','A25','A48'];
    const cellsSign = ['A37','B37','C37','D37','F37','G37','H37','I37','A41','B41','C41','D41','F41','G41','H41','I41']
    const cellsDetailTable = ['A50','B50','C50','D50','E50','F50','G50','H50','I50',];
    
    //SIGN LINES
    ws.A37 = {t: "", v: ""}, ws.B37 = {t: "", v: ""}, ws.C37 = {t: "", v: ""}, ws.D37 = {t: "", v: ""};
    ws.A41 = {t: "", v: ""}, ws.B41 = {t: "", v: ""}, ws.C41 = {t: "", v: ""}, ws.D41 = {t: "", v: ""};
    
    ws.F37 = {t: "", v: ""}, ws.G37 = {t: "", v: ""}, ws.H37 = {t: "", v: ""}, ws.I37 = {t: "", v: ""}; 
    ws.F41 = {t: "", v: ""}, ws.G41 = {t: "", v: ""}, ws.H41 = {t: "", v: ""}, ws.I41 = {t: "", v: ""}; 
    
    //TOP RIGHT BOX BORDER
    ws.H3 = {t:"", v:"", s: {border:{top:{style:'medium'}}}}, ws.I3 = {t:"", v:"", s: {border:{top:{style:'medium'},right:{style:'medium'}}}}
    ws.H4 = {t:"", v:"", s: {border:{bottom:{style:'medium'}}}}, ws.I4 = {t:"", v:"", s: {border:{right:{style:'medium'},bottom:{style:'medium'}}}}
    ws.H1 = {...ws.H1, s:{alignment:{horizontal:"right"}}}
    
    //GENERAL
    ws.G4.v = docData.datos_generales.proceso;
    ws.G5.v = docData.datos_generales.fecha;
    ws.C9.v = docData.datos_generales.tipo;
    ws.C13.v = docData.datos_generales.numero;
    ws.C14.v = docData.datos_generales.descripcion;
    ws.C15.v = docData.datos_generales.modalidad;
    ws.C44.v = docData.datos_generales.proceso;
    //PROVEEDOR
    ws.C19.v = docData.datos_proveedor.razon;
    ws.C20.v = docData.datos_proveedor.rnc;
    ws.C21.v = docData.datos_proveedor.nombre;
    ws.C22.v = docData.datos_proveedor.domicilio;
    ws.C23.v = docData.datos_proveedor.telefono;
    //CONTRATO
    ws.C27.v = parseInt(docData.datos_contrato.anticipo);
    ws.C28.v = docData.datos_contrato.forma_de_pago;
    ws.C29.v = docData.datos_contrato.plazo;
    ws.C30.v = parseInt(docData.datos_contrato.monto);
    ws.C31.v = docData.datos_contrato.moneda;
    
    //STYLES
    cellsMiddleAlign.forEach(cell => {
        if( cell === 'G3'){
            ws[cell].s ={
                font: {
                    bold: true,
                    color: {rgb: "FFFFFF"}
                },
                fill: {
                    fgColor: {rgb: "1155CC"}
                },
                alignment: {
                    vertical: 'center',
                    horizontal: 'center'
                },
                border: {
                    top: {style: 'medium'},
                    left: {style: 'medium'},
                }
            }  
            return
        }   
        if( cell === "G4"){
            ws[cell].s = {
                font: {
                    bold: true
                },
                alignment: {
                    vertical: 'center',
                    horizontal: 'center'
                },
                border: {
                    left: {style: 'medium'},
                    bottom: {style: 'medium'}
                }
            }
            return
        }
        if( cell === "G5"){
            ws[cell].s = {
                font: {
                    bold: true
                },
                alignment: {
                    vertical: 'center',
                    horizontal: 'center'
                },
            }
            return
        }
        if( cell === 'C44'){
            ws[cell].s ={
                alignment: {
                    vertical: 'center',
                    horizontal: 'center'
                }
            }  
            return
        }
        ws[cell].s = {
            font: {
                bold: true
            },
            alignment: {
                vertical: 'center',
                horizontal: 'center'
            }
        }
    })
    
    cellsLeftAlign.forEach(cell => {
        ws[cell].s ={
            font: {
                bold: true
            },
            alignment: {
                vertical: 'center',
                horizontal: 'left',
                wrapText: true
            }
        }
    })
    
    cellsBlueLeft.forEach(cell => {
        ws[cell].s ={
            font: {
                bold: true,
                color: {rgb: "FFFFFF"}
            },
            fill: {
                fgColor: {rgb: "1155CC"}
            },
            alignment: {
                vertical: 'center',
                horizontal: 'left'
            }
        }
    })
    
    cellsSign.forEach(cell => {
        ws[cell].s =  {
            font: {
                bold: true
            },
            alignment: {
                vertical: 'center',
                horizontal: 'center'
            },
            border: {
                bottom: {
                    style: "thick"
                }
            }
        } 
    })
    
    ws.D50 = {t:"", v:""}, ws.E50 = {t:"", v:""},
    
    cellsDetailTable.forEach(cell => {
        ws[cell].s ={
            font: {
                bold: true,
                color: {rgb: "FFFFFF"}
            },
            fill: {
                fgColor: {rgb: "1155CC"}
            },
            alignment: {
                vertical: 'center',
                horizontal: 'center'
            },
            border: {
                top:{style:'medium'},
                bottom:{style:'medium'},
                left:{style:'medium'},
                right:{style:'medium'},
            }
        }
    })
    
    ws['A34'].s = {
        font: {
            bold: true,
            color: {rgb: "FFFFFF"}
        },
        fill: {
            fgColor: {rgb: "000000"}
        },
        alignment: {
            vertical: 'center',
            horizontal: 'left'
        }
    }
    ws.C11.s.font.bold = false;
    ws.A14 = {...ws.A14, s: {alignment: {vertical: 'center'}}};
    ws.C27 = {...ws.C27, z: "10"}
    ws.C30 = {...ws.C30, z: "4"}
    
    ws['!rows'] = []
    ws['!cols'] = [ 
        {wch: 8}, //A
        {wch: 12}, //B
        {wch: 8}, //C
        , //D
        , //E
        {wch: 8}, //F 
        {wch: 6}, //G
        {wch: 11}, //H
        {wch: 9}, //I
    ]
    
    ws['!margins'] = {
        left: 0.4,
        right: 0.4,
        top: 0.4,
        bottom: 0.4,
        header: 0,
        footer: 0
    }
    
    ws['!rows'][13] = {hpx: Math.ceil(ws.C14.v.length/45)*15}
    
    
    //Columna H, Columna I, z:'4'
    XLSX.utils.sheet_add_json(ws,tableData,{origin: "A51", skipHeader: true})
    for (let i = 51; i <= lastRow; i++){
        tableColumns.forEach(column => {
            if(column !== 'H' && column !== 'I'){
                ws[column.concat(i)].s = {
                    alignment: {
                        vertical: 'center',
                        horizontal: 'center'
                    },
                    border: {
                        top:{style:'medium'},
                        bottom:{style:'medium'},
                        left:{style:'medium'},
                        right:{style:'medium'},
                    }
                } 
            }else{
                for (let i = 51; i <= lastRow; i++){
                    ws[column.concat(i)].s = {
                        alignment: {
                            vertical: 'center',
                            horizontal: 'center'
                        },
                        border: {
                            top:{style:'medium'},
                            bottom:{style:'medium'},
                            left:{style:'medium'},
                            right:{style:'medium'},
                        }
                    }
                    ws[column.concat(i)].t = 'n'
                    ws[column.concat(i)].z = '4' 
                }  
            }
        })
        merge.push({s:{c:2, r:i-1}, e:{c:4, r:i-1}})
    }
    ws['!merges'] = ws['!merges'].concat(merge)
    
    XLSX.utils.book_append_sheet(wb,ws,'Orden');
    XLSX.writeFile(wb,'Orden.xlsx')
    res.json('Orden creada')
}