import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({crearCita}) => {

    //Crear state de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    //Funcion cada que escribe en un input

    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value  
        })
    }

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando envia el formulario

    const handleSubmit = (e) => {
        e.preventDefault();


        // Validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
            || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return; //Evita que se siga ejecutando el script
        }

        //Eliminar el mensaje previo
        actualizarError(false);


        //Asignar un ID
        cita.id = uuidv4();

        //crear la cita
        crearCita(cita);


        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <>
            <h2>Crear Cita</h2>

            { error ? <p className='alerta-error'>Todos los campos son obligatorios</p> : null }

            <form
                onSubmit={ handleSubmit }
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre del Dueño de la mascota'
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={handleChange}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                >
                    Agregar Cita
                </button>
            </form>
        </>
    )
}

export default Formulario
