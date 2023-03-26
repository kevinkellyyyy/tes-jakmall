import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { changeStep, selectPayment, selectShipment } from '../redux/action';
import { devices } from './mediaQuery';

const StyledDiv = styled.div`
  padding: 0px 0px 0px 36px;
  background-color: var(--white);

  @media ${devices.tablet} {
    padding: 60px 20px 0px 20px;
  }

  .back-nav {
    font-size: 14px;
    margin-bottom: 25px;
    cursor: pointer;
    
    span:first-child {
      margin-right: 15px;
    }
  }

  .row-title {
    width: 100%;
    display: flex;
    margin-bottom: 36px;
    flex-direction: column;

    @media ${devices.tablet} {
      align-items: center;
      margin-bottom: 0px;
    }

    .box-selection {
      margin: 40px 0px 60px 0px;
      width: 75%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;

      @media ${devices.tablet} {
        margin: 20px 0px 20px 0px;
        width: 100%;
        gap: 5px;
      }

      .selection {
        background-color: var(--white);
        border: 1px solid var(--light-grey);
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        @media ${devices.tablet} {
          margin-right: 0px;
        }

        &.active {
          background-color: var(--transparent-green);
          border: 1px solid var(--green);
          
          .icon-check {
            position: absolute;
            top: 26px;
            right: 12px;
            color: var(--green);
            font-weight: bold;
          }
        }
        
        p {
          margin: 0px;
        }

        b {
          margin-top: 5px;
        }

      }
    }
  }

  .title {
    position: relative;
    font-size: 30px;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif !important;
    color: var(--orange);
  }

  .title::after {
    content: "";
    position: absolute;
    bottom: 5px;
    z-index: -1
    left: 0%;
    width: 18%;
    height: 6px;
    box-shadow: var(--title-shadow) 0px 6px 0px inset;
  }
`;
const StepTwo = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.allData);
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleSelectShipment = (data) => {
    dispatch(selectShipment(data));
  }

  const handleSelectPayment = (data) => {
    dispatch(selectPayment(data));
  }

  return (
    <StyledDiv>
      <div className='back-nav cursor-pointer' onClick={() => dispatch(changeStep(1))}><span>&#8592;</span><span>Back to delivery</span></div>
      
      <div className='row-title'>
        <div>
          <div className='title'>Shipment</div>
        </div>
        <div className='box-selection'>
          {state.shipments.map((shipment, index) => (
            <React.Fragment key={index}>
              <div className={`selection ${shipment.selected? 'active' : ''}`} onClick={() => handleSelectShipment(shipment)}>
                <p>{shipment.name}</p>
                <b>{numberWithCommas(shipment.price)}</b>
                {shipment.selected && <span className='icon-check'>&#10004;</span>}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='row-title'>
        <div>
          <div className='title'>Payment</div>
        </div>
        <div className='box-selection'>
          {state.payments.map((payment, index) => (
            <div key={index} className={`selection ${payment.selected? 'active' : ''}`} onClick={() => handleSelectPayment(payment)}>
              <p>{payment.name}</p>
              <b>{payment.balance? `${numberWithCommas(payment.balance)} left` : ''}</b>
              {payment.selected && <span className='icon-check'>&#10004;</span>}
            </div>
          ))}
        </div>
      </div>
    </StyledDiv>
  )
}

export default StepTwo
