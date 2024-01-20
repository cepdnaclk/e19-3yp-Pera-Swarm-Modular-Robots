import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LiveChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "realtime",
      animations: {
        enabled: false,
        easing: "linear",
        dynamicAnimation: {
          speed: 100,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Distance to the Object ",
      align: "center",

      style: {
        fontSize: "30px",
        fontWeight: 300,
        fontFamily: "monospace",
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "numeric",
      title: {
        text: "Time (seconds)",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      tickAmount: 6,
      labels: {
        formatter: (value) => value.toFixed(0),
      },
    },
    yaxis: {
      title: {
        text: "Distance (cm)",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      max: 100,
    },
    legend: {
      show: false,
    },
  });

  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    let xVal = 0;
    let intervalId;

    const updateChart = () => {
      const yVal = Math.floor(Math.random() * 100) + 1;

      setSeries((prevSeries) => {
        const newData = [...prevSeries[0].data, { x: xVal, y: yVal }];
        console.log(`x: ${xVal}, y: ${yVal}`);
        return [{ data: newData.slice(-10) }]; // Display only the last 10 points
      });

      xVal++;
    };

    intervalId = setInterval(updateChart, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default LiveChart;
