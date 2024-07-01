import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const GrapheReservationsParAge = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    
    axios.get('http://localhost:8080/api/reservation')
      .then(response => {
        const reservations = response.data;
        console.log(reservations)
        const ageGroups = [
          { name: '[18-20]', value: 0 },
          { name: '[20-25]', value: 0 },
          { name: '[25-30]', value: 0 },
          { name: '[30-40]', value: 0 },
          { name: '[40-50]', value: 0 },
          { name: '[50+]', value: 0 }
        ];

        reservations.forEach(reservation => {
          const age = reservation.age;
          if (age >= 18 && age < 20) ageGroups[0].value += 1;
          else if (age >= 20 && age < 25) ageGroups[1].value += 1;
          else if (age >= 25 && age <= 30) ageGroups[2].value += 1;
          else if (age > 30 && age <= 40) ageGroups[3].value += 1;
          else if (age > 40 && age <= 50) ageGroups[4].value += 1;
          else if (age > 50) ageGroups[5].value += 1;
        });

        setData(ageGroups);
        console.log(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations:', error);
      });
  }, []);

  useEffect(() => {
    // Check if data is available
    if (data.length === 0) return;

    const width = 700;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.7);

    // Clear any existing content in the SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'graph-svg-container')
      .attr('style', 'max-width: 71%; height: 53.5vh; margin-left:18%; font: 10px sans-serif;')
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Add sectors to the pie chart
    const path = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.name))
      .attr('stroke', 'white')
      .append('title')
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

    // Add labels to the pie chart
    const text = svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .text(d => d.data.name)
      .style('font-size', '20px');

    // Add reservation count to labels if there is enough space
    text.append('tspan')
      .attr('x', 0)
      .attr('y', '1.2em')
      .attr('fill-opacity', 0.7)
      .text(d => d.data.value.toLocaleString("en-US"))
      .style('font-size', '20px');
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GrapheReservationsParAge;
