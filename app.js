let inputs = ['url-pelicula','titulo-pelicula','genero-pelicula'];
let valores = [];
let peliculasAgregadas = [
    {
        urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP1XTD8Xma3TU79zhd7mqx2-xfyckX3jBPjQ&s",
        titulo: "EL hombre araña",
        genero: "Accion",
        id: 0
    },
    {
        urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAofOYxNOAEgC96hkOwzDqlLqq2DAPm31PSQ&s",
        titulo: "Piratas del caribe",
        genero: "Aventura",
        id: 1
    },
    {
        urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VGuSLb4C5TRVO6c2lTW0fuJAHK3PhayyPranPGkL-g&s",
        titulo: "Maze Runner",
        genero: "Aventura",
        id: 2
    },
    {
        urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_1B7YPT3qjHLmtMzj3JiufaU4jNi8qZBnp97CcTJ0KA&s",
        titulo: "Interstellar",
        genero: "Aventura",
        id: 3
    },
    {
        urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKd7VxGmk2DouqBmMa3TRMjSAp2UrjUiMeGMPTW7ylw&s",
        titulo: "Que paso ayer",
        genero: "Comedia",
        id: 4
    },
    {
        urlImg: "https://m.media-amazon.com/images/I/91Xo9j4RxNL._AC_UF894,1000_QL80_.jpg",
        titulo: "Transformers",
        genero: "Accion",
        id: 5
    }
];
let id = 6;
let idActualizar = 0;

class Catalogo {
    constructor([urlImg,titulo,genero,id]) {
        this.urlImg = urlImg;
        this.titulo = titulo;
        this.genero = genero;
        this.id = id;
    }
}

class Interfaz {
    obtenerDatos = () => inputs.map(campo => valores.push(document.getElementById(campo).value));

    mostrarPeliculas = () => {
        let card = ``;
            peliculasAgregadas.map((pelicula) => {
                card += `
                    <div class="card m-4 border border-5 border-warning " style="width: 14rem;">
                        <img src="${pelicula.urlImg}" class="card-img-top" style="height: 19rem;">
                        <div class="card-body">
                            <h5 class="card-title">${pelicula.titulo}</h5>
                            <p class="card-text">Genero: ${pelicula.genero}</p>
                            <div class="d-flex">
                                <a href="#" class="btn btn-danger me-2" data-eliminar="${pelicula.id}">Eliminar</a>
                                <a href="#" class="btn btn-info me-2" data-actualizar="${pelicula.id}">actualizar</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        document.getElementById('catalogo-peliculas').innerHTML = card;
    }    

    limpiarInputs = () => inputs.map(campo => document.getElementById(campo).value = '');

    validarCampos = (campos) => {
        for (let i = 0; i < campos.length; i++) {
            if (campos[i] == '') return true;
        }
        return false;
    }

    eliminarPelicula = (elemento) => {
        peliculasAgregadas = peliculasAgregadas.filter(pelicula => pelicula.id != elemento);
        this.mostrarPeliculas();
    }

    actualizarPelicula = (elemento) => {
        idActualizar = 0
        document.getElementById('actualizar-pelicula').removeAttribute('hidden');
        document.getElementById('agregar-pelicula').setAttribute('hidden','true');
        
        peliculasAgregadas.map((pelicula) => {
            if (pelicula.id == elemento) {
                document.getElementById('url-pelicula').value = pelicula.urlImg;
                document.getElementById('titulo-pelicula').value = pelicula.titulo;
                document.getElementById('genero-pelicula').value = pelicula.genero;
                return;
            }
        });
        idActualizar = elemento;
    }
}

const interfaz = new Interfaz();

const inputsVacios = () => {
    
} 

document.getElementById('agregar-pelicula').addEventListener('click', () => {
    valores = [];
    interfaz.obtenerDatos();
    if (interfaz.validarCampos(valores)) {
        Swal.fire({
            icon: "error",
            title: "CAMPOS INCOMPLETOS",
            text: "Porfavor llena todos los campos"
          });
    } else {
        Swal.fire({
            icon: "success",
            title: "PELICULA AGREGADA",
            text: `Se agrego a la lista ${valores[1]}`
          });
        valores.push(id);
        const catalogo = new Catalogo(valores);
        peliculasAgregadas.push(catalogo);
        interfaz.mostrarPeliculas();
        interfaz.limpiarInputs();
        id++;
    }
});

document.getElementById('actualizar-pelicula').addEventListener('click', () => {
    valores = [];
    interfaz.obtenerDatos();
    if (interfaz.validarCampos(valores)) {
        Swal.fire({
            icon: "error",
            title: "CAMPOS INCOMPLETOS",
            text: "Porfavor llena todos los campos"
          });
    } else {
        Swal.fire({
            icon: "success",
            title: "PELICULA ACTUALIZADA",
            text: `Se actualizo con exito ${valores[1]}`
          });
          peliculasAgregadas.map((pelicula) => {
              if (pelicula.id == idActualizar) {
                  pelicula.urlImg = valores[0];
                  pelicula.titulo = valores[1];
                  pelicula.genero = valores[2];
                  return;
              }
          });
          interfaz.mostrarPeliculas();
          interfaz.limpiarInputs();
          document.getElementById('actualizar-pelicula').setAttribute('hidden','true');
          document.getElementById('agregar-pelicula').removeAttribute('hidden');
    }
});

document.getElementById('catalogo-peliculas').addEventListener('click', (e) => {
    if (e.target.dataset.eliminar) {
        interfaz.eliminarPelicula(e.target.dataset.eliminar);
    }
    if (e.target.dataset.actualizar) {
        interfaz.actualizarPelicula(e.target.dataset.actualizar);
        
    }
});

document.addEventListener('DOMContentLoaded', () => {
    interfaz.mostrarPeliculas();
});
