require('colors');
const Tarea = require('./tarea');


class Tareas {

  //ATRIBUTOS
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    })

    return listado;
  }

  //CONSTRUCTOR
  constructor() {
    this._listado = {};
  }

  //METODOS
  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    //En la siguiente linea al pasar tarea.id entre CORCHETES, lo que se esta haciendo es 
    //crear un nuevo atributo del objeto de _listado, este mismo tendria el valor unico del uuid.
    //luego a este mismo se le pasa la tarea en si, que contendria el mismo uuid.
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, i) => {
      let idx = `${++i}`.green;
      (tarea.completadoEn)
        ? console.log(`${idx} ${tarea.desc} :: ${'Completada'.green}`)
        : console.log(`${idx} ${tarea.desc} :: ${'Pendiente'.red} `)
    })
  }

  listadoPendientesCompletadas(completadas) {
    let listadoArr2 = [];
    if (completadas) {
      this.listadoArr.forEach(tarea => { if (tarea.completadoEn) listadoArr2.push(tarea); })
      listadoArr2.forEach((tarea2, i) => {
        let idx = `${++i}`.green;
        console.log(`${idx} ${tarea2.desc} :: ${'Completada'.green}`);
      })
    } else {
      this.listadoArr.forEach(tarea => { if (!tarea.completadoEn) listadoArr2.push(tarea); })
      listadoArr2.forEach((tarea2, i) => {
        let idx = `${++i}`.green;
        console.log(`${idx} ${tarea2.desc} :: ${'Pendiente'.red}`);
      })
    }
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tareas;