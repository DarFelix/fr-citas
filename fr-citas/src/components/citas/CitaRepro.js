import React, { useState, useEffect, useMemo, useRef} from 'react';
import Pagination from "@material-ui/lab/Pagination";
import '../../assets/css/StyleModal.css';
import {getCitasPendientes, reprogCita} from '../../services/citas/serviciosCitas';
import {getMedicsByConsulta, getUserByDoc} from '../../services/usuarios/serviciosUsuarios';
import '../../assets/css/StyleTable.css';
import { useTable } from "react-table";
import Swal from 'sweetalert2';
 

export const CitaRepro = ({handleCloseModal}) => { 

  const [numeroDoc, setNumeroDoc] = useState('');

  const [citas, setCitas] = useState([]);
  const [cita, setCita] = useState();
  const citasRef = useRef();
  const [idCit, setIdCit] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [nombresUsuario, setNombresUsuario] = useState('');
  const [tabla, setTabla] = useState(false);
  const [form, setForm] = useState(false);
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  const [fechaCita, setFechaCita] = useState();
  const[arregloMedicos, setArregloMedicos] = useState([]);
  const[idMedico, setIdMedico] = useState('');
  const[medico, setMedico] = useState();

  const [valoresForm, setValoresForm] = useState({});
  const {fech='', hor='', medic=''} = valoresForm;

  citasRef.current = citas;


  const handleInputChange = ({ target })=> {
    const {name, value} = target;
    
    setValoresForm({fech, hor, medic});
    if(name === 'numeroDoc'){
      setNumeroDoc(value);
    }
    if (name === 'fecha'){
      setFecha(value);
      setValoresForm({fech: value, hor, medic});
    }
    if (name === 'hora'){
      setHora(value);
      setValoresForm({fech, hor: value, medic});
      console.log(hora);
    }
    if (name === 'medico'){
      setIdMedico(value);
      setValoresForm({fech, hor, medic: value});
      console.log(idMedico);
    }
   
   if(name !== ''){
    setFechaCita(fech+'T'+hor);
   }

  } 

  console.log(valoresForm);
  console.log(idMedico);

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

  const obtenerIdCita = async (rowIndex) => {
    setTabla(false);
    setIdCit(rowIndex);
  
  }

  useEffect(()=>{
    if(idCit !== '' && idCit !== undefined ){
    setForm(true);
    obtenerIdCita();
    
    const obj = citas[idCit];
    
    if(obj){
      setCita(obj);
    }
    }
    
  }, [idCit]);

  useEffect(()=>{   
    if(cita !== undefined ){
    setValoresForm({
      fech: cita.fechaCita.substring(0,10), 
      hor: cita.fechaCita.substring(11,19),
      medic: cita.medico.numeroDoc
    
   }
   ); 
  }
}, [cita]);


const listarMedicos = async () =>{
  try{
    const {data} = await getMedicsByConsulta(cita.consulta.idConsulta);
    setArregloMedicos(data);
  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  if(cita !== undefined){
    listarMedicos();
  }
}, [cita]);


const getMedico = async ()=>{
  try{
      const {data} = await getUserByDoc(idMedico);
      setMedico(data);
      
    } catch (error){
      console.log(error);
      
  }
}

useEffect(()=>{
  if(idMedico !== ''){
  getMedico();
  }
}, [idMedico]);


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
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
         
          return (
            <div>
              <span onClick={() => obtenerIdCita(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
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


 


  const confirmarRep = async(e) => {
    e.preventDefault();
    
      const cuerpo = {
        fechaCita: fechaCita,
        usuario: cita.usuario,
        medico: medico,
        consulta: cita.consulta,
        descuentoMotivo: cita.descuentoMotivo
      }

      console.log(cuerpo);
    
  
            try{
              Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
              });
              Swal.showLoading();

                await reprogCita(cita.idCita, cuerpo);
                
          

              Swal.close();
              Swal.fire(
                'Cita reprogramada con éxito',
                'Consulta: '+cita.consulta.especialidad.nombre+'. Médico: '+medico.nombres+' '+medico.apellidos+'. Fecha: '+fech+'. Hora: '+hor+'.',
                'success' 
                );
            
            setForm(false);
          }catch(error){
            Swal.close();
            let msj;
            console.log(error);
            if(error && error.response && error.response.data && error.response.data.message){
                msj = error.response.data.message;
            } else {
                msj = 'Ocurrio un error, por favor verifique';
            }
            Swal.fire('Error', msj ,'error');  
            e.target.reset();
          }
  }

  
  
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
      {
      form === true &&
        <div>

            <form onSubmit={(e) => confirmarRep(e)}>

            <h5>Datos de la cita:</h5>
            <div className="account-details">
                                     <div>
                                      <label>Fecha de cita: </label>
                                      <label>{cita.fechaCita}</label>
                                    </div>
            </div>
            <div className="account-details">
                                     <div>
                                      <label>Consulta: </label>
                                      <label>{cita.consulta.especialidad.nombre}</label>
                                    </div>
            </div>
            <div className="account-details">
                                     <div>
                                      <label>Médico: </label>
                                      <label>{cita.medico.nombres} {cita.medico.apellidos }</label>
                                    </div>
            </div>
            <h5>Actualización:</h5>
            <div className="account-details">
                                     <div><label>Nueva fecha de cita</label>
                                                            <input  
                                                              type="date"
                                                             name="fecha" 
                                                             value={fech}
                                                             onChange={ (e) => handleInputChange(e)}
                                                             required/>
                                    </div> 
            </div>
            <div className="account-details">
                                    <div><label>Nueva hora de cita</label>
                                                        <select className="form-select" 
                                                          required 
                                                          name='hora'
                                                          value={hor}
                                                          onChange={ (e) => handleInputChange(e)}
                                                          >
                                                            <option value="">--SELECCIONE--</option>
                                                            <option value="06:00:00">06:00 AM</option>
                                                            <option value="06:20:00">06:20 AM</option>
                                                            <option value="06:40:00">06:40 AM</option>
                                                            <option value="07:00:00">07:00 AM</option>
                                                            <option value="07:20:00">07:20 AM</option>
                                                            <option value="07:40:00">07:40 AM</option>
                                                            <option value="08:00:00">08:00 AM</option>
                                                            <option value="08:20:00">08:20 AM</option>
                                                            <option value="08:40:00">08:40 AM</option>
                                                            <option value="09:00:00">09:00 AM</option>
                                                            <option value="09:20:00">09:20 AM</option>
                                                            <option value="09:40:00">09:40 AM</option>
                                                            <option value="10:00:00">10:00 AM</option>
                                                            <option value="10:20:00">10:20 AM</option>
                                                            <option value="10:40:00">10:40 AM</option>
                                                            <option value="11:00:00">11:00 AM</option>
                                                            <option value="11:20:00">11:20 AM</option>
                                                            <option value="11:40:00">11:40 AM</option>
                                                            <option value="12:00:00">12:00 PM</option>
                                                            <option value="12:20:00">12:20 PM</option>
                                                            <option value="12:40:00">12:40 PM</option>
                                                            <option value="13:00:00">01:00 PM</option>
                                                            <option value="13:20:00">01:20 PM</option>
                                                            <option value="13:40:00">01:40 PM</option>
                                                            <option value="14:00:00">02:00 PM</option>
                                                            <option value="14:20:00">02:20 PM</option>
                                                            <option value="14:40:00">02:40 PM</option>
                                                            <option value="15:00:00">03:00 PM</option>
                                                            <option value="15:20:00">03:20 PM</option>
                                                            <option value="15:40:00">03:40 PM</option>
                                                            <option value="16:00:00">04:00 PM</option>
                                                            <option value="16:20:00">04:20 PM</option>
                                                            <option value="16:40:00">04:40 PM</option>
                                                            <option value="17:00:00">05:00 PM</option>
                                                            <option value="17:20:00">05:20 PM</option>
                                                            <option value="17:40:00">05:40 PM</option>
                                                            <option value="18:00:00">06:00 PM</option>
                                                            <option value="18:20:00">06:20 PM</option>
                                                            <option value="18:40:00">06:40 PM</option>
                                                            <option value="19:00:00">07:00 PM</option>
                                                          </select>
                                  </div>
              </div>

              <div className="account-details">
                              <div><label>Médico</label>
                                                            <select className="form-select"
                                                              required
                                                              name='medico'
                                                              value={medic}
                                                              onChange={ (e) => handleInputChange(e)}>
                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  arregloMedicos.map(({idUsuario, numeroDoc, nombres, apellidos})=> {
                                                                      return <option key={idUsuario} value={numeroDoc}>{nombres+' '+apellidos}</option>
                                                                  })
                                                                  }
                                                            </select>       
                              </div>
                </div>

              <div className="container-btn-crear">
                              <button id='btn-crear-cita'>Actualizar cita</button>
              </div>

              </form>
        </div>
      }

     </div> 

    </div>
  )
}