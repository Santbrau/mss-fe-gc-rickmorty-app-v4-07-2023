import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = []; // Arreglo para almacenar los personajes de la API
  displayedCharacters: any[] = []; // Arreglo para almacenar los personajes mostrados en pantalla
  selectedCharacter: any = null; // Variable para almacenar el personaje seleccionado
  newCharacter: any = {}; // Nuevo personaje a agregar desde el formulario
  searchQuery: string = ''; // Consulta de búsqueda del formulario
  createdCharacters: any[] = []; // Arreglo para almacenar los personajes creados por el formulario

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || ''; // Obtener la consulta de búsqueda de los parámetros de la URL
      this.getCharacters(); // Obtener los personajes de la API y aplicar la búsqueda
    });
  }

  getCharacters() {
    this.http.get<any>('https://rickandmortyapi.com/api/character').subscribe(data => {
      this.characters = data.results; // Almacenar los personajes de la API en el arreglo
      this.searchCharacters(); // Aplicar el filtro de búsqueda
    });
  }

  searchCharacters() {
    const allCharacters = this.characters.concat(this.createdCharacters); // Combinar los personajes de la API y los creados por el formulario

    if (this.searchQuery.trim() !== '') { // Verificar si hay una consulta de búsqueda ingresada
      this.displayedCharacters = allCharacters.filter(character => {
        return character.name.toLowerCase().includes(this.searchQuery.toLowerCase()); // Filtrar los personajes según la consulta de búsqueda
      });
    } else {
      this.displayedCharacters = this.getRandomCharacters(4); // Mostrar personajes aleatorios si no hay consulta de búsqueda
    }
  }

  getRandomCharacters(count: number): any[] {
    const totalCharacters = this.characters.length;
    const randomCharacters: any[] = [];
    const availableIndices = [...Array(totalCharacters).keys()]; // Crear un arreglo con los índices disponibles

    while (randomCharacters.length < count && availableIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const characterIndex = availableIndices[randomIndex];
      const randomCharacter = this.characters[characterIndex];

      randomCharacters.push(randomCharacter);
      availableIndices.splice(randomIndex, 1); // Eliminar el índice seleccionado de los disponibles
    }

    return randomCharacters;
  }

  showCharacterDetails(character: any) {
    this.selectedCharacter = character; // Asignar el personaje seleccionado
  }

  closeCharacterDetails() {
    this.selectedCharacter = null; // Cerrar el panel de detalles del personaje
  }

  addCharacter() {
    this.createdCharacters.push(this.newCharacter); // Agregar el nuevo personaje desde el formulario al arreglo de personajes creados
    this.newCharacter = {}; // Limpiar el formulario
    this.searchCharacters(); // Aplicar el filtro de búsqueda
  }

  deleteCharacter(characterId: number) {
    this.createdCharacters = this.createdCharacters.filter(character => character.id !== characterId); // Eliminar el personaje del arreglo de personajes creados
    this.searchCharacters(); // Aplicar el filtro de búsqueda
  }
}
