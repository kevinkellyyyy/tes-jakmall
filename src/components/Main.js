import { useSelector } from "react-redux";
import StepOne from "./StepOne";
import styled from "styled-components";
import { devices } from "./mediaQuery";
import Summary from "./Summary";
import React from "react";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const StyledDiv = styled.div` 
  background-color: transparent;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const MainCard = styled.div`
  background-color: var(--white);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 10px 20px var(--light-orange-02);
  border-radius: 4px;
  height: 80vh;
  width: 90vw;

  @media ${devices.tablet} {
    min-height: 100vh;
    width: 95vw;
    box-shadow: unset;
  }

  .row-main {
    display: flex;
    flex-direction: row;
    height: inherit;

    @media ${devices.tablet} {
      flex-direction: column;
    }
    
    .switch-part {
      padding: 30px 0px;
      width: 75%;

      @media ${devices.tablet} {
        width: 100%;
        padding: 30px 0px 0px 0px;
      }
    }
  
    .summary-part {
      width: 25%;
      border-left: 1px solid var(--light-orange-04);
      margin: 75px 0px 25px 0px;
      padding: 0px 15px;

      @media ${devices.tablet} {
        width: 100%;
        padding: 0px;
        border-left: unset;
        border-top: 2px solid var(--light-orange-04);
        margin: 0px 0px 25px 0px;
      }
    }
  }
`;

const Stepper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: -33px;
  position: absolute;

  @media ${devices.tablet} {
    margin-top: 0px;
  }

  div {
    width: 45%;
    padding: 20px;
    background-color: var(--light-orange-bg);
    border-radius: 35px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media ${devices.tablet} {
      padding: 20px 0px;
      width: 100%;
      border-radius: 35px;
    }

    div {
      width: fit-content;
      padding: 0px;

      @media ${devices.tablet} {
        width: 100%;
        border-radius: 0px;
        transform: scale(0.65);
      }

      button {
        background-color: transparent;
        color: var(--orange);
        border: unset;
        font-size: 16px;
        font-weight: 600;
      }
    }

    span {
      color: var(--orange);
      font-size: 16px;
      font-weigh: 700;
    }
  }
  
`;

const StepperNumber = styled.span`
  height: 26px;
  width: 30px;
  font-weight: 600;
  font-size: 16px;
  padding-top: 4px;
  background-color: var(--orange);
  border-radius: 50%;
  ${({ active }) => active === true ? 'opacity: 1; color: var(--white) !important;' :  'background-color: var(--light-orange-02); color: var(--orange) !important;'}
`

function Main() {
  const submitButtonRef = React.useRef(null);

  const state = useSelector((state) => state.allData);

  const renderSwitch = () => {
    switch (state.step) {
      case 1:
        return (
          <StepOne ref={submitButtonRef}/>
        );
      case 2:
        return (
          <StepTwo />
        );
      case 3:
        return (
          <StepThree />
        );
      default:
        return "error";
    }
  };

  const handleChildButtonClick = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  return (
    <StyledDiv>
      <MainCard>
        <Stepper>
          <div>
            <div>
              <StepperNumber active={true}>1</StepperNumber>
              <button>Delivery</button>
            </div>
            <span>&#10095;</span>
            <div>
              <StepperNumber active={state.step === 2 || state.step === 3}>2</StepperNumber>
              <button>Payment</button>
            </div>
            <span>&#10095;</span>
            <div>
              <StepperNumber active={state.step === 3}>3</StepperNumber>
              <button>Finish</button>
            </div>
          </div>
        </Stepper>
        <div className="row-main">
          <div className="switch-part">
            {renderSwitch()}
          </div>
          <div className="summary-part">
            <Summary onButtonClick={handleChildButtonClick}/>
          </div>
        </div>
      </MainCard>
    </StyledDiv>
  );
}

export default Main;
