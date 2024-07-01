package com.example.microbackreservation.repository;

import com.example.microbackreservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReservationRepository  extends JpaRepository<Reservation,Long> {
}
