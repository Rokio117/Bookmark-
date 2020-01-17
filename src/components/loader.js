import React from "react";
//Displays loading icon when sent true
export const loader = {
  displayLoading(loading) {
    //gets sent this.state.loading
    if (loading) {
      return <div className="loader"></div>;
    }
  }
};
