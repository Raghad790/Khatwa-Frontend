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

    // Handle chart type change
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
                backgroundColor: '#4f46e5',
                borderColor: '#4f46e5',
                borderWidth: 1
            },
            {
                label: 'Days Since Enrollment',
                data: enrollmentData.map(item => item.days_enrolled),
                backgroundColor: '#f59e0b',
                borderColor: '#f59e0b',
                borderWidth: 1,
                type: 'line',
                yAxisID: 'y1'
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0 // Disable animations to prevent canvas issues
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Progress (%)'
                }
            },
            y1: {
                position: 'right',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Days Enrolled'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        },
        plugins: {
            tooltip: {
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

    return (
        <div className={styles.chartContainer}>
            <div className={styles.header}>
                <h2>Student Progress Tracking</h2>
                <div className={styles.controls}>
                    <button
                        onClick={() => handleChartTypeChange('bar')}
                        className={chartType === 'bar' ? styles.active : ''}
                    >
                        Bar Chart
                    </button>
                    <button
                        onClick={() => handleChartTypeChange('line')}
                        className={chartType === 'line' ? styles.active : ''}
                    >
                        Line Chart
                    </button>
                </div>
            </div>

            <div className={styles.chartWrapper}>
                {chartType === 'bar' ? (
                    <Bar
                        data={chartData}
                        options={options}
                        ref={(ref) => {
                            if (ref) {
                                chartInstance.current = ref;
                            }
                        }}
                    />
                ) : (
                    <Line
                        data={chartData}
                        options={options}
                        ref={(ref) => {
                            if (ref) {
                                chartInstance.current = ref;
                            }
                        }}
                    />
                )}
            </div>

            <div className={styles.statsSummary}>
                <div className={styles.statCard}>
                    <h3>Average Progress</h3>
                    <p>{Math.round(enrollmentData.reduce((sum, item) => sum + item.progress, 0) / enrollmentData.length)}%</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Completion Rate</h3>
                    <p>
                        {Math.round((enrollmentData.filter(item => item.progress === 100).length / enrollmentData.length) * 100)}%
                    </p>
                </div>
                <div className={styles.statCard}>
                    <h3>Active Students</h3>
                    <p>
                        {enrollmentData.filter(item => item.progress > 0 && item.progress < 100).length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProgressChart;