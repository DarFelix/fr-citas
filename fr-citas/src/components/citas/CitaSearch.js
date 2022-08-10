import React, { useState, useEffect, useMemo, useRef} from 'react';
import Pagination from "@material-ui/lab/Pagination";
import '../../assets/css/StyleModal.css';
import {buscarCitaSpec} from '../../services/citas/serviciosCitas';
import '../../assets/css/StyleTable.css';
import { useTable } from "react-table";

export const CitaSearch = ({handleCloseModal}) => {

  const [sortBy, setSortBy] = useState('');
  const [palabra, setPalabra] = useState('');
  const [fecha, setFecha] = useState('');
  const [atencion, setAtencion] = useState('');
  const [pago, setPago] = useState('');
  const [espec, setEspec] = useState('');


  const [citas, setCitas] = useState([]);
  const citasRef = useRef();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [tabla, setTabla] = useState(false);
  const [form, setForm] = useState(true);

  citasRef.current = citas;


  const handleInputChange = ({target}) =>{

    const {name, value} = target;

    if(name === 'orden'){
      setSortBy(value);
    }
    if(name === 'palabra'){
      setPalabra(value);
    }
    if(name === 'fecha'){
      setFecha(value)
    }
    if(name === 'atencion'){
      setAtencion(value);
    }
    if(name === 'pago'){
      setPago(value);
    }
    if(name === 'espec'){
      setEspec(value);
    }

  }


  const getRequestParams = (page, pageSize, sortBy, palabra, fecha, atencion, pago, espec) => {
    let params = {};
    
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["pageSize"] = pageSize;
    }
    if (sortBy) {
      params["sortBy"] = sortBy;
    }

    if(palabra) {
      params['text'] = palabra;
    }

    if(fecha){
      params['fechaCita'] = fecha;
    }

    if(atencion){
      params['estadoAtencion'] = atencion;
    }

    if(pago){
      params['estadoPago'] = pago;
    }

    if(espec){
      params['consultasIds'] = espec;
    }
    return params;
  };

 


  const retrieveCitas = async () => {

    const params = getRequestParams( page, pageSize, sortBy, palabra, fecha, atencion, pago, espec);

    console.log(params);
    
    await buscarCitaSpec( params)
      .then((response) => {
        const { citas, totalPages } =  response.data;
        console.log(response.data);
        setCitas(citas);
        setCount(totalPages); 
        setForm(false);
        setTabla(true);
        
      }) 
      .catch((e) => {
        console.log(e);
       
      });
  };


  useEffect(()=>{
    if(form !== true && tabla !== false){
    retrieveCitas();
    }
  },[page, pageSize]);

  const cerrarTabla = () => {
        setTabla(false);
        setForm(true);
        setSortBy('');
        setPalabra('');
        setFecha('');
        setAtencion('');
        setPago('');
        setEspec('');
        setCitas([]);
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
        Header: "ID Registro",
        accessor: "idCita",
      },
      {
        Header: "Nombre Usuario",
        accessor: "usuario.nombres",
      },
      {
        Header: "Apellidos Usuario",
        accessor: "usuario.apellidos",
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
        Header: "Estado atención",
        accessor: "estadoAtencion",
      },
      {
        Header: "Estado de pago",
        accessor: "estadoPago",
      },
      {
        Header: "Fecha de creación",
        accessor: "fechaCreacion",
      },
      {
        Header: "Fecha de actualización",
        accessor: "fechaActualizacion",
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
            <h3>Búsqueda de citas</h3>
            <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
          </div>
          <hr/>
          
        </div>
      </div>


    {form === true &&
    <div>
      <p id="description">Por favor ingresa al menos un parámetro de búsqueda:</p>
    
          <div className="account-details">
                                        <div><label>Ordenar por:</label>
                                                            <select className="form-select" 
                                                              required 
                                                              onChange={(e) => handleInputChange(e)}
                                                              name='orden'
                                                              >
                                                                <option value="">--SELECCIONE--</option>
                                                                <option value="idCita">ID de registro en BD</option>
                                                                <option value="fechaCita">Fecha de cita</option>
                                                                <option value="fechaCreacion">Fecha de creación</option>
                                                                <option value="fechaActualizacion">Fecha de actualización</option>
                                                              </select>
                                      </div> 
        </div>

    

        <div className="account-details">
                                     <div><label>Palabra clave:</label>
                                                            <input  
                                                            type="text"
                                                            onChange={(e) => handleInputChange(e)}
                                                             name="palabra" 
                                                             id ='inp-form'
                                                             required/>
                                    </div>
        </div>

      <div className="account-details">
                                     <div><label>Fecha de cita:</label>
                                                            <input  
                                                              type="date"
                                                              onChange={(e) => handleInputChange(e)}
                                                             name="fecha" 
                                                             required/>
                                    </div>
    </div>

    <div className="account-details">
                                        <div><label>Estado de atención:</label>
                                                            <select className="form-select" 
                                                              required 
                                                              onChange={(e) => handleInputChange(e)}
                                                              name='atencion'
                                                              >
                                                                <option value="">--SELECCIONE--</option>
                                                                <option value="PENDIENTE">PENDIENTE</option>
                                                                <option value="ATENDIDA">ATENDIDA</option>
                                                                <option value="PERDIDA">PERDIDA</option>
                                                                <option value="CANCELADA">CANCELADA</option>
                                                              </select>
                                      </div> 
    </div>

    <div className="account-details">
                                        <div><label>Estado de pago:</label>
                                                            <select className="form-select" 
                                                              required 
                                                              onChange={(e) => handleInputChange(e)}
                                                              name='pago'
                                                              >
                                                                <option value="">--SELECCIONE--</option>
                                                                <option value="PAGADA">PAGADA</option>
                                                                <option value="NO_PAGADA">NO_PAGADA</option>
                                                              </select>
                                      </div> 
      </div>

      <div className="account-details">
                                     <div><label>Especialidades 'ids':</label>
                                                            <input  
                                                              type="text"
                                                              onChange={(e) => handleInputChange(e)}
                                                             name="espec" 
                                                             id ='inp-form'
                                                             required/>
                                    </div>
        </div>

      
        <div className="container-btn-crear">
                              <button id='btn-crear-cita' onClick={retrieveCitas}>Buscar</button>
        </div>

        </div>
        }

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

                          <div className="container-btn-crear">
                              <button id='btn-crear-cita' onClick={cerrarTabla}>Regresar</button>
                          </div>

                          </div> 
                        </div>
                    </div>

                    
              </div>
      }



     </div>
    </div>
  )
}