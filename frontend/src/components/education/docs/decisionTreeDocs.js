import React from "react";
import { header, bodyContent } from "./fileFormatter";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
const PlotlyComponent = createPlotlyComponent(Plotly);

function makePlot() {
    let data = [
              {
                "line": {
                  "color": "rgb(210,210,210)",
                  "width": 1
                },
                "mode": "lines",
                "type": "scatter",
                "x": [
                  0,
                  -2.25,
                  null,
                  0,
                  2.25,
                  null,
                  -2.25,
                  -4.25,
                  null,
                  -2.25,
                  -0.25,
                  null,
                  2.25,
                  1.75,
                  null,
                  2.25,
                  2.75,
                  null,
                  -4.25,
                  -4.75,
                  null,
                  -4.25,
                  -3.75,
                  null,
                  1.75,
                  1.25,
                  null,
                  1.75,
                  2.25,
                  null,
                  -0.25,
                  -0.75,
                  null,
                  -0.25,
                  0.25,
                  null,
                  -3.75,
                  -4.25,
                  null,
                  -3.75,
                  -3.25,
                  null,
                  -0.75,
                  -1.25,
                  null,
                  -0.75,
                  -0.25,
                  null,
                  -3.25,
                  -3.75,
                  null,
                  -3.25,
                  -2.75,
                  null,
                  -1.25,
                  -1.75,
                  null,
                  -1.25,
                  -0.75,
                  null,
                  -2.75,
                  -3.25,
                  null,
                  -2.75,
                  -2.25,
                  null,
                  -0.75,
                  -1.25,
                  null,
                  -0.75,
                  -0.25,
                  null
                ],
                "y": [
                  12,
                  11,
                  null,
                  12,
                  11,
                  null,
                  11,
                  10,
                  null,
                  11,
                  10,
                  null,
                  11,
                  10,
                  null,
                  11,
                  10,
                  null,
                  10,
                  9,
                  null,
                  10,
                  9,
                  null,
                  10,
                  9,
                  null,
                  10,
                  9,
                  null,
                  10,
                  9,
                  null,
                  10,
                  9,
                  null,
                  9,
                  8,
                  null,
                  9,
                  8,
                  null,
                  9,
                  8,
                  null,
                  9,
                  8,
                  null,
                  8,
                  7,
                  null,
                  8,
                  7,
                  null,
                  8,
                  7,
                  null,
                  8,
                  7,
                  null,
                  7,
                  6,
                  null,
                  7,
                  6,
                  null,
                  7,
                  6,
                  null,
                  7,
                  6,
                  null
                ],
                "hoverinfo": "none"
              },
              {
                "mode": "markers",
                "name": "",
                "type": "scatter",
                "x": [
                  0,
                  -2.25,
                  2.25,
                  -4.25,
                  -0.25,
                  1.75,
                  2.75,
                  -4.75,
                  -3.75,
                  1.25,
                  2.25,
                  -0.75,
                  0.25,
                  -4.25,
                  -3.25,
                  -1.25,
                  -0.25,
                  -3.75,
                  -2.75,
                  -1.75,
                  -0.75,
                  -3.25,
                  -2.25,
                  -1.25,
                  -0.25
                ],
                "y": [
                  12,
                  11,
                  11,
                  10,
                  10,
                  10,
                  10,
                  9,
                  9,
                  9,
                  9,
                  9,
                  9,
                  8,
                  8,
                  8,
                  8,
                  7,
                  7,
                  7,
                  7,
                  6,
                  6,
                  6,
                  6
                ],
                "marker": {
                  "line": {
                    "color": "rgb(50,50,50)",
                    "width": 1
                  },
                  "size": 15,
                  "color": "#6175c1",
                  "symbol": "hexagram"
                },
                "opacity": 0.8,
                "text": [
                  "Ft[23]<868.20",
                  "Ft[27]<0.13",
                  "Ft[6]<0.06",
                  "Ft[21]<30.14",
                  "Ft[1]<18.96",
                  "0",
                  "Ft[21]<27.52",
                  "Ft[11]<0.86",
                  "0",
                  "0",
                  "1",
                  "Ft[24]<0.16",
                  "1",
                  "0",
                  "0",
                  "Ft[24]<0.14",
                  "Ft[24]<0.14",
                  "1",
                  "1",
                  "Ft[0]<12.11",
                  "Ft[12]<1.91",
                  "1",
                  "1",
                  "0",
                  "0"
                ],
                "hoverinfo": "text"
              }
    ];
    let layout = {
        "font": {
          "size": 12
        },
        "title": "Decision Tree Visualization",
        "xaxis": {
          "showgrid": false,
          "showline": false,
          "zeroline": false,
          "showticklabels": false
        },
        "yaxis": {
          "showgrid": false,
          "showline": false,
          "zeroline": false,
          "showticklabels": false
        },
        "margin": {
          "b": 85,
          "l": 40,
          "r": 40,
          "t": 100
        },
        "hovermode": "closest",
        "showlegend": false,
        "annotations": [
          {
            "x": 0,
            "y": 12,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[23]<868.20",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -2.25,
            "y": 11,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[27]<0.13",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": 2.25,
            "y": 11,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[6]<0.06",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -4.25,
            "y": 10,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[21]<30.14",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -0.25,
            "y": 10,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[21]<27.52",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": 1.75,
            "y": 10,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[1]<18.96",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": 2.75,
            "y": 10,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "0",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -4.75,
            "y": 9,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "1",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -3.75,
            "y": 9,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[11]<0.86",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": 1.25,
            "y": 9,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "1",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": 2.25,
            "y": 9,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "0",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -0.75,
            "y": 9,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[24]<0.16",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": 0.25,
            "y": 9,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "0",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -4.25,
            "y": 8,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "0",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -3.25,
            "y": 8,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[24]<0.14",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -1.25,
            "y": 8,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[24]<0.14",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -0.25,
            "y": 8,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "0",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -3.75,
            "y": 7,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "1",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -2.75,
            "y": 7,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[0]<12.11",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -1.75,
            "y": 7,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "1",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -0.75,
            "y": 7,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "Ft[12]<1.91",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -3.25,
            "y": 6,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "1",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -2.25,
            "y": 6,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "0",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -1.25,
            "y": 6,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "1",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          },
          {
            "x": -0.25,
            "y": 6,
            "font": {
              "size": 14,
              "color": "#fff"
            },
            "text": "0",
            "xref": "x1",
            "yref": "y1",
            "bgcolor": "#6175c1",
            "borderpad": 4,
            "showarrow": false,
            "bordercolor": "#c7c7c7",
            "borderwidth": 2
          }
        ],
        plot_bgcolor: "rgb(0, 0, 0, 0)",
        paper_bgcolor: "rgb(0, 0, 0, 0)",
    };
    let config = {
        showLink: false,
        displayModeBar: false,
    };
    return (
        <PlotlyComponent
            className="whatever"
            data={data}
            layout={layout}
            config={config}
        />
    );
}

const decisionTree = (
    <div>
        {header("Decision Tree (Classifier)", "+2")}
        {makePlot()}
    </div>
);

export default decisionTree;
