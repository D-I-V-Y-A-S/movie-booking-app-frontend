import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingComponent.css';
import { Link } from 'react-router-dom';

const BookingComponent = () => {
  const seatArray = [
    {
      name: "A",
      type: "balcony",
    },
    {
      name: "B",
      type: "balcony",
    },
    {
      name: "C",
      type: "firstClass",
    },
    {
      name: "D",
      type: "firstClass",
    },
    {
      name: "E",
      type: "secondClass",
    },
    {
      name: "F",
      type: "secondClass",
    }
  ]
  const [bookingDetail, setBookingDetail] = useState({
    firstName: '',
    lastName: '',
    slot: '',
    date: '',
    location: '',
  });
  const { firstName, lastName, slot, location, date } = bookingDetail

  const [seatSelected, setSeatSelected] = useState([])
  const [movieName, setMovieName] = useState('')

  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0)
  const [fair, setFair] = useState(0)
  const [disabledSeats, setDisabledSeats] = useState([]);

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get(`http://localhost:3500/api/v1/movie/user/ticket/seatsBooked`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status == 200) {
            console.log(response.data)
            setDisabledSeats(response.data)
          }
        })
        .catch((error) => { console.log(`Status : ${error.response.status} - ${error.response.data.message}`) })

      document.body.style.backgroundColor = "rgb(13, 122, 164)";
      const params = new URLSearchParams(window.location.search);
      const movieNameParam = params.get('movieName');
      setMovieName(movieNameParam);
    }
    else {
      alert("Login to book movies!!");
    }
  }, []);

  useEffect(() => {
    setFair(selectedSeatsCount * 200);
  }, [selectedSeatsCount]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setBookingDetail({ ...bookingDetail, [name]: value });
  };

  const seatHandler = (seatName, seatType) => {
    setSeatSelected((prev) => [...prev, {
      firstName: firstName,
      lastName: lastName,
      location: location,
      slot: slot,
      date: date,
      seatName: seatName,
      seatType: seatType,
      movieName: movieName
    }]);

    setSelectedSeatsCount((prev) => prev + 1)
    console.log(seatSelected);
  }

  const formHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:3500/api/v1/movie/booktickets`,   { data: seatSelected },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {if(response.status===201){
        alert(response.data.message)
        window.location.href = '/moviesPage'
      }
      else{
        alert(response.data.message)
      }
      })
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  }

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthString = nextMonth.toISOString().split('T')[0];

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
        <h1 style={{ textAlign: "center", marginBottom: "4%" }}>BOOK YOUR SHOW</h1>
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
              <option value="LMN Square, Mylapore">LMN Square, Mylapore</option>
            </select>
          </div>
          <div className='seat-type'>
            <div className='info-seats'>
              <div className='seat'>
              </div><b>-Balcony</b></div>
            <div className='info-seats'>
              <div className='seat-firstClass'>
              </div><b>-FirstClass</b></div>
            <div className='info-seats'>
              <div className='seat-secondClass'>
              </div><b>-SecondClass</b></div>
            <div className='info-seats'>
              <div className='no-seat'>
              </div><b>-Booked</b></div>
          </div>

          <div className='container'>
            {seatArray.map((dataRow, rowIndex) => (
              <div key={rowIndex}>
                {[...Array(6)].map((_, seatIndex) => {
                  const seatKey = `row${rowIndex}-seat${seatIndex}`;
                  const seatName = `${dataRow.name}${seatIndex + 1}`
                  const isDisabled = disabledSeats.some(seat => seat.seatName === seatName);
                  // console.log(isDisabled,seatName)
                  if (seatIndex < 2 && isDisabled === false) {
                    return (

                      <div
                        key={seatIndex}
                        className='seat'
                        onClick={() => seatHandler(`${dataRow.name}${Number(seatIndex) + 1}`, dataRow.type)}
                      ></div>
                    )
                  } else if (seatIndex >= 2 && seatIndex < 4 && isDisabled === false) {
                    return (
                      <div
                        key={seatIndex}
                        className='seat-firstClass'
                        onClick={() => seatHandler(`${dataRow.name}${Number(seatIndex) + 1}`, dataRow.type)}
                      ></div>
                    );
                  }
                  else if (seatIndex >= 4 && isDisabled === false) {
                    return (
                      <div
                        key={seatIndex}
                        className='seat-secondClass'
                        onClick={() => seatHandler(`${dataRow.name}${Number(seatIndex) + 1}`, dataRow.type)}
                      ></div>
                    );
                  }
                  else {
                    return (
                      <div
                        key={seatIndex}
                        className='no-seat'
                      ></div>
                    )
                  }
                })}
              </div>
            ))}
          </div>

          {selectedSeatsCount > 0 && (
            <p className='text'>
              You have booked <span id='count'>{selectedSeatsCount}</span>{' '}
              {selectedSeatsCount > 1 ? 'tickets' : 'ticket'} for a price of RS.
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
