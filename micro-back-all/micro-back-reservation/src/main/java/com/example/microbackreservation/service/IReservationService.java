package com.example.microbackreservation.service;

import com.example.microbackreservation.dto.ReservationDto;
import com.example.microbackreservation.model.Reservation;

import java.util.List;
import java.util.Optional;

public interface IReservationService {
     Reservation newReservation (ReservationDto reservationDto);

    List<ReservationDto> getReservation();

    ReservationDto getReservationById (Long id);

    Optional<Reservation> updateReservation (ReservationDto reservationDto, Long id);

    void deleteReservation(Long id);


}
