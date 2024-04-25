import React from "react";

const CarouselPage = () => {

  return (
    <React.Fragment>
      <div className="col-xxl-8 col-lg-8 col-md-7">
        <div className="auth-bg pt-md-5 p-4 d-flex">
          <div className="bg-overlay bg-primary"></div>
          <ul className="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-7">
              <div className="p-0 p-sm-4 px-xl-0">
                <div
                  id="reviewcarouselIndicators"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CarouselPage;
