"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useRouter } from 'next/navigation';
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
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import '../../../../styles/globals.css';
import { withAdminAuth } from '../../authContextAdmin/page';

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
    TimeScale
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
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const breadData = {
        labels: Object.keys(breadCount),
        datasets: [
            {
                label: 'Types de pain les plus choisis',
                data: Object.values(breadCount),
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const vegetableData = {
        labels: ['Salade', 'Tomate', 'Oignon'],
        datasets: [
            {
                label: 'Légumes les plus choisis',
                data: [vegetableCount.salade, vegetableCount.tomate, vegetableCount.oignon],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const commandData = {
        labels: Array.from({ length: 31 }, (_, i) => i + 1), // Labels from 1 to 31
        datasets: [
            {
                label: 'Nombre de commandes par jour',
                data: commandCount,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const commandDataByMonth = {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aut', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Nombre de commandes par mois',
                data: commandCountByMonth,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sauces les plus choisies',
            },
        },
    };

    const breadOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Types de pain les plus choisis',
            },
        },
    };

    const vegetableOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Légumes les plus choisis',
            },
        },
    };

    const commandOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Nombre de commandes par jour',
            },
        },
    };

    const commandByMonthOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Nombre de commandes par mois',
            },
        },
    };

    return (
        <div className="p-6 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center">Analytique</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Sauces les plus choisies</h3>
                <div className="flex justify-center items-center h-96">
                    <div className="w-full">
                        <Bar data={sauceData} options={options} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Types de pain les plus choisis</h3>
                <div className="flex justify-center items-center h-96">
                    <div className="w-full h-full">
                        <Doughnut data={breadData} options={breadOptions} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Légumes les plus choisis</h3>
                <div className="flex justify-center items-center h-96">
                    <div className="w-full">
                        <Bar data={vegetableData} options={vegetableOptions} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Nombre de commandes par jour</h3>
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
                <h3 className="text-xl font-semibold mb-4 text-center">Nombre de commandes par mois</h3>
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
            <button 
                onClick={() => router.push('/dashboard/ordersInterface')} 
                className="mt-8 px-4 py-2 bg-purple-500 text-white rounded-md"
            >
                Page des commandes
            </button>
            <button 
                onClick={() => router.push('/dashboard/usersList')} 
                className="mt-8 px-4 py-2 bg-purple-500 text-white rounded-md"
            >
                Page liste utilisateurs
            </button>
        </div>
    );
};

export default (Analytics);
