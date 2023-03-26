import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { changeStep } from '../redux/action';
import { devices } from './mediaQuery';

const StyledDiv = styled.div`
  padding: 0px 10px 0px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  background-color: var(--white);

  @media ${devices.tablet} {
    padding: 0px 15px 20px;
  }

  .title {
    font-size: 24px;
    color: var(--orange);
    font-weight: 700;
    margin: 10px 0px;
    
    @media ${devices.tablet} {
      text-align: center;
    }
  }

  .purch-items {
    font-size: 14px;
    color: var(--dark-grey);
    margin-bottom: 30px;

    @media ${devices.tablet} {
      text-align: center;
    }
  }

  .half-border-top {
    padding: 20px 0px;
    font-weight: 600;
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-image-source: linear-gradient(to right, var(--summary-ship-pay-border) 30%, transparent 0%);
    border-image-slice: 1;
  }
  
  .green-text {
    color: var(--green);
    margin-top: 10px;
    font-size: 18px;
  }
  
  .row {
    width: 100%;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
  }

  .subtitle {
    color: var(--dark-grey);
  }

  .subtitle-value {
    margin-bottom: 12px;
    font-weight: 700;
  }

  .total {
    font-size: 24px;
    color: var(--orange);
    font-weight: 700;
    margin: 20px 0px;
  }

  .btn-pay {
    background: var(--orange);
    border: 1px solid var(--orange);
    box-shadow: 3px 5px 10px var(--light-orange-02);
    border-radius: 2px;
    color: var(--white);
    width: 100%;
    height: 60px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
  }

  .btn-disabled {
    background: var(--grey);
    border: 1px solid var(--grey);
    border-radius: 2px;
    color: var(--white);
    width: 100%;
    height: 60px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    cursor: not-allowed; 
  }
`;
const Summary = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.allData);
  const [currentShipment, setCurrentShipment] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);

  useEffect(() => {
    setCurrentShipment(
      state.shipments.filter(shipment => shipment.selected)
    )
    setCurrentPayment(
      state.payments.filter(payment => payment.selected)
    )
  }, [state])
  

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handlePayment = () => {
    dispatch(changeStep(3));
  }

  return (
    <StyledDiv>
      <div className='flex-top-section'>
        <div className='title'>Summary</div>
        <div className='purch-items'>10 items purchased</div>
        
        {(state.step !== 1 && currentShipment?.length) ?
          <div className='half-border-top'>
            <div>Delivery estimation</div>
            <div className='green-text'>{currentShipment[0]?.days} by {currentShipment[0]?.name}</div>
          </div>
          :
          <></>
        }

        {(state.step === 3 && currentPayment?.length) ?
          <div className='half-border-top'>
            <div>Payment Method</div>
            <div className='green-text'>{currentPayment[0]?.name}</div>
          </div>
          :
          <></>
        }
      </div>
      <div className='flex-end-section'>
        <div className='row space-between'>
          <div className='subtitle'>Cost of goods</div>
          <div className='subtitle-value'>500,000</div>
        </div>
        {state.isDropShip && 
          <div className='row space-between'>
            <div className='subtitle'>Dropshipping Fee</div>
            <div className='subtitle-value'>5,900</div>
          </div>
        }
        {(state.step !== 1 && currentShipment?.length) ? 
          <div className='row space-between'>
            <div className='subtitle'><b>{currentShipment[0]?.name}</b> Shipment</div>
            <div className='subtitle-value'>{numberWithCommas(currentShipment[0]?.price)}</div>
          </div>
          :
          <></>
        }
        <div className='row space-between'>
          <div className='total'>Total</div>
          <div className='total'>
            {numberWithCommas(
              500000 + 
              (state.isDropShip ? 5900 : 0) +
              (state.shippingFee ? state.shippingFee : 0 )
            )}
          </div>
        </div>
        {state.step === 1 &&
          <div>
            <button className='btn-pay cursor-pointer' onClick={props.onButtonClick}>Continue to Payment</button>
          </div>
        }
        {(state.step === 2) ?
          <>
            {(currentShipment?.length && currentPayment?.length) ?
            <>
              <button className='btn-pay cursor-pointer' onClick={() => handlePayment()}>Pay with {currentPayment[0]?.name}</button>
            </>
            :
            <>
              <button disabled className='btn-disabled'>Please Select payment & shipment</button>
            </>
            }
          </>
          :
          <></>
        }
      </div>
    </StyledDiv>
  )
}

export default Summary
