import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import styles from './ProgressChart.module.css';

const ProgressChart = ({ courseId = null }) => {
    const [enrollmentData, setEnrollmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartType, setChartType] = useState('bar');
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchEnrollmentProgress = async () => {
            try {
                const url = courseId
                    ? `/api/progress?course_id=${courseId}`
                    : '/api/progress';

                const response = await fetch(url, {
                    credentials: 'include'
                });
                const data = await response.json();

                if (data.success) {
                    setEnrollmentData(data.data);
                } else {
                    throw new Error(data.message || 'Failed to load enrollment data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollmentProgress();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [courseId]);

    const handleChartTypeChange = (type) => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }
        setChartType(type);
    };

    if (loading) return <div className={styles.loading}>Loading progress data...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!enrollmentData || enrollmentData.length === 0) return <div className={styles.error}>No enrollment data available</div>;

    const chartData = {
        labels: enrollmentData.map(item => `${item.user_name || `User ${item.user_id}`}`),
        datasets: [
            {
                label: 'Course Progress (%)',
                data: enrollmentData.map(item => item.progress),
                backgroundColor: 'rgba(127,86,218,0.87)',
                borderColor: '#7f56da',
                borderWidth: 2,
                borderRadius: 8,
                maxBarThickness: 36,
            },
            {
                label: 'Days Since Enrollment',
                data: enrollmentData.map(item => item.days_enrolled),
                backgroundColor: 'rgba(234,111,184,0.23)',
                borderColor: '#ea6fb8',
                borderWidth: 3,
                type: 'line',
                yAxisID: 'y1',
                tension: 0.37,
                pointRadius: 4,
                pointBackgroundColor: '#ea6fb8',
                fill: false,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 16, right: 16, bottom: 24, left: 8 } },
        animation: { duration: 500 },
        scales: {
            x: {
                ticks: {
                    color: '#7f56da',
                    font: { weight: 600 }
                },
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Progress (%)', color: '#7f56da' },
                ticks: { color: '#7f56da' },
                grid: {
                    color: 'rgba(127,86,218,0.045)',
                    borderDash: [4, 4],
                }
            },
            y1: {
                position: 'right',
                beginAtZero: true,
                title: { display: true, text: 'Days Enrolled', color: '#ea6fb8' },
                ticks: { color: '#ea6fb8' },
                grid: { drawOnChartArea: false }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#3b3663',
                    font: { size: 13, weight: 600 },
                    usePointStyle: true,
                    padding: 18,
                }
            },
            tooltip: {
                backgroundColor: '#fff',
                borderColor: '#7f56da',
                borderWidth: 1.5,
                titleColor: '#7f56da',
                bodyColor: '#111827',
                bodyFont: { weight: 600 },
                callbacks: {
                    afterLabel: function (context) {
                        const data = enrollmentData[context.dataIndex];
                        return [
                            `Course: ${data.course_title}`,
                            `Enrolled: ${new Date(data.enrolled_at).toLocaleDateString()}`,
                            data.completed_at
                                ? `Completed: ${new Date(data.completed_at).toLocaleDateString()}`
                                : 'Status: In Progress'
                        ];
                    }
                }
            }
        }
    };

    // Stats
    const avgProgress = Math.round(enrollmentData.reduce((sum, item) => sum + item.progress, 0) / enrollmentData.length);
    const completionRate = Math.round((enrollmentData.filter(item => item.progress === 100).length / enrollmentData.length) * 100);
    const activeStudents = enrollmentData.filter(item => item.progress > 0 && item.progress < 100).length;

    return (
        <div className={styles.chartContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Student Progress Tracking</h2>
                <div className={styles.controls}>
                    <button
                        onClick={() => handleChartTypeChange('bar')}
                        className={`${styles.toggleBtn} ${chartType === 'bar' ? styles.active : ''}`}
                        aria-label="Show Bar Chart"
                    >
                        <span>Bar Chart</span>
                    </button>
                    <button
                        onClick={() => handleChartTypeChange('line')}
                        className={`${styles.toggleBtn} ${chartType === 'line' ? styles.active : ''}`}
                        aria-label="Show Line Chart"
                    >
                        <span>Line Chart</span>
                    </button>
                </div>
            </div>

            <div className={styles.chartWrapper}>
                {chartType === 'bar' ? (
                    <Bar
                        data={chartData}
                        options={options}
                        ref={(ref) => { if (ref) chartInstance.current = ref; }}
                    />
                ) : (
                    <Line
                        data={chartData}
                        options={options}
                        ref={(ref) => { if (ref) chartInstance.current = ref; }}
                    />
                )}
            </div>

            <div className={styles.statsSummary}>
                <div className={styles.statCard}>
                    <h3>Average Progress</h3>
                    <p className={styles.statValue}>{avgProgress}%</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Completion Rate</h3>
                    <p className={styles.statValue}>{completionRate}%</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Active Students</h3>
                    <p className={styles.statValue}>{activeStudents}</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressChart;