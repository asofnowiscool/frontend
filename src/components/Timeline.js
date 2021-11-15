import React from "react";


import {
    BarChart,
    Bar,
    Line,
    LineChart,
    XAxis,
    Tooltip, CartesianGrid, Area, AreaChart, YAxis
} from "recharts";
import useFetch from "./useFetch";




const Timeline = () => {
    const BASE_URL = 'http://localhost:5000';
    const {data, loading, error} = useFetch(BASE_URL);



    if (loading) return <h1>LOADING...</h1>
    if (error) return console.log(error);

    return (

        //using recharts.
        <div>
            <h2>Charts</h2>
            <div className='timelineContainer'>
                <h3 >Timeline Temperature</h3>
                <AreaChart
                    width={600}
                    height={400}
                    data={data}
                    margin={{top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="temperature" />

                    <Tooltip />
                    <Area
                        type='monotone'
                        dataKey='temperature'
                        stroke='#8884d8'
                        fill='#8884d8'
                    />

                </AreaChart>
            </div>

            <div className='timelineContainer'>
                <h3>Timeline Humidity</h3>
                <AreaChart
                    width={600}
                    height={400}
                    data={data}
                    margin={{top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="humidity" />

                    <Tooltip />
                    <Area
                        type='monotone'
                        dataKey='humidity'
                        stroke='#8884d8'
                        fill='#8884d8'
                    />

                </AreaChart>
            </div>

        </div>
    )
};

export default Timeline