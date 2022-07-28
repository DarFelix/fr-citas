import React, { useState, useEffect, useMemo, useRef} from 'react';
import Pagination from "@material-ui/lab/Pagination";
import '../../assets/css/StyleModal.css';
import {getCitas} from '../../services/citas/serviciosCitas';
import '../../assets/css/StyleTable.css';
import { useTable } from "react-table";

export const CitaList = ({handleCloseModal}) => {

const [citas, setCitas] = useState([]);
const citasRef = useRef();

const [sortBy, setSortBy] = useState('idCita');
const [page, setPage] = useState(1);
const [count, setCount] = useState(0);
const [pageSize, setPageSize] = useState(3);
const pageSizes = [3, 6, 9];

citasRef.current = citas;

const getRequestParams = (page, pageSize, sortBy) => {
  let params = {};
  
  if (page) {
    params["page"] = page - 1;
  }
  if (pageSize) {
    params["size"] = pageSize;
  }
  if (sortBy) {
    params["sortBy"] = 'idCita';
  }
  return params;
};

const retrieveCitas = () => {
  const params = getRequestParams( page, pageSize, sortBy);

  getCitas(params)
    .then((response) => {
      const { citas, totalPages } = response.data;
      setCitas(citas);
      setCount(totalPages);
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

useEffect(retrieveCitas, [page, pageSize]);

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
      Header: "Cita ID",
      accessor: "idCita",
    },
    {
      Header: "Fecha Cita",
      accessor: "fechaCita",
    },
    {
      Header: "Consulta",
      accessor: "consulta.especialidad.nombre",
    },
    {
      Header: "Nombres Paciente",
      accessor: "usuario.nombres",
    },
    {
      Header: "Apellidos Paciente",
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
      Header: "Correo paciente",
      accessor: "usuario.correo",
    },
    {
      Header: "Estado atención",
      accessor: "estadoAtencion",
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

          <div className='modal-style-header'>
            <h3>Listar citas</h3>
            <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
          </div>
          <hr/>
      

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
                  </div> 
                  

                </div>

               

              </div>
              

    </div>
  )
}

/*


const listarCitas = async () => {
  try{
    const {data} = await listaPag();
    setCitas(data);

  }catch(error){
    console.log(error);
  }
}

useEffect(()=> {
  listarCitas();
}, []);

  return (
    <div className='modal-style'>

     <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='modal-style-header'>
            <h3>Listar citas</h3>
            <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
          </div>
          <hr/>
          <div className='table-wrapper'>
          <table className="table table-light table-striped "  > 
              <thead>
                <tr>
                  <th scope="col">Cita ID</th>
                  <th scope="col">Fecha Cita</th>
                  <th scope="col">Nombre Paciente</th>
                  <th scope="col">Apellido Paciente</th>
                  <th scope="col">Nombre Médico</th>
                  <th scope="col">Apellido Médico</th>
                  <th scope="col">Correo Paciente</th>
                  <th scope="col">Estado Cita</th>
                </tr>
              </thead>
              <tbody>
                {
                citas.map((item) => (
                <tr key={item.idCita}>
                  
                <td>{item.idCita}</td>
                <td>{item.fechaCita}</td>
                <td>{item.usuario.nombres}</td>
                <td>{item.usuario.apellidos}</td>
                <td>{item.medico.nombres}</td>
                <td>{item.medico.apellidos}</td>
                <td>{item.usuario.correo}</td>
                <td>{item.estadoAtencion}</td>
              
                </tr>
                ))
                }
               
                
              </tbody>
            </table>

            </div>

            <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link">Previous</a>
                    </li>
                    
                 
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                   
                    
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
            </nav>

        </div>

      </div>

     </div>

    </div>
  )
}
*/