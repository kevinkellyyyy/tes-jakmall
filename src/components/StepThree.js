import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { resetBackToStep1 } from '../redux/action';
import { devices } from './mediaQuery';

const StyledDiv = styled.div`
  padding: 0px 0px 0px 36px;
  width: 100%;
  height: 100%;
  position: relative;

  @media ${devices.tablet} {
    padding: 60px 0px 0px;
  }

  .back-nav {
    font-size: 16px;
    margin-bottom: 25px;
    font-weight: 500;
    color: var(--dark-grey);

    span:first-child {
      margin-right: 15px;
    }
  }

  .row-title {
    display: flex;
    margin-bottom: 36px;
    flex-direction: column;

    @media ${devices.tablet} {
      min-height: 200px;
    }
  }

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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

  .order-id {
    margin-top: 20px;
    font-weight: 700;
  }

  .msg-text {
    color : #555;
    font-size: 14px;
    margin-bottom: 60px;

    @media ${devices.tablet} {
      margin-bottom: 30px;
    }
  }
`
const StepThree = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.allData);

  const [currentShipment, setCurrentShipment] = useState(null);
  
  useEffect(() => {
    setCurrentShipment(
      state.shipments.filter(shipment => shipment.selected)
    )
  }, [state])

  const generateTrx = () => {
    const char = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let newTrx = '';
    for (let i = 0; i < 5; i++) {
      const rand = Math.floor(Math.random() * char.length);
      newTrx += char[rand];
    }
    return newTrx;
  }

  return (
    <StyledDiv>
      <div className='row-title'>
        <div className='center'>
          <div className='title'>Thank You</div>
          <p className='order-id'>Order ID : {generateTrx()}</p>
          {(state.step === 3 && currentShipment?.length) ?
            <p className='msg-text'>Your Order will be delivered {currentShipment[0]?.days} with {currentShipment[0]?.name}</p>
            :
            <></>
          }

          <div className='back-nav cursor-pointer' onClick={() => dispatch(resetBackToStep1())}><span>&#8592;</span><span>Go to homepage</span></div>
        </div>
      </div>
    </StyledDiv>
  )
}

export default StepThree
