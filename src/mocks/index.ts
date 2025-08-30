import {Course} from "../courses/types";

export const courses: Course[] = [
    {
        id: 1,
        title: 'React для початківців',
        description: 'Основи React і компоненти.',
        videoUrl: '/video/example.mp4',
        price: 500,
    },
    {
        id: 2,
        title: 'TypeScript в React',
        description: 'Поглиблене використання TypeScript у React.',
        videoUrl: '/video/example.mp4',
        price: 700,
    },
    {
        id: 3,
        title: 'Next.js з нуля',
        description: 'Розробка сучасних веб-додатків з використанням Next.js.',
        videoUrl: '/video/example.mp4',
        price: 800,
    },
    {
        id: 4,
        title: 'Node.js для бекенду',
        description: 'Основи створення серверів та REST API на Node.js.',
        videoUrl: '/video/example.mp4',
        price: 600,
    },
    {
        id: 5,
        title: 'MongoDB для розробників',
        description: 'Збереження та обробка даних у NoSQL базі даних MongoDB.',
        videoUrl: '/video/example.mp4',
        price: 550,
    },
    {
        id: 6,
        title: 'Docker для початківців',
        description: 'Контейнеризація застосунків та основи роботи з Docker.',
        videoUrl: '/video/example.mp4',
        price: 650,
    },
    {
        id: 7,
        title: 'AWS для розробників',
        description: 'Базові сервіси AWS: S3, EC2 та деплой застосунків.',
        videoUrl: '/video/example.mp4',
        price: 900,
    }
];