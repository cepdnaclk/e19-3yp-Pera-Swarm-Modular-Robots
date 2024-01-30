import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LiveChart = ({values}) => {

  const chartOptions = {
    chart: {
      id: "realtime",
      animations: {
        enabled: false,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
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
        fontWeight: 100,
        fontFamily:'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
        color: "rgba(var(--text-color))",
      },
    },

    grid: {
      borderColor: 'rgba(186,230,253,0.5)',
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
          fontWeight: 200,
          fontFamily:'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
          color: "rgba(var(--text-color))",
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
          fontWeight: 200,
          fontFamily:'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
          color: "rgba(var(--text-color))",
        },
      },
      max: 100,
    },
    legend: {
      show: false,
    },
  };

  const [series, setSeries] = useState([
    { data: [] }
  ]);

  useEffect(() => {
    const updateChart = () => {
      setSeries((prevSeries) => {
        const newData = [...prevSeries[0].data, { x: values.xVal, y: values.yVal }];
        return [{ data: newData.slice(-10) }]; // Display only the last 30 points
      });
    };

    // Update the chart when new values are received
    updateChart();
  }, [values]);

  return (
    <div>
      <ReactApexChart options={chartOptions} series={series} type="line" />
    </div>
  );
};

export default LiveChart;
