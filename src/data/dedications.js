import mainDedication from '../assets/optimized/main dedication.webp';
import baseballField from '../assets/optimized/Baseball Field.webp';
import kidsCarTrack from '../assets/optimized/kids car track.webp';
import basketballCourt from '../assets/optimized/basketball court.webp';
import pickleballCourt from '../assets/optimized/pickleball court.webp';
import soccerField from '../assets/optimized/soccer field.webp';
import playground from '../assets/optimized/playground.webp';
import natureWalk from '../assets/optimized/Nature Walk.webp';
import natureNest from '../assets/optimized/nature nest.webp';
import retreatHouse from '../assets/optimized/Retreat house.webp';
import waterSlides from '../assets/optimized/water slides.webp';
import bleachers from '../assets/optimized/bleachers.webp';
import gazebos from '../assets/optimized/gazeebos.webp';
import benches from '../assets/optimized/benches.webp';
import gym from '../assets/optimized/gym.webp';
import campaignBricks from '../assets/optimized/campaignbricks.webp';

export const DEDICATION_STATUSES = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
};

export const BASE_DEDICATIONS = [
  {
    id: 1,
    title: 'Campus Dedication',
    category: 'facilities',
    amount: '$900,000',
    image: mainDedication,
    status: 'available',
  },
  {
    id: 16,
    title: 'Personalized Bricks',
    category: 'facilities',
    amount: '$1000 or 2/$1800',
    image: campaignBricks,
    status: 'available',
  },
  {
    id: 7,
    title: 'Playground',
    category: 'facilities',
    amount: '$300,000',
    image: playground,
    status: 'available',
  },
  {
    id: 6,
    title: 'Soccer Field',
    category: 'facilities',
    image: soccerField,
    status: 'sold',
  },
  {
    id: 3,
    title: 'Basketball Court',
    category: 'facilities',
    amount: '$250,000',
    image: basketballCourt,
    status: 'available',
  },
  {
    id: 2,
    title: 'Baseball Field',
    category: 'facilities',
    amount: '$200,000',
    image: baseballField,
    status: 'available',
  },
  {
    id: 4,
    title: 'Pickleball Court',
    category: 'facilities',
    amount: '$180,000',
    image: pickleballCourt,
    status: 'available',
  },
  {
    id: 5,
    title: 'Kids Car Track',
    category: 'facilities',
    image: kidsCarTrack,
    status: 'sold',
  },
  {
    id: 8,
    title: 'Nature Trail',
    category: 'facilities',
    amount: '$100,000',
    image: natureWalk,
    status: 'sold',
  },
  {
    id: 9,
    title: 'Nature Nest',
    category: 'facilities',
    amount: '$75,000',
    image: natureNest,
    status: 'sold',
  },
  {
    id: 10,
    title: 'Water Slides',
    category: 'facilities',
    amount: '$25,000',
    image: waterSlides,
    status: 'available',
  },
  {
    id: 11,
    title: 'Gazebos',
    category: 'facilities',
    amount: '$25,000',
    image: gazebos,
    status: 'available',
  },
  {
    id: 12,
    title: 'Bleachers',
    category: 'facilities',
    amount: '$5,000',
    image: bleachers,
    status: 'available',
  },
  {
    id: 13,
    title: 'Benches',
    category: 'facilities',
    amount: '$3,600',
    image: benches,
    status: 'available',
  },
  {
    id: 14,
    title: 'Retreat House',
    category: 'facilities',
    amount: '$850,000',
    image: retreatHouse,
    status: 'available',
    phase: 'Phase 2',
  },
  {
    id: 15,
    title: 'Gym',
    category: 'facilities',
    amount: '$4,000,000',
    image: gym,
    status: 'available',
    phase: 'Phase 2',
  },
];
