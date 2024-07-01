import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import './graphereservation.css';

const GrapheReservation = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:8080/api/reservation')
      .then(response => {
        const reservations = response.data;

        const reservationsPerDay = d3.rollups(
          reservations,
          v => v.length,
          d => d3.timeFormat('%Y-%m-%d')(new Date(d.datereservation))
        ).map(([key, value]) => ({ date: new Date(key), count: value }));

        setData(reservationsPerDay);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const width = 500;
    const height = 500;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 100;
    const marginLeft = 60;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'graph-svg-container')
      .attr('style', 'max-width: 78%; margin-left:18% ;height: auto;');

    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const xAxis = d3.axisBottom(x)
      .tickFormat(d3.timeFormat('%Y-%m-%d'))
      .tickSizeOuter(0);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]).nice()
      .range([height - marginBottom, marginTop]);

    svg.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.count))
      .attr('height', d => y(0) - y(d.count))
      .attr('width', x.bandwidth())
      .attr('fill', 'rgba(55, 64, 88, 0.8)');

    svg.selectAll('.x-axis').remove();
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '16px'); 

    svg.selectAll('.y-axis').remove();
    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .style('font-size', '16px'); 
  }, [data]);

  return (
    <div >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GrapheReservation;
