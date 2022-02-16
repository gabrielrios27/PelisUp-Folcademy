import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MoviesSeries } from 'src/interfaces/NewUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedCategorie: string = 'Todos';
  quantity: number = 120;

  filter: string = 'todos';
  movies_series: MoviesSeries[] = [
    {
      id: 0,
      name: 'El libro de Boba Fett (2021)',
      description:
        'El legendario cazarrecompensas Boba Fett y la mercenaria Fennec Shand deben navegar por el inframundo de la galaxia cuando regresen a las arenas de Tatooine para reclamar el territorio que una vez gobernó Jabba el Hutt y su sindicato del crimen.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rxqMWKi7Sk00Iq4Fz43y6UrwmEL.jpg',
      rating: 8.3,
      category: 'serie',
    },
    {
      id: 1,
      name: 'Ready Player One (2018)',
      description:
        'Año 2044. Wade Watts es un adolescente al que le gusta evadirse del cada vez más sombrío mundo real a través de una popular utopía virtual a escala global llamada Oasis, hasta que su excéntrico y multimillonario creador muere. Antes de morir, ofrece su fortuna como premio a una elaborada búsqueda del tesoro a través de los rincones más inhóspitos de su creación. Será el punto de partida para que Wade se enfrente a jugadores, poderosos enemigos corporativos y otros competidores despiadados dispuestos a hacer lo que sea, tanto dentro de Oasis como del mundo real, para hacerse con el premio.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2iuVrtC5IpwLtSFSgkIIIKLs0Zq.jpg',
      rating: 7.6,
      category: 'pelicula',
    },
    {
      id: 2,
      name: 'Matrix Resurrections (2021)',
      description:
        'En un mundo compuesto por dos realidades, lo cotidiano y lo oculto tras ella, Thomas Anderson se ve obligado de nuevo a ir tras el conejo blanco. Dicha elección continúa siendo la vía de acceso a Matrix, que esta vez es más poderosa e intrincada que en ocasiones anteriores.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dLIwpCTf4QoW01pp85KP9jcfTpu.jpg',
      rating: 6.8,
      category: 'pelicula',
    },
    {
      id: 3,
      name: 'Juego de tronos (2011)',
      description:
        "En una tierra donde los veranos duran décadas y los inviernos pueden durar toda una vida, los problemas acechan. Desde las maquinaciones del sur a las salvajes tierras del este, pasando por el helado norte y el milenario muro que protege el reino de las fuerzas tenebrosas, dos poderosas familias mantienen un enfrentamiento letal por gobernar los Siete Reinos de Poniente. Mientras la traición, la lujuria y las fuerzas sobrenaturales sacuden los pilares de los reinos, la sangrienta batalla por el trono de Hierro tendrá consecuencias imprevistas y trascendentales. El invierno se acerca. Que empiece 'Juego de tronos'.",
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/z9gCSwIObDOD2BEtmUwfasar3xs.jpg',
      rating: 8.4,
      category: 'serie',
    },
    {
      id: 4,
      name: 'Eternals (2021)',
      description:
        'Hace millones de años, los seres cósmicos conocidos como los Celestiales comenzaron a experimentar genéticamente con los humanos. Su intención era crear individuos superpoderosos que hicieran únicamente el bien, pero algo salió mal y aparecieron los Desviantes, destruyendo y creando el caos a su paso. Ambas razas se han enfrentado en una eterna lucha de poder a lo largo de la historia. En medio de esta guerra, Ikaris y Sersi tratarán de vivir su propia historia de amor.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wPZ5n5LlzFFdO5lFJbi2qmaE6w7.jpg',
      rating: 7.2,
      category: 'pelicula',
    },
    {
      id: 5,
      name: 'Peaky Blinders (2013)',
      description:
        'En Gran Bretaña, Reino Unido se recuperan de la desesperación de la Gran Guerra, las personas sobreviven a como pueden, y las bandas criminales proliferan en una nación sacudida económicamente. Es justamente aquí donde una familia de gánsteres irlandeses de origen nómada (a veces llamados gitanos o chatarreros) asentada en Birmingham (los Peaky Blinders) justo después de la Primera Guerra Mundial, dirigen un local de apuestas hípicas en la ciudad. Las acciones del ambicioso, respetado, temerario y peligroso jefe de la banda, Thomas Shelby, llaman la atención del Inspector jefe Chester Campbell, un detective de la Real Policía Irlandesa que es enviado por el mismo Winston Churchill desde Belfast donde había sido enviado a limpiar la ciudad del Ejército Republicano Irlandés (IRA), comunistas, pandillas y delincuentes comunes.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5mQlikvrHD0IGi1p35FEzLBErMp.jpg',
      rating: 8.6,
      category: 'serie',
    },
    {
      id: 6,
      name: 'Alerta roja (2021)',
      description:
        'Cuando la Interpol envía una Alerta roja, significa que los departamentos de Policía de todo el mundo deben estar alerta para capturar a los criminales más buscados. Todas las alarmas saltan cuando un temerario robo une al mejor agente del FBI (Johnson) con dos criminales rivales entre sí (Gadot & Reynolds). Una coincidencia que hará que suceda lo impredecible.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/odBUpjZGxY3y7FBo5NBtEYGJf5r.jpg',
      rating: 6.8,
      category: 'pelicula',
    },
    {
      id: 7,
      name: 'Free Guy (2021)',
      description:
        'Guy trabaja como cajero de un banco, y es un tipo alegre y solitario al que nada la amarga el día. Incluso si le utilizan como rehén durante un atraco a su banco, él sigue sonriendo como si nada. Pero un día se da cuenta de que Free City no es exactamente la ciudad que él creía. Guy va a descubrir que en realidad es un personaje no jugable dentro de un brutal videojuego.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/suaooqn1Mnv60V19MoGxneMupJs.jpg',
      rating: 7.7,
      category: 'pelicula',
    },
    {
      id: 8,
      name: 'La rueda del tiempo (2021)',
      description:
        'Las vidas de cuatro jóvenes cambian para siempre cuando una desconocida llega a su aldea afirmando que uno de ellos es la encarnación de una antigua profecía y tiene el poder de inclinar la balanza entre la Luz y la Oscuridad. Deberán decidir si dejar en manos de la desconocida (y de ellos mismos) el destino del mundo antes de que el Oscuro escape de su prisión y comience la Última Batalla.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7cVmgz7TzkZf64VD6Vc3AOZS1uA.jpg',
      rating: 7.9,
      category: 'serie',
    },
    {
      id: 9,
      name: 'Muerte en el Nilo (2022)',
      description:
        'Vuelven las pesquisas del célebre detective Hércules Poirot. Esta vez, durante un viaje en crucero por el Nilo, Poirot deberá investigar el misterioso asesinato de una joven heredera sin explicación aparente. Esta secuela de Asesinato en el Orient Express (2017) es la adaptación de la novela Muerte en el Nilo (1937) de Agatha Christie.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5ytfx0deVe07GSjNvJkiMAH8fob.jpg',
      rating: 6.8,
      category: 'pelicula',
    },
    {
      id: 10,
      name: 'Arcane (2021)',
      description:
        'Con las dispares ciudades de Piltover y Zaun como telón de fondo, dos hermanas luchan en bandos opuestos de una guerra entre tecnologías mágicas y creencias enfrentadas.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
      rating: 9.1,
      category: 'serie',
    },
    {
      id: 11,
      name: 'El método Williams (2021)',
      description:
        'Biopic sobre Richard Williams, un padre inasequible al desaliento que ayudó a criar a dos de las deportistas más extraordinarias de todos los tiempos, dos atletas que acabarían cambiando para siempre el deporte del tenis. Richard tenía una visión muy clara del futuro de sus hijas y sirviéndose de métodos poco convencionales, elaboró un plan que llevaría a Venus y Serena Williams de las calles de Compton, California, al olimpo de deporte convirtiéndolas en iconos legendarios.',
      image:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mBGHQv5VuBVQN6k6dEwbZzr0Iqb.jpg',
      rating: 8.1,
      category: 'pelicula',
    },
    // {
    //   id: 12,
    //   name: 'Vikingos (2013)',
    //   description:
    //     'Sigue las aventuras de Ragnar Lothbrok, el héroe más grande de su época. La serie narra las sagas de la banda de hermanos vikingos de Ragnar y su familia, cuando él se levanta para convertirse en el rey de las tribus vikingas. Además de ser un guerrero valiente, Ragnar encarna las tradiciones nórdicas de la devoción a los dioses, la leyenda dice que él era un descendiente directo de Odín, el dios de la guerra y los guerreros.',
    //   image:
    //     'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uNFSCxeZsZVIQ1TrD6mzu6uMQEb.jpg',
    //   rating: 8.1,
    //   category: 'serie',
    // },
  ];

  movies_series_toSearch: MoviesSeries[] = [];

  movies_series_toShow: MoviesSeries[] = [];

  toSearch: string = '';
  flag: boolean = false;

  SearchInParent(e: string) {
    console.log('desde padre: ' + e);
    this.toSearch = e.toUpperCase();
    this.movies_series_toShow = this.movies_series;
    this.movies_series_toSearch = [];
    let toSearchLenght = this.toSearch.length;
    for (let film of this.movies_series) {
      let filmPart = film.name.toUpperCase().substring(0, toSearchLenght);
      if (filmPart == this.toSearch) {
        this.movies_series_toSearch.push(film);
      }
    }
    if (e !== '') {
      this.movies_series_toShow = this.movies_series_toSearch;
    } else {
      this.movies_series_toShow = this.movies_series;
    }
  }
  constructor() {}

  // OnClickCategorie(event: any) {
  //   let categorie = document.querySelectorAll('.categories__item');
  //   categorie.forEach((element) => {
  //     element.classList.remove('categories__item--active');
  //   });
  //   event.target.classList.add('categories__item--active');
  // }

  // @ViewChild(CardsConteinerComponent)
  // hijo: CardsConteinerComponent = new CardsConteinerComponent();

  ngOnInit(): void {
    document.querySelectorAll('.categories__item');
  }

  OnClickAll() {
    this.quantity = 120;
    this.filter = 'todos';
    this.selectedCategorie = 'Todos';
  }
  OnClickMovies() {
    this.quantity = 70;
    this.filter = 'pelicula';
    this.selectedCategorie = 'Peliculas';
  }
  OnClickShows() {
    this.quantity = 50;
    this.filter = 'serie';
    this.selectedCategorie = 'Series';
  }
}
