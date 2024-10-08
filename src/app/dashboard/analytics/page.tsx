"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useRouter } from 'next/navigation';
import Logout from '../../logout/page';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import '../../../../styles/globals.css';
import { withAdminAuth } from '../../authContextAdmin/page';
import Header from "../../headerAdmin";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

interface SauceCount {
    [sauce: string]: number;
}

interface BreadCount {
    [bread: string]: number;
}

interface VegetableCount {
    salade: number;
    tomate: number;
    oignon: number;
}

const Analytics = () => {
    const router = useRouter();
    const [sauceCount, setSauceCount] = useState<SauceCount>({});
    const [breadCount, setBreadCount] = useState<BreadCount>({});
    const [vegetableCount, setVegetableCount] = useState<VegetableCount>({ salade: 0, tomate: 0, oignon: 0 });
    const [commandCount, setCommandCount] = useState<number[]>([]);
    const [commandCountByMonth, setCommandCountByMonth] = useState<number[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number>(0); // Default to January
    const [selectedYearForDay, setSelectedYearForDay] = useState<number>(new Date().getUTCFullYear()); // Default to current year
    const [selectedYearForMonth, setSelectedYearForMonth] = useState<number>(new Date().getUTCFullYear()); // Default to current year

    const fetchSauceData = async () => {
        try {
            const response = await axios.get<SauceCount>('/api/analytics/sauceCount');
            setSauceCount(response.data);
        } catch (error: any) {
            console.error('Échec de la récupération des données analytiques:', error);
        }
    };

    const fetchBreadData = async () => {
        try {
            const response = await axios.get<BreadCount>('/api/analytics/breadCount');
            setBreadCount(response.data);
        } catch (error: any) {
            console.error('Échec de la récupération des données analytiques:', error);
        }
    };

    const fetchVegetableData = async () => {
        try {
            const response = await axios.get<VegetableCount>('/api/analytics/vegetableCount');
            setVegetableCount(response.data);
        } catch (error: any) {
            console.error('Échec de la récupération des données analytiques:', error);
        }
    };

    const fetchCommandData = async (month: number, year: number) => {
        try {
            const response = await axios.get<number[]>(`/api/analytics/commandCount?month=${month}&year=${year}`);
            setCommandCount(response.data);
            console.log(response.data);
        } catch (error: any) {
            console.error('Échec de la récupération des données analytiques:', error);
        }
    };

    const fetchCommandDataByMonth = async (year: number) => {
        try {
            const response = await axios.get<number[]>(`/api/analytics/commandCountMonths?year=${year}`);
            setCommandCountByMonth(response.data);
            console.log(response.data);
        } catch (error: any) {
            console.error('Échec de la récupération des données analytiques:', error);
        }
    };

    useEffect(() => {
        fetchSauceData();
        fetchBreadData();
        fetchVegetableData();
        fetchCommandData(selectedMonth, selectedYearForDay);
        fetchCommandDataByMonth(selectedYearForMonth);
    }, [selectedMonth, selectedYearForDay, selectedYearForMonth]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const month = parseInt(event.target.value);
        setSelectedMonth(month);
        fetchCommandData(month, selectedYearForDay);
    };

    const handleYearChangeForDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(event.target.value);
        setSelectedYearForDay(year);
        fetchCommandData(selectedMonth, year);
    };

    const handleYearChangeForMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(event.target.value);
        setSelectedYearForMonth(year);
        fetchCommandDataByMonth(year);
    };

    const years = Array.from(new Array(10), (val, index) => new Date().getUTCFullYear() - index);

    const sauceData = {
        labels: Object.keys(sauceCount),
        datasets: [
            {
                label: 'Sauces les plus choisies',
                data: Object.values(sauceCount),
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                borderRadius: 5,
                hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const breadData = {
        labels: Object.keys(breadCount),
        datasets: [
            {
                label: 'Types de pain les plus choisis',
                data: Object.values(breadCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                hoverBorderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    };

    const vegetableData = {
        labels: ['Salade', 'Tomate', 'Oignon'],
        datasets: [
            {
                label: 'Légumes les plus choisis',
                data: [vegetableCount.salade, vegetableCount.tomate, vegetableCount.oignon],
                backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 2,
                borderRadius: 5,
                hoverBackgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                hoverBorderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            },
        ],
    };

    const commandData = {
        labels: Array.from({ length: 31 }, (_, i) => i + 1), // Labels from 1 to 31
        datasets: [
            {
                label: 'Nombre de commandes par jour',
                data: commandCount,
                backgroundColor: 'rgba(153, 102, 255, 0.8)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const commandDataByMonth = {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aut', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Nombre de commandes par mois',
                data: commandCountByMonth,
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    color: '#333',
                },
            },
            title: {
                display: true,
                text: 'Sauces les plus choisies',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                    weight: 'bold' as const,
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const breadOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    color: '#333',
                },
            },
            title: {
                display: true,
                text: 'Types de pain les plus choisis',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                    weight: 'bold' as const,
                },
                color: '#333',
            },
        },
    };

    const vegetableOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    color: '#333',
                },
            },
            title: {
                display: true,
                text: 'Légumes les plus choisis',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                    weight: 'bold' as const,
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const commandOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    color: '#333',
                },
            },
            title: {
                display: true,
                text: 'Nombre de commandes par jour',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                    weight: 'bold' as const,
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const commandByMonthOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    color: '#333',
                },
            },
            title: {
                display: true,
                text: 'Nombre de commandes par mois',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                    weight: 'bold' as const,
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div>
        <Header/>
        <div className="p-6 min-h-screen flex flex-col items-center my-28">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <div className="flex justify-center items-center h-96">
                    <div className="w-full">
                        <Bar data={sauceData} options={options} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <div className="flex justify-center items-center h-96">
                    <div className="w-full h-full">
                        <Doughnut data={breadData} options={breadOptions} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <div className="flex justify-center items-center h-96">
                    <div className="w-full">
                        <Bar data={vegetableData} options={vegetableOptions} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <div className="flex justify-center items-center h-96 flex-col">
                    <div className="flex mb-4">
                        <select value={selectedMonth} onChange={handleMonthChange} className="mr-4 p-2 border border-gray-300 rounded">
                            {['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aut', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                                <option key={index} value={index}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select value={selectedYearForDay} onChange={handleYearChangeForDay} className="p-2 border border-gray-300 rounded">
                            {years.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <Line data={commandData} options={commandOptions} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <div className="flex justify-center items-center h-96 flex-col">
                    <div className="flex mb-4">
                        <select value={selectedYearForMonth} onChange={handleYearChangeForMonth} className="p-2 border border-gray-300 rounded">
                            {years.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <Line data={commandDataByMonth} options={commandByMonthOptions} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default withAdminAuth(Analytics);
