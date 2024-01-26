import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LiveChart = () => {
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
    let xVal = 0;
    let intervalId;

    const updateChart = () => {
      const yVal = Math.floor(Math.random() * 100) + 1;

      setSeries((prevSeries) => {
        const newData = [...prevSeries[0].data, { x: xVal, y: yVal }];
        console.log(`x: ${xVal}, y: ${yVal}`);
        return [{ data: newData.slice(-30) }]; // Display only the last 10 points
      });

      xVal++;
    };

    // Set interval dynamically based on animation speed
    const animationSpeed = chartOptions.chart.animations.dynamicAnimation.speed || 50;
    intervalId = setInterval(updateChart, animationSpeed);

    return () => {
      clearInterval(intervalId);
    };
  }, [chartOptions.chart.animations.dynamicAnimation.speed]); // Dependency on animation speed

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="line"
      />
    </div>
  );
};

export default LiveChart;
