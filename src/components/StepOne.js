import React, { forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveData, setIsDropship } from '../redux/action';
import styled from "styled-components";
import { devices } from './mediaQuery';

const StyledDiv = styled.div` 
    padding: 0px 0px 0px 36px;

    @media ${devices.tablet} {
      padding: 60px 20px 0px 20px;
    }

    .back-nav {
      font-size: 14px;
      margin-bottom: 25px;

      span:first-child {
        margin-right: 15px;
      }
    }

    .row-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 36px;

      @media ${devices.tablet} {
        flex-direction: column;
      }
    }
    

    .title {
      position: relative;
      font-size: 30px;
      font-weight: 700;
      font-family: 'Montserrat', sans-serif !important;
      color: var(--orange);
      
      @media ${devices.tablet} {
        text-align: center;
      }
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

    .row-form {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 36px;

      @media ${devices.tablet} {
        flex-direction: column;
      }

      .column-1 {
        width: 55%;

        @media ${devices.tablet} {
          width: 100%;
        }

        .icon-check {
          position: absolute;
          top: 26px;
          right: 18px;
          color: var(--green);
          font-weight: bold;
        }
        
        .icon-cross {
          position: absolute;
          top: 26px;
          right: 18px;
          color: var(--orange);
          font-weight: bold;
        }
      }

      .column-2 {
        width: 45%;

        @media ${devices.tablet} {
          width: 100%;
        }

        .icon-check {
          position: absolute;
          top: 26px;
          right: 12px;
          color: var(--green);
          font-weight: bold;
        }
        
        .icon-cross {
          position: absolute;
          top: 26px;
          right: 12px;
          color: var(--orange);
          font-weight: bold;
        }
      }
    }

    .form-input {
      display: grid;
      margin-right: 20px;
      margin-bottom: 20px;
      position: relative;

      @media ${devices.tablet} {
        margin-right: 0px;
      }

      input {
        height 60px;
        font-size: 13px;
        padding: 10px 17px 0px 17px;
      }

      input:focus-visible, textarea:focus-visible {
        outline: unset
      }

      textarea {
        min-height: 110px;
        resize: none;
        font-size: 13px;
        padding: 30px 17px 0px 17px;
      }
      
      label {
        font-size: 13px;
        padding: 0 18px;
        color: var(--grey);
        pointer-events: none;
        position: absolute;
        transform: translate(0, 27px) scale(1);
        transform-origin: top left;
        transition: all 0.2s ease-out;
      }

      .word-count {
        position: absolute;
        right: 0px;
        top: 148px;
        color: var(--grey);
        font-size: 12px;

        @media ${devices.tablet} {
          top: 140px;
        }
      }
    }

    .form-input {
      .active {
        transform: translate(5px, 14px) scale(0.75);
      }
    }

    p {
      color: var(--red-error);
      font-size: 12px;
      margin-bottom: 0px;
      margin-top: 5px;
    }

    .checkbox-drop {      
      display: flex;
      align-content: center;
      align-items: center;

      @media ${devices.tablet} {
        margin-top: 10px;
      }

      span {
        margin-right: 20px;
        font-size: 14px;
      }

    }
    
    input:disabled {
      background-color: var(--input-disabled);
      cursor: not-allowed; 
    }

    .banish-btn {
      display: none;
      visibility: hidden;
      pointer-events: none;
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
`;

const StepOne = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.allData);

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: state.dataForm.email,
      phone: state.dataForm.phone,
      address: state.dataForm.address,
      dropshipper_name: state.dataForm.dropshipper_name,
      dropshipper_phone: state.dataForm.dropshipper_phone,
    }
  });

  const onSubmit = (data) => {
    dispatch(saveData(data));
  };

  function filterInput(e) {
    const allowedChars = /[0-9()+-]/;
    const key = e.key;
    if (!allowedChars.test(key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (!state.isDropShip) {
      clearErrors('dropshipper_name');
      clearErrors('dropshipper_phone');
      setValue('dropshipper_name', '');
      setValue('dropshipper_phone', '');
    }
  }, [state.isDropShip]);

  return (
    <StyledDiv>
      <div className='back-nav cursor-pointer'><span>&#8592;</span><span>Back to cart</span></div>
      
      <div className='row-title'>
        <div>
          <div className='title'>Delivery Details</div>
        </div>
        <div>
          <div className='checkbox-drop'> <input type="checkbox" checked={state.isDropShip} onChange={(e) => dispatch(setIsDropship(e.target.checked))}></input> <span>Send as Dropshipper</span></div>
        </div>
      </div>

      <div >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row-form'>
            <div className='column-1'>
              <div className='form-input'>
                {
                  watch("email") !== "" && !errors?.email
                  ? <span className='icon-check'>&#10004;</span>
                  : errors?.email
                  ? <span className='icon-cross'>&#10540;</span>
                  : ""
                }
                <label className={ watch('email') !== '' ? "active" : ""}>Email</label>
                <input
                  style={{
                    border:
                      watch("email") !== "" && !errors?.email
                        ? "1px solid var(--green)"
                        : errors?.email
                        ? "1px solid var(--orange)"
                        : "1px solid var(--light-grey)",
                  }}
                  {...register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/
                  })}
                />
                {errors?.email?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.email?.type === "pattern" && (
                  <p>Entered value does not match email format</p>
                )}
              </div>

              <div className='form-input'>
                {
                  watch("phone") !== "" && !errors?.phone
                  ? <span className='icon-check'>&#10004;</span>
                  : errors?.phone
                  ? <span className='icon-cross'>&#10540;</span>
                  : ""
                }
                <label className={ watch('phone') !== '' ? "active" : ""}>Phone Number</label>
                <input
                  onKeyDown={filterInput}
                  style={{
                    border:
                      watch("phone") !== "" && !errors?.phone
                        ? "1px solid var(--green)"
                        : errors?.phone
                        ? "1px solid var(--orange)"
                        : "1px solid var(--light-grey)",
                  }}
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9\-+()]*$/,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                {errors?.phone?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.phone?.type === "pattern" && (
                  <p>Entered value does not match phone format</p>
                )}
                {errors?.phone?.type === "minLength" && (
                  <p>minimum 6 digits number</p>
                )}
                {errors?.phone?.type === "maxLength" && (
                  <p>maximum 20 digits number</p>
                )}
              </div>

              <div className='form-input'>
                {
                  watch("address") !== "" && !errors?.address
                  ? <span className='icon-check'>&#10004;</span>
                  : errors?.address
                  ? <span className='icon-cross'>&#10540;</span>
                  : ""
                }
                <label className={ watch('address') !== '' ? "active" : ""}>Delivery Address</label>
                <textarea
                  style={{
                    border:
                      watch("address") !== "" && !errors?.address
                        ? "1px solid var(--green)"
                        : errors?.address
                        ? "1px solid var(--orange)"
                        : "1px solid var(--light-grey)",
                  }}
                  {...register("address", {
                    required: true,
                    maxLength: 120,
                  })}
                />
                {errors?.address?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.address?.type === "maxLength" && (
                  <p>Max 120 characters!</p>
                  )}
                <span className='word-count'>{watch('address').length} / 120</span>
              </div>
            </div>
            <div className='column-2'>
              <div className='form-input'>
                {
                  watch("dropshipper_name") !== "" && !errors?.dropshipper_name
                  ? <span className='icon-check'>&#10004;</span>
                  : errors?.dropshipper_name
                  ? <span className='icon-cross'>&#10540;</span>
                  : ""
                }
                <label className={ watch('dropshipper_name') !== '' ? "active" : ""}>Dropshipper Name</label>
                <input
                  disabled={state.isDropShip ? false : true}
                  style={{
                    border:
                      watch("dropshipper_name") !== "" && !errors?.dropshipper_name
                        ? "1px solid var(--green)"
                        : errors?.dropshipper_name
                        ? "1px solid var(--orange)"
                        : "1px solid var(--light-grey)",
                  }}
                  {...register("dropshipper_name", {
                    required: state.isDropShip ? true : false
                  })}
                />
                {errors?.dropshipper_name?.type === "required" && (
                  <p>This field is required</p>
                )}
              </div>

              <div className='form-input'>
                {
                  watch("dropshipper_phone") !== "" && !errors?.dropshipper_phone
                  ? <span className='icon-check'>&#10004;</span>
                  : errors?.dropshipper_phone
                  ? <span className='icon-cross'>&#10540;</span>
                  : ""
                }
                <label className={ watch('dropshipper_phone') !== '' ? "active" : ""}>Dropshipper Phone Number</label>
                <input
                  onKeyDown={filterInput}
                  disabled={state.isDropShip ? false : true}
                  style={{
                    border:
                      watch("dropshipper_phone") !== "" && !errors?.dropshipper_phone
                        ? "1px solid var(--green)"
                        : errors?.dropshipper_phone
                        ? "1px solid var(--orange)"
                        : "1px solid var(--light-grey)",
                  }}
                  {...register("dropshipper_phone", {
                    required: state.isDropShip ? true : false,
                    pattern: /^[0-9\-+()]*$/,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                {errors?.dropshipper_phone?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.dropshipper_phone?.type === "pattern" && (
                  <p>Entered value does not match dropshipper_phone format</p>
                )}
                {errors?.dropshipper_phone?.type === "minLength" && (
                  <p>minimum 6 digits number</p>
                )}
                {errors?.dropshipper_phone?.type === "maxLength" && (
                  <p>maximum 20 digits number</p>
                )}

              </div>
            </div>
          </div>
          <input className='banish-btn' type="submit" ref={ref} />
        </form>
      </div>

    </StyledDiv>
  )
})

export default StepOne
