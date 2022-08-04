import React, { useState, useEffect, useMemo, useRef} from 'react';
import Pagination from "@material-ui/lab/Pagination";
import '../../assets/css/StyleModal.css';
import {getCitasPendientes, payCita} from '../../services/citas/serviciosCitas';
import '../../assets/css/StyleTable.css';
import { useTable } from "react-table";
import Swal from 'sweetalert2';
 

export const CitaPay = ({handleCloseModal}) => {

  const [numeroDoc, setNumeroDoc] = useState('');
  const [citas, setCitas] = useState([]);
  const citasRef = useRef();
  const [idCit, setIdCit] = useState('');
  const [estadoPago, setEstadoPago] = useState('');

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [nombresUsuario, setNombresUsuario] = useState('');

  const [tabla, setTabla] = useState(false);

  citasRef.current = citas;

  const handleInputChange = ({ target })=> {
    const {name, value} = target;
    
    if(name === 'numeroDoc'){
      setNumeroDoc(value);
    }
    
  }

  const getRequestParams = (page, pageSize, numeroDoc) => {
    let params = {};
    
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (numeroDoc) {
      params["documento"] = numeroDoc;
    }
    return params;
  };

  const retrieveCitas = () => {

    const params = getRequestParams( page, pageSize, numeroDoc);
  
    getCitasPendientes(params)
      .then((response) => {
        const { citas, totalPages } = response.data;
        setCitas(citas);
        setCount(totalPages);
        setNombresUsuario(response.data.citas[0].usuario.nombres+' '+ response.data.citas[0].usuario.apellidos);
        setTabla(true); 
        
      })
      .catch((e) => {
        console.log(e);
       
      });
  };

  useEffect(()=>{
    if(numeroDoc !== ''){
    retrieveCitas();
    }
  },[page, pageSize]);

  const obtenerDatosCita = (rowIndex, rowPago) => {
    setIdCit(rowIndex);
    setEstadoPago(rowPago);
    
  }


  const pagarCit =  () =>{

    try{
        if(estadoPago === 'NO_PAGADA'){
         
          Swal.fire({
            title: '¿Pagar cita?',
            text: "Esta acción no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, pagar!',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Cita pagada!',
                'El pago ha sido confirmado.',
                'success'
              )
              payCita(idCit);
              

              setIdCit('');
              setEstadoPago('');

              retrieveCitas();
              
            }else{
              setIdCit('');
              setEstadoPago('');
              retrieveCitas();
            }

          })

        }

        if(estadoPago === 'PAGADA'){
         
              Swal.fire(
                'Cita ya pagada!',
                'El cliente ya había pagado esta cita',
                'success'
              )
              setIdCit('');
              setEstadoPago('');
             
            }
         

      

     }catch(error){
       console.log(error);
      
     }
  }

  useEffect(()=>{
    if(idCit !== '' && idCit !== undefined){

      pagarCit();
      
    }
  }, [idCit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Fecha Cita",
        accessor: "fechaCita",
      },
      {
        Header: "Consulta",
        accessor: "consulta.especialidad.nombre",
      },
      {
        Header: "Estado de pago",
        accessor: "estadoPago",
      },
      {
        Header: "¿Pagar?",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.idCita;
          const rowPago = props.row.original.estadoPago;
          return (
            <div>
              <span onClick={() => obtenerDatosCita(rowIdx, rowPago)}>
                <i className="fa-solid fa-money-bill-wave"></i>
              </span>
            </div>
          );
        },

      },
    ],
    []
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: citas,
  });






  return (
    <div className='modal-style'>
     <div className='container-fluid'>

      <div className='row'>
        <div className='col'>
          <div className='modal-style-header'>
            <h3>Pagar cita</h3>
            <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
          </div>
          <hr/>
        </div>
      </div>

      <div>
            <div className="account-details">
            <p id="description">Ingresa el número de documento del paciente para ver las citas que tienen pendientes y su estado de pago:</p>
                <div><label>Número de documento*</label><input 
                                                          type="number" 
                                                          onChange={(e) => handleInputChange(e)}
                                                          name="numeroDoc"
                                                          required/></div>
                <div><button id='btn-buscar-usuario' onClick={retrieveCitas}>Consultar</button></div>
            </div>
      </div>

      {
      tabla === true &&
      <div> 

            <div className="list row">
                <div className="col-md-12 list">
                  <div className="mt-3">
                    {"Filas por página: "}
                    <select onChange={handlePageSizeChange} value={pageSize} id='select-pages'>
                      {pageSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    <Pagination
                      className="my-3"
                      count={count}
                      page={page}
                      siblingCount={1}
                      boundaryCount={1}
                      variant="outlined"
                      shape="rounded"
                      onChange={handlePageChange}
                    />
                  </div>

                  <div> 
                    <h5>Citas de {nombresUsuario}</h5>
                  </div>


                  <div className='table-wrapper'>
                  <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div> 
                </div>
            </div>


      </div>
      }



     </div>
    </div>
  )
}