import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ViewBookingsComponent.css'
import { BE_URL } from '../../info'
import { useNavigate } from "react-router-dom";

const ViewBookingsComponent = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [nobookings,setNoBookings]=useState('')
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            document.body.style.backgroundColor = "skyblue";
            axios.get(`${BE_URL}/viewBookings/tickets`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if(response.status===200){
                    if(response.data.length===0)
                        {
                            setNoBookings("No Bookings Made Yet!")
                        }
                        setBookings(response.data)
                    console.log(bookings)}})
            .catch(error => console.log(error.response.data));
        } else {
            alert("Login to view bookings!!");
             navigate('/');
        }
    }, []);

    return (
        <div className="bookings">
            <h2 style={{textAlign:"center",padding:"1%",fontSize:"40px"}}>Booking Details</h2>
            
            { bookings && bookings.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Movie Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Slot</th>
                        <th>Seat Number</th>
                        <th>Seat Type</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.firstName} {booking.lastName}</td>
                            <td>{booking.movieName}</td>
                            <td>{booking.date}</td>
                            <td>{booking.location}</td>
                            <td>{booking.slot}</td>
                            <td>{booking.seatName}</td>
                            <td>{booking.seatType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ):<p style={{textAlign:"center",fontSize:"50px",color:"blue"}}>{nobookings}</p>}
        </div>
    );
};

export default ViewBookingsComponent;
