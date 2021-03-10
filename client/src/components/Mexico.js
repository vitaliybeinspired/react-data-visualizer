import React from 'react';
import Plot from "react-plotly.js";


class Chart extends React.Component {
    render() {
        return (
            <Plot
                data={[
                    {
                        x: [1, 6, 6],
                        y: [1, 2, 1],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'blue'},
                    },
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={ {width: 500, height: 400, title: 'Mexico Energy Analysis'} }
            />
        );
    }
}

export default Chart;