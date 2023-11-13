class Cursada {
    constructor(codigoCursada, nombreCursada, duracionMeses, valorCursada) {
        this.codigoCursada = codigoCursada;
        this.nombreCursada = nombreCursada;
        this.duracionMeses = duracionMeses;
        this.valorCursada = valorCursada;
    }

    aumentarPrecio(porcentajeAumento) {
        this.valorCursada *= (1 + porcentajeAumento);
    }
}

let alumnos = [
    {
        "nombreAlumno": "Juan",
        "sexo": "M",
        "edad": 20
    },
    {
        "nombreAlumno": "Martha",
        "sexo": "F",
        "edad": 18
    }
];

let alumnosxCurso = [];
let notasxAlumno = [];

function numeroEnteroValido(texto) {
    let numero = 0;
    do { 
        numero = parseInt(prompt(texto));
        if (isNaN(numero)) {
            alert("Digite un número válido");
        }
    } while (isNaN(numero));
    return numero;
}

function numeroDecimalValido(texto) {
    let numero = 0;
    do { 
        numero = parseFloat(prompt(texto));
        if (isNaN(numero)) {
            alert("Digite un número válido");
        }
    } while (isNaN(numero));
    return numero;
}

function menu(nroOpciones, textoOpciones) {
    let opcionMenuValida = false;
    let opcion = 0;
    do {
        opcion = numeroEnteroValido(textoOpciones);
        if (opcion > 0 && opcion <= nroOpciones) {
            opcionMenuValida = true;
        }
    } while(opcionMenuValida === false)
    return opcion;
}

const cursada1 = new Cursada("HST", "Historia Post Moderna", 6, 12000);
const cursada2 = new Cursada("MT1", "Matemática avanzada I", 10, 18500);
const cursada3 = new Cursada("MT2", "Matemática avanzada II", 9, 15000);
const cursada4 = new Cursada("LGC", "Lengua Castellana", 10, 18500);
const cursada5 = new Cursada("GEO", "Geografía Continental", 12, 20000);
const cursadas = [cursada1, cursada2, cursada3, cursada4, cursada5];

const cursadasOrden = [cursada1, cursada2, cursada3, cursada4, cursada5];
cursadasOrden.sort((curso1, curso2) => {
    const nombre1 = curso1.nombreCursada.toLocaleLowerCase();
    const nombre2 = curso2.nombreCursada.toLocaleLowerCase();
    if (nombre1 < nombre2) {
        return -1
    } else if (nombre1 > nombre2) {
        return 1
    } else {
        return 0
    }
});

function crearMenuCursadas(claseCursadas) {
    let largoMenu = 0;
    let textoMenu = "SELECCIONE UNA CURSADA EXISTENTE\n";
    claseCursadas.forEach((curso, indice, cursos) => {
        largoMenu += 1;
        textoMenu += `${largoMenu}. ${curso.nombreCursada}\n`;
    });
    largoMenu += 1;
    textoMenu = textoMenu + `${largoMenu}. Regresar`;
    const itemSel = menu(largoMenu, textoMenu)  - 1;
    let codCurso = "";
    if (itemSel < largoMenu) {
        claseCursadas.forEach((curso, indice, cursos) => {
            if (indice === itemSel) {
                codCurso = curso.codigoCursada;
            }
        })
    }
    return codCurso;
}

function crearMenuAlumnos(claseAlumnos) {
    let largoMenu = 0;
    let textoMenu = "SELECCIONE UN ALUMNO EXISTENTE\n";
    claseAlumnos.forEach((alum, indice, alums) => {
        largoMenu += 1;
        textoMenu += `${largoMenu}. ${alum.nombreAlumno}\n`;
    });
    largoMenu += 1;
    textoMenu = textoMenu + `${largoMenu}. Regresar`;
    const itemSel = menu(largoMenu, textoMenu)  - 1;
    let codAlumno = "";
    if (itemSel < largoMenu) {
        claseAlumnos.forEach((alum, indice, alums) => {
            if (indice === itemSel) {
                codAlumno = alum.nombreAlumno;
            }
        })
    }
    return codAlumno;
}

