package com.example.microbackreservation.controller;


import com.example.microbackreservation.dto.ReservationDto;
import com.example.microbackreservation.model.Reservation;
import com.example.microbackreservation.service.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    public IReservationService iReservationService;

    @PostMapping
    public Reservation createreservation(@RequestBody ReservationDto reservationDto){
        return iReservationService.newReservation(reservationDto);
    }

    @GetMapping
    public List<ReservationDto> getallreservation(){
        return iReservationService.getReservation();
    }

    @GetMapping("/{id}")
    public ReservationDto getbyId(@PathVariable Long id){
        return iReservationService.getReservationById(id);
    }
    @PutMapping("/{id}")
    public Optional<Reservation> updatereservation(@RequestBody ReservationDto reservationDto, @PathVariable Long id){
        return iReservationService.updateReservation(reservationDto,id);
    }
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id){iReservationService.deleteReservation(id);}

}
