import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper, Stack, Typography, Button, Avatar, Grid } from '@mui/material';
import { MdShare } from "react-icons/md";
import SEO from '../../../../components/global/SEO';
import { useSnackbar } from '../../../../context/SnackbarContext';

const reputationScoreData = {
    currentScore: 85,
    monthlyScores: [
        { date: '2023-06-01', score: 70 },
        { date: '2023-06-02', score: 72 },
        { date: '2023-06-03', score: 75 },
        { date: '2023-06-04', score: 78 },
        { date: '2023-06-05', score: 80 },
        { date: '2023-06-06', score: 85 },
        { date: '2023-06-07', score: 90 },
        { date: '2023-06-08', score: 87 },
        { date: '2023-06-09', score: 85 },
        { date: '2023-06-10', score: 88 },
        { date: '2023-06-11', score: 85 },
        { date: '2023-06-12', score: 85 },
        { date: '2023-06-13', score: 82 },
        { date: '2023-06-14', score: 85 },
        { date: '2023-06-15', score: 87 },
        { date: '2023-06-16', score: 85 },
        { date: '2023-06-17', score: 84 },
        { date: '2023-06-18', score: 85 },
        { date: '2023-06-19', score: 86 },
        { date: '2023-06-20', score: 85 },
        { date: '2023-06-21', score: 88 },
        { date: '2023-06-22', score: 85 },
        { date: '2023-06-23', score: 89 },
        { date: '2023-06-24', score: 85 },
        { date: '2023-06-25', score: 90 },
        { date: '2023-06-26', score: 92 },
        { date: '2023-06-27', score: 91 },
        { date: '2023-06-28', score: 90 },
        { date: '2023-06-29', score: 85 },
        { date: '2023-06-30', score: 87 },
    ],
    avgCommunityScore: 75,
};

const lineChartOptions = {
    chart: {
        type: 'spline',
    },
    title: {
        text: '',
    },
    xAxis: {
        categories: reputationScoreData.monthlyScores.map((data) => data.date),
    },
    yAxis: {
        title: {
            text: 'Score',
        },
    },
    series: [
        {
            name: 'Your Score',
            data: reputationScoreData.monthlyScores.map((data) => data.score),
            color: '#804EE1',
            lineWidth: 2,
            marker: {
                enabled: true,
                radius: 3,
            },
            shadow: {
                color: '#804EE1',
                offsetX: 0,
                offsetY: 5,
                opacity: 0.4,
                width: 10,
            },
        },
    ],
    plotOptions: {
        series: {
            shadow: true,
        },
    },
};

const histogramOptions = {
    chart: {
        type: 'column',
    },
    title: {
        text: '',
    },
    xAxis: {
        categories: ['Your Score', 'Average Score'],
    },
    yAxis: {
        title: {
            text: 'Score',
        },
    },
    series: [
        {
            name: 'Score',
            data: [reputationScoreData.currentScore, reputationScoreData.avgCommunityScore],
            colorByPoint: true,
            colors: ['#804EE1', '#1DA1F2'],
        },
    ],
};

const tokenData = {
    name: 'Community Token',
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: '12345678',
    image: 'https://via.placeholder.com/56',
};

function Page() {
    const { showMessage } = useSnackbar();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                showMessage('Copy to clipboard successfully!', 'success');
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
            });
    };

    return (
        <>
            <SEO titleTemplate='Reputation Score' />
            <div className='container flex flex-col justify-between px-4 py-3 md:px-12 space-y-4 h-screen'>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">Reputation Score</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<MdShare />}
                        onClick={copyToClipboard}
                    >
                        Share
                    </Button>
                </Stack>
                <div className='flex flex-row justify-between space-x-3'>
                    <Paper className='flex flex-col justify-start w-full p-4 shadow-md rounded-xl h-full'>
                        <Typography variant='h6'>
                            Token Details & Reputation Score
                        </Typography>
                        <div className='flex flex-row space-x-3'>
                            <div className='flex flex-col text-center w-full pt-12'>
                                <Avatar
                                    alt="Token Logo"
                                    src={tokenData.image}
                                    sx={{ width: 80, height: 80 }}
                                    className="block mb-2 mx-auto"
                                />
                                <Typography variant="h6" className="block">
                                    {tokenData.name}
                                </Typography>
                                <Typography variant="body2" className="mb-2">
                                    ID: {tokenData.id}
                                </Typography>
                                <Typography variant="body1" className='mt-2 text-left'>
                                    {tokenData.description}
                                </Typography>
                            </div>
                        </div>
                    </Paper>
                    <Paper className='flex flex-col w-full p-4 shadow-md rounded-xl'>
                        <div className='flex flex-col w-full'>
                            <Typography variant='h6'>
                                Reputation Score
                            </Typography>
                            <Typography variant='body2'>
                                You can use this score to show your reputation to others. The score is calculated based on your activity on the community.
                            </Typography>
                            <Typography variant='h2' className='text-center pt-[7rem]'>
                                {reputationScoreData.currentScore}/ 100
                            </Typography>
                        </div>
                    </Paper>
                </div>
                <div className="flex flex-row justify-between items-center space-x-3 h-full">
                    <Paper className='flex flex-col w-1/2 p-4 space-y-4 shadow-md rounded-xl'>
                        <Typography variant='h6'>
                            Your Score Over Time
                        </Typography>
                        <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
                    </Paper>
                    <Paper className='flex flex-col w-1/2 p-4 space-y-4 shadow-md rounded-xl'>
                        <Typography variant='h6'>
                            Histogram of Scores / Average Score
                        </Typography>
                        <HighchartsReact highcharts={Highcharts} options={histogramOptions} />
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default Page;
