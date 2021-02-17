const { v4: uuidv4 } = require('uuid');

class Tarea {

  //ATRIBUTOS
  id = '';
  desc = '';
  completadoEn = null;

  //CONSTRUCTOR
  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
  }

}

module.exports = Tarea;