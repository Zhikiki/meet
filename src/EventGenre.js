import React, { useEffect, useState, useCallback  } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          event.summary.split(' ').includes(genre)
        ).length;
        return { name: genre, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  const [opacity, setOpacity] = useState({
    uv: 1,
    pv: 1,
  });

  const handleMouseEnter = useCallback(
    (o) => {
      const { dataKey } = o;

      setOpacity({ ...opacity, [dataKey]: 0.5 });
    },
    [opacity, setOpacity]
  );

  const handleMouseLeave = useCallback(
    (o) => {
      const { dataKey } = o;
      setOpacity({ ...opacity, [dataKey]: 1 });
    },
    [opacity, setOpacity]
  );

  //   const data = [
  //     { name: 'Group A', value: 400 },
  //     { name: 'Group B', value: 300 },
  //     { name: 'Group C', value: 300 },
  //     { name: 'Group D', value: 200 },
  //   ];
  const colors = ['#1F98F3', '#ba85ef', '#ff6bb9', '#ff7769', '#ffa600'];

  return (
    <ResponsiveContainer height={400}>
      <PieChart
        margin={{
          top: 20,
          right: 0,
          bottom: 20,
          left: 0,
        }}
      >
        <Pie
          data={data}
          cx='200'
          cy='200'
          labelLine={false}
          label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign='bottom'
          height={32}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
