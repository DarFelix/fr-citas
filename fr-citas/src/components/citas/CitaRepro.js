import React, { useState, useEffect, useMemo, useRef} from 'react';
import Pagination from "@material-ui/lab/Pagination";
import '../../assets/css/StyleModal.css';
import {getCitasPendientes} from '../../services/citas/serviciosCitas';
import '../../assets/css/StyleTable.css';
import { useTable } from "react-table";
import Swal from 'sweetalert2';

export const CitaRepro = ({handleCloseModal}) => { 

  const [numeroDoc, setNumeroDoc] = useState('');

  const [citas, setCitas] = useState([]);
  const citasRef = useRef();
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
        //console.log(response.data);
        setNombresUsuario(response.data.citas[0].usuario.nombres+' '+ response.data.citas[0].usuario.apellidos);
        setTabla(true);
      })
      .catch((e) => {
        console.log(e);
       
      });
  };

  useEffect(retrieveCitas, [page, pageSize]);

  const reprogCita =() => {
    setTabla(false);
  }


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
        Header: "Nombre Médico",
        accessor: "medico.nombres",
      },
      {
        Header: "Apellidos Médico",
        accessor: "medico.apellidos",
      },
      {
        Header: "Reprogramar?",

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
            <h3>Reprogramar cita</h3>
            <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
          </div>
          <hr/>
        </div>

      </div>

      

      <div>
            <div className="account-details">
            <p id="description">Ingresa el número de documento del paciente para ver las citas que tienen pendientes por ser atendidas</p>
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