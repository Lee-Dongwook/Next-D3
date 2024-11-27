"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";

const D3Component = () => {
  useEffect(() => {
    d3.select("#chart").select("svg").remove();

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
      (d) => {
        return {
          Country: d.Country,
          Value: +d.Value || 0,
        };
      }
    ).then((data) => {
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.Country))
        .padding(0.2);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0) rotate(-45)")
        .style("text-anchor", "end");

      const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);

      svg.append("g").call(d3.axisLeft(y));

      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.Country) as unknown as string)
        .attr("y", (d) => y(d.Value))
        .attr("height", (d) => height - y(d.Value))
        .attr("fill", "#69b3a2");
    });
  }, []);

  return <div id="chart"></div>;
};

export default D3Component;
