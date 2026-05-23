import albumDday from '../assets/images/album-dday.png'
import albumAgustd from '../assets/images/album-agustd.png'
import albumD2 from '../assets/images/album-d2.png'
import albumTour from '../assets/images/album-tour-archive.png'

import trackHaegeum from '../assets/images/track-haegeum.png'
import trackDaechwita from '../assets/images/track-daechwita.png'
import trackPeople from '../assets/images/track-people-pt2.png'
import trackAmygdala from '../assets/images/track-amygdala.png'

export const works = [
  {
    id: 1,
    title: 'D-DAY',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Energetic',
    plays: '12.4M',
    playsValue: 12.4,
    rating: '4.9',
    cover: albumDday,
    description:
      'A powerful album archive with intense sound, personal storytelling, and a strong visual identity. This work represents a complete chapter of Agust D’s music journey.',
    tracks: [
      { id: '01', title: 'Haegeum', duration: '3:41' },
      { id: '02', title: 'Daechwita', duration: '3:26' },
      { id: '03', title: 'Amygdala', duration: '4:05' },
      { id: '04', title: 'Snooze', duration: '4:10' },
      { id: '05', title: 'Life Goes On', duration: '3:32' },
    ],
  },
  {
    id: 2,
    title: 'Agust D',
    artist: 'Agust D',
    year: 2016,
    type: 'Mixtape',
    category: 'Mixtape',
    mood: 'Dark',
    plays: '36.8M',
    playsValue: 36.8,
    rating: '4.9',
    cover: albumAgustd,
    description:
      'The beginning of the Agust D archive and personal narrative, carrying raw energy, sharp lyrics, and a dark emotional tone.',
    tracks: [
      { id: '01', title: 'Agust D', duration: '3:02' },
      { id: '02', title: 'Give It To Me', duration: '2:45' },
      { id: '03', title: 'The Last', duration: '4:06' },
      { id: '04', title: 'Tony Montana', duration: '3:30' },
    ],
  },
  {
    id: 3,
    title: 'D-2',
    artist: 'Agust D',
    year: 2020,
    type: 'Mixtape',
    category: 'Mixtape',
    mood: 'Reflective',
    plays: '28.7M',
    playsValue: 28.7,
    rating: '4.8',
    cover: albumD2,
    description:
      'A second chapter with sharp emotion and experimental sound, balancing confidence, reflection, and artistic growth.',
    tracks: [
      { id: '01', title: 'Moonlight', duration: '2:43' },
      { id: '02', title: 'Daechwita', duration: '3:26' },
      { id: '03', title: 'People', duration: '3:17' },
      { id: '04', title: 'Dear My Friend', duration: '4:52' },
    ],
  },
  {
    id: 4,
    title: 'Agust D TOUR D-DAY',
    artist: 'Agust D',
    year: 2023,
    type: 'Soundtrack',
    category: 'Soundtrack',
    mood: 'Energetic',
    plays: '8.7M',
    playsValue: 8.7,
    rating: '4.9',
    cover: albumTour,
    description:
      'A live stage archive that collects performance memories, dramatic lighting, and concert atmosphere into one visual music experience.',
    tracks: [
      { id: '01', title: 'D-DAY Live Intro', duration: '2:20' },
      { id: '02', title: 'Haegeum Live', duration: '3:48' },
      { id: '03', title: 'Daechwita Live', duration: '3:34' },
      { id: '04', title: 'The Last Live', duration: '4:20' },
    ],
  },
  {
    id: 5,
    title: 'Haegeum',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Energetic',
    plays: '15.2M',
    playsValue: 15.2,
    rating: '4.9',
    cover: trackHaegeum,
    description:
      'A bold single blending tradition, rhythm, and freedom. The visual tone combines classical symbolism with modern energy.',
    tracks: [
      { id: '01', title: 'Haegeum', duration: '3:41' },
      { id: '02', title: 'Haegeum Instrumental', duration: '3:41' },
    ],
  },
  {
    id: 6,
    title: 'Daechwita',
    artist: 'Agust D',
    year: 2020,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Dark',
    plays: '21.3M',
    playsValue: 21.3,
    rating: '4.9',
    cover: trackDaechwita,
    description:
      'A dramatic and iconic work with royal visual energy, strong percussion, and a powerful performance identity.',
    tracks: [
      { id: '01', title: 'Daechwita', duration: '3:26' },
      { id: '02', title: 'Daechwita Stage Ver.', duration: '3:32' },
    ],
  },
  {
    id: 7,
    title: 'People Pt.2',
    artist: 'Agust D',
    year: 2023,
    type: 'Collaboration',
    category: 'Collaboration',
    mood: 'Chill',
    plays: '17.6M',
    playsValue: 17.6,
    rating: '4.8',
    cover: trackPeople,
    description:
      'A reflective piece about people, distance, and memory, with a softer emotional direction and late-night atmosphere.',
    tracks: [
      { id: '01', title: 'People Pt.2', duration: '3:34' },
      { id: '02', title: 'People Pt.2 Live', duration: '3:40' },
    ],
  },
  {
    id: 8,
    title: 'Amygdala',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Reflective',
    plays: '9.3M',
    playsValue: 9.3,
    rating: '4.8',
    cover: trackAmygdala,
    description:
      'A dark emotional work exploring memory, pain, and inner conflict through cinematic visual expression.',
    tracks: [
      { id: '01', title: 'Amygdala', duration: '4:05' },
      { id: '02', title: 'Amygdala Live', duration: '4:12' },
    ],
  },
]