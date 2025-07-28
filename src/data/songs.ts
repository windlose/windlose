export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
  isLiked: boolean;
  genre: string;
  year: number;
}

export const sampleSongs: Song[] = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: false,
    genre: "Pop",
    year: 2020
  },
  {
    id: 2,
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    duration: 210,
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: true,
    genre: "Pop",
    year: 2019
  },
  {
    id: 3,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 233,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: false,
    genre: "Pop",
    year: 2017
  },
  {
    id: 4,
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
    duration: 270,
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: true,
    genre: "Funk",
    year: 2014
  },
  {
    id: 5,
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: 194,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: false,
    genre: "Pop",
    year: 2019
  },
  {
    id: 6,
    title: "Old Town Road",
    artist: "Lil Nas X",
    album: "7",
    duration: 157,
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: true,
    genre: "Country",
    year: 2019
  },
  {
    id: 7,
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    album: "Vida",
    duration: 229,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: false,
    genre: "Latin",
    year: 2017
  },
  {
    id: 8,
    title: "Havana",
    artist: "Camila Cabello ft. Young Thug",
    album: "Camila",
    duration: 217,
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    isLiked: true,
    genre: "Pop",
    year: 2017
  }
];

export const genres = [
  "All",
  "Pop",
  "Rock",
  "Hip Hop",
  "Country",
  "Jazz",
  "Classical",
  "Electronic",
  "R&B",
  "Latin"
];

export const years = [
  "All",
  "2024",
  "2023", 
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016"
];