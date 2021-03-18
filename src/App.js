import { useEffect, useState } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {

  //citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //UseEffect para realizar varias operaciones cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  // Funcion que tome las citas actuales y agregué la nueva

  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  }

  //Funcion que elimina la cita por su ID
  const eliminarCita = id => {
    const nuevaCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevaCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas'

  return (
    <>
    <h1>Administrador de pacientes</h1>

    <div className='container'>
      <div className='row'>
          <div className='one-half column'>
            <Formulario crearCita={crearCita} />
          </div>
          <div className='one-half column'>
            <h2>{ titulo }</h2>

            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))
            }
          </div>
      </div>     
    </div>
    </>  
  );
}

export default App;
