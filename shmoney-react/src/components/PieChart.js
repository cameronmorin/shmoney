import React from "react";
import { Pie } from "react-chartjs-2";

class LatePie extends React.Component {
  state = {
    dataPie: {
      labels: ["On-Time", "Late"],
      datasets: [
        {
          data: [8,2],//To be updated with real data
          backgroundColor: [
            "#46BFBD",
            "#F7464A"
          ],
          hoverBackgroundColor: [
            "#5AD3D1",
            "#FF5A5E"
          ]
        }
      ]
    }
  }

  render() {
    return (
      <>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
      </>
    );
  }
}

export default LatePie;