let opcionMenuPpal = 0;
let opcionMenuCursada = 0;
let opcionMenuAlumno = 0;
let codCursada = "";
let codAlumno = "";
let nombreA = ";"
let i= -1;
do {
    opcionMenuPpal = menu(3, "BIENVENIDO A MY LITTLE SCHOOL \n1. Opciones de la Cursada \n2. Opciones de Alumnos \n3. Terminar");
    switch (opcionMenuPpal) {
        case 1: // CURSADA
            do {
                opcionMenuCursada = menu(5, "CURSADA \n1. Agregar Alumno a una cursada \n2. Eliminar Alumno de una cursada \n3. Ver Notas de la Cursada \n4. Estadísticas \n5. Regresar");
                switch (opcionMenuCursada) {
                    case 1:  //Agregar Alumno
                        codCursada = crearMenuCursadas(cursadasOrden);
                        if (codCursada !== "") {
                            codAlumno = crearMenuAlumnos(alumnos);
                            if (codAlumno !== "") {
                                i = alumnosxCurso.findIndex((alumno) => alumno.codigoCursada === codCursada && alumno.nombreAlumno === codAlumno);
                                if (i > -1) {
                                    alert("ERROR: YA existe el alumno " + codAlumno + " en el curso " + codCursada);
                                } else {
                                    let nuevoAC = {
                                        "codigoCursada": codCursada,
                                        "nombreAlumno": codAlumno
                                    }
                                    alumnosxCurso.push(nuevoAC);
                                    alert("Se agregó el alumno " + codAlumno + " al curso " + codCursada);
                                    console.table(alumnosxCurso);
                                }
                            }
                        }
                        break;
                    case 2:   // Eliminar Alumno
                        codCursada = crearMenuCursadas(cursadasOrden);
                        if (codCursada !== "") {
                            codAlumno = crearMenuAlumnos(alumnos);
                            if (codAlumno !== "") {
                                i = alumnosxCurso.findIndex((alumno) => alumno.codigoCursada === codCursada && alumno.nombreAlumno === codAlumno);
                                if (i > -1) {
                                    alumnosxCurso.splice(i, 1);
                                    alert("Se eliminó el alumno " + codAlumno + " del curso " + codCursada);
                                } else {
                                    alert("ERROR: NO se encontró el alumno " + codAlumno + " del curso " + codCursada);
                                }
                                console.table(alumnosxCurso);
                            }
                        }
                        break;
                    case 3:
                        codCursada = crearMenuCursadas(cursadasOrden);
                        if (codCursada !== "") {
                            let verCursada = notasxAlumno.filter((nota) => nota.codigoCursada === codCursada);
                            alert("sí, lo sé, pero por ahora nos toca en la consola, sorry ;)");
                            console.table(verCursada);
                        }
                        break;
                    case 4: // Estadísticas
                        let estadisticas = [];
                        let cantAlumnos = 0;
                        let notaMinima = 0;
                        let notaMaxima = 0;
                        cursadasOrden.forEach((curso) => {
                            let cursoNotas = notasxAlumno.filter((notas) => notas.codigoCursada === curso.codigoCursada).map((item) => item.nota);
                            cantAlumnos = cursoNotas.length;
                            if (cantAlumnos > 0) {1
                                notaMinima = Math.min(...cursoNotas);
                                notaMaxima = Math.max(...cursoNotas);
                            } else {
                                notaMinima = 0;
                                notaMaxima = 0;
                            }
                            estadisticas.push({
                                "Cursada": curso.nombreCursada,
                                "Cantidad Alumnos": cantAlumnos,
                                "Nota mínima": notaMinima,
                                "Nota máxima": notaMaxima
                            });
                        });
                        alert("sí, lo sé, pero por ahora nos toca en la consola, sorry ;)");
                        console.table(estadisticas);
                        break;
                    case 5:
                        break;
                }
            } while (opcionMenuCursada != 5);
            break;
        case 2: // ALUMNO
            do {
                opcionMenuAlumno = menu(4, "ALUMNOS \n1. Nuevo Alumno \n2. Retirar Alumno \n3. Agregar Nota \n4. Regresar");
                switch (opcionMenuAlumno) {
                    case 1:
                        nombreA = prompt("Digite el nombre del nuevo Alumno");
                        i = alumnos.findIndex((alumno) => alumno.nombreAlumno === nombreA);
                        if (i > -1) {
                            alert("ERROR: YA existe el alumno " + nombreA);
                        } else {
                            let sexoA = prompt("Digite el sexo (F/M) de " +  nombreA);
                            let edadA = numeroEnteroValido("Digite la edad de " + nombreA);
                            let nuevoA = {
                                "nombreAlumno": nombreA,
                                "sexo": sexoA,
                                "edad": edadA
                            }
                            alumnos.push(nuevoA);
                            alert("Se agregó el alumno " + nombreA + " sexo " + sexoA + " edad " + edadA);
                            console.table(alumnos);
                        }
                        break;
                    case 2:
                        nombreA = prompt("Digite el nombre del Alumno a retirar");
                        i = alumnos.findIndex((alumno) => alumno.nombreAlumno === nombreA);
                        if (i > -1) {
                            i = alumnosxCurso.findIndex((alumno) => alumno.nombreAlumno === nombreA);
                            if (i > -1) {
                                alert("ERROR: NO se puede eliminar porque el alumno está en matriculado en algún curso");
                            } else {
                                i = notasxAlumno.findIndex((alumno) => alumno.nombreAlumno === nombreA);
                                if (i > -1) {
                                    alert("ERROR: NO se puede eliminar porque el alumno tiene Notas reportadas");
                                } else {
                                    i = alumnos.findIndex((alumno) => alumno.nombreAlumno === nombreA);
                                    alumnos.splice(i, 1);
                                    alert("Se eliminó el alumno " + nombreA);
                                    console.table(alumnos);
                                }
                            }
                        } else {
                            alert("ERROR: NO existe el alumno " + nombreA);
                        }
                        break;
                    case 3:
                        codCursada = crearMenuCursadas(cursadasOrden);
                        if (codCursada !== "") {
                            codAlumno = crearMenuAlumnos(alumnos);
                            if (codAlumno !== "") {
                                i = alumnosxCurso.findIndex((alumno) => alumno.codigoCursada === codCursada && alumno.nombreAlumno === codAlumno);
                                if (i === -1) {
                                    alert("ERROR: el alumno " + codAlumno + " NO ESTA en el curso " + codCursada);
                                } else {
                                    i = notasxAlumno.findIndex((nota) => nota.codigoCursada === codCursada && nota.nombreAlumno === codAlumno);
                                    if (i > -1) {
                                        alert("ERROR: YA EXISTE una nota para " + codAlumno + " en el curso " + codCursada);
                                    } else {
                                        let vrNota = 0;
                                        do {
                                            vrNota = numeroDecimalValido("Digita la nota obtenida 1 - 10");
                                        } while (vrNota > 10);
                                        nuevaNota = {
                                            "codigoCursada": codCursada,
                                            "nombreAlumno": codAlumno,
                                            "nota": vrNota
                                        }
                                        notasxAlumno.push(nuevaNota);
                                        alert("Se agregó para el alumno " + codAlumno + " del curso " + codCursada + " la nota de " + vrNota);
                                        console.table(notasxAlumno);
                                    }
                                }
                                
                            }
                        }
                        break;
                    case 4:
                        break;
                }
            } while (opcionMenuAlumno != 4);
            break;
        case 3:
            alert("bye, espero regreses pronto!");
            break;
    }
} while (opcionMenuPpal != 3);