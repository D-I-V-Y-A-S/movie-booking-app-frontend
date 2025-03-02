import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingComponent.css';
import { Link } from 'react-router-dom';
import { BE_URL } from '../../info';

const BookingComponent = () => {
  const token = window.localStorage.getItem('token');
  const seatArray = [
    {
      name: "A"
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
    {
      name: "D",
    },
    {
      name: "E",
    },
    {
      name: "F",
    }
  ]

  const [bookingDetail, setBookingDetail] = useState({
    firstName: '',
    lastName: '',
    slot: '',
    date: '',
    location: '',
    gender: ''
  });

  //seats booked by user already
  const [userSelectedSeats, setUserSelectedSeats] = useState([])

  const { firstName, lastName, slot, location, date, gender } = bookingDetail

//current seat booked by user
  const [seatSelected, setSeatSelected] = useState([])

  const [movieName, setMovieName] = useState('')


  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0)
  const [fair, setFair] = useState(0)

  const [disabledSeats, setDisabledSeats] = useState([]);

  useEffect(() => {
    if (token) {
      document.body.style.backgroundColor = "white";
    }

    const params = new URLSearchParams(window.location.search);
    const movieNameParam = params.get('movieName');
    setMovieName(movieNameParam);
    console.log(movieName)
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setBookingDetail({ ...bookingDetail, [name]: value });
    // console.log(bookingDetail)
  };

  useEffect(() => {
    if (location && slot && movieName && date) {
      axios.get(`${BE_URL}/user/ticket/seatsBooked/${location}`, {
        params: {
          movieName: movieName, slot: slot, date: date
        }
      })
        .then(response => {
          setDisabledSeats(response.data)
          console.log(disabledSeats)
        }
        )
        .catch((error) => { console.log(`Status : ${error.response.status} - ${error.response.data.message}`) })
    }
  }, [location, slot, movieName, date])

  const seatHandler = (seatName, seatType) => {
    //if i select a new seat it checks if its already existing so it can remove it 
    const isSeatSelected = seatSelected.some(seat => seat.seatName === seatName);

    if (isSeatSelected) {
      
      setSeatSelected(prev => prev.filter(item => item.seatName !== seatName));
      setSelectedSeatsCount(prev => prev - 1);
      if (seatType === 'Balcony') {
        setFair(prev => prev - 300);
      } else if (seatType === 'FirstClass') {
        setFair(prev => prev - 250);
      } else {
        setFair(prev => prev - 200);
      }
      setUserSelectedSeats(prev => prev.filter(item => item !== seatName));
    } 
    else {
      setSeatSelected(prev => [
        ...prev,
        {
          seatName: seatName,
          seatType: seatType,
          movieName: movieName,
          gender: gender
        }
      ]);

      console.log(userSelectedSeats)
      console.log(seatSelected)
      setSelectedSeatsCount(prev => prev + 1);
      if (seatType === 'Balcony') {
        setFair(prev => prev + 300);
      } else if (seatType === 'FirstClass') {
        setFair(prev => prev + 250);
      } else {
        setFair(prev => prev + 200);
      }
      console.log(userSelectedSeats.includes(seatName) ? true : false);
      setUserSelectedSeats(prev => [
        ...prev,
        seatName

      ]);
      console.log(userSelectedSeats)
    }
  };

  const formHandler = async (event) => {
    event.preventDefault();

    // console.log(seatSelected)
    // console.log(bookingDetail)
    await axios
      .post(`${BE_URL}/booktickets`, { bookingDetail: bookingDetail, data: seatSelected },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        if (response.status === 201) {
          alert(response.data.message)
          window.location.href = '/moviesPage'
        }
        else {
          alert(response.data.message)
        }
      })
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  }
//2024-06-22T12:00:00.000Z
  const today = new Date();
  // console.log(today) -->Fri Jun 28 2024 09:32:55
  const todayString = today.toISOString().split('T')[0];
  // console.log(todayString)-->2024-06-28
  const nextMonth = new Date(today);
  //user can book movie only to 1 month
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  // console.log(nextMonth)-->Sun Jul 28 2024 09:34:32
  const nextMonthString = nextMonth.toISOString().split('T')[0];
// console.log(nextMonthString)-->2024-06-28

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <nav className="navbar">
        <div className="logo">
          <i className="bi bi-film"></i>
          <a href="#">FILM FIESTA</a>
        </div>

        <div className="menu">
          <Link to='/userLogout' className="log-out">Logout</Link>
        </div>
        <div className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>
      <div className='box7'>
        <h1 style={{ textAlign: "center", marginBottom: "4%", textShadow: "2px 5px white" }}>BOOK YOUR SHOW</h1>
        <form onSubmit={formHandler}>
          <div className='form-group1'>
            <b>MOVIE NAME</b>
            <input type='text' value={movieName} disabled />
          </div>
          <div className='form-group1'>
            <b>AMOUNT</b>
            <input type='number' value={fair} disabled id='amount' />
          </div>

          <div className='form-group1'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              placeholder='First Name'
              onChange={handleInput}
              required
            />
          </div>
          <div className='form-group1'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              placeholder='Last Name'
              onChange={handleInput}
              required
            />
          </div>

          <div className='form-group1'>
            <b>DATE</b>
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleInput}
              id="date-picker"
              min={todayString}
              max={nextMonthString}
            />
          </div>

          <div className='form-group1'>
            <select name='gender' value={gender} onChange={handleInput} required>
              <option value=''>--Choose Your Gender--</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          {/* <div className='form-group1'>
            <select name='consideration' value={consideration} onChange={handleInput} required>
              <option value=''>--Give Your Consideration for neighbour viewer--</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='No consideration'>No Consideration</option>
            </select>
          </div> */}

          <div className='form-group1'>
            <select name='slot' value={slot} onChange={handleInput} required>
              <option value=''>--Choose Your Slot--</option>
              <option value='8:00am - 11:00am'>8:00am - 11:00am </option>
              <option value='12:00pm - 3:00pm'>12:00pm - 3:00pm</option>
              <option value='4:00pm - 7:00pm'>4:00pm - 7:00pm</option>
              <option value='8:00pm - 11:00pm'>8:00pm - 11:00pm</option>
            </select>
          </div>

          <div className='form-group1'>
            <select name='location' value={location} onChange={handleInput} required>
              <option value=''>--Choose Location--</option>
              <option value="XYZ Mall, Velacherry">XYZ Mall, Velacherry</option>
              <option value="ABC Plaza, Anna Nagar">ABC Plaza, Anna Nagar</option>
              <option value="PQR Center, T. Nagar">PQR Center, T. Nagar</option>
              <option value="LMN Square, Mylaporer">LMN Square, Mylapore</option>

            </select>
          </div>

          <div className='seat-type'>
            <div className='info-seats'>
              <div className='seat'>
              </div><b>-Balcony - Rs.300</b></div>
            <div className='info-seats'>
              <div className='seat-firstClass'>
              </div><b>-FirstClass - Rs.250</b></div>
            <div className='info-seats'>
              <div className='seat-secondClass'>
              </div><b>-SecondClass - Rs.200</b></div>
          </div>

          <div className='container'>
            {seatArray.map((dataRow, rowIndex) => (
              <div key={`row-${dataRow}-${rowIndex}`}>
                {[...Array(9)].map((_, seatIndex) => {
                  const seatKey = `row${rowIndex}-seat${seatIndex}`;
                  const seatName = `${dataRow.name}${seatIndex + 1}`
                  const isDisabled = disabledSeats.some(seat => seat.seatName === seatName);

                  // console.log(isDisabled,seatName)
                  if (seatIndex < 3 && isDisabled === false) {
                    return (
                      <div
                        key={`${seatKey}-balcony`}
                        className={` ${userSelectedSeats.includes(dataRow.name + Number(seatIndex + 1)) ? "seat-select" : "seat"}`}
                        onClick={() => seatHandler(`${dataRow.name}${Number(seatIndex) + 1}`, 'Balcony')}
                      >{`${dataRow.name}${Number(seatIndex) + 1}`}</div>
                    )
                  } else if (seatIndex >= 3 && seatIndex < 6 && isDisabled === false) {
                    return (
                      <div
                        key={`${seatKey}-firstClass`}
                        className={` ${userSelectedSeats.includes(dataRow.name + Number(seatIndex + 1)) ? "seat-select" : "seat-firstClass"}`}
                        onClick={() => { seatHandler(`${dataRow.name}${Number(seatIndex) + 1}`, 'FirstClass') }}
                      >{`${dataRow.name}${Number(seatIndex) + 1}`}</div>
                    );
                  }
                  else if (seatIndex >= 6 && isDisabled === false) {
                    return (
                      <div
                        key={`${dataRow.name}-${seatIndex}-secondClass`}
                        className={` ${userSelectedSeats.includes(dataRow.name + Number(seatIndex + 1)) ? "seat-select" : "seat-secondClass"}`}
                        onClick={() => seatHandler(`${dataRow.name}${Number(seatIndex) + 1}`, 'SecondClass')}
                      >
                        {`${dataRow.name}${seatIndex + 1}`}
                      </div>

                    );
                  }

                  else if (isDisabled) {
                    const disabledSeat = disabledSeats.find(seat => seat.seatName === seatName);
                    if (disabledSeat) {
                      let genderClass = '';
                      if (disabledSeat.gender === 'Male') {
                        genderClass = 'no-seat';
                      } else if (disabledSeat.gender === 'Female') {
                        genderClass = 'no-seat-F';
                      } else if (disabledSeat.gender === 'Other') {
                        genderClass = 'no-seat-o';
                      }
                      return (
                        <div key={`${seatKey}-disabled`} className={genderClass}>
                          <span style={{ color: 'black' }}>{disabledSeat.gender.charAt(0)}</span>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            ))}
          </div>

          {selectedSeatsCount > 0 && (
            <p className='text'>
              You have booked <span id='count'>{selectedSeatsCount}</span>{' '}
              for a price of RS.
              <span id='total'>{fair}</span>
            </p>
          )}

          <div className='btn-1'>
            <button type='submit' >BOOK SHOW</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default BookingComponent;
