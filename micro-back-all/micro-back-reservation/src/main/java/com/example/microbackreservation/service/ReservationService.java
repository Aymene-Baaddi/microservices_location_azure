package com.example.microbackreservation.service;

import com.example.microbackreservation.dto.ReservationDto;
import com.example.microbackreservation.model.Reservation;
import com.example.microbackreservation.repository.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService implements IReservationService{

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private WebClient webClient;

    @Override
    public Reservation newReservation(ReservationDto reservationDto) {

        Reservation reservation = modelMapper.map(reservationDto,Reservation.class);
        reservationRepository.save(reservation);
        return reservation;
    }


    @Override
    public List<ReservationDto> getReservation() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDto> reservationDtos = new ArrayList<>();
        for (Reservation reservation : reservations) {

            Long voitureId = Long.valueOf(reservation.getId_voiture());
            Long userId = Long.valueOf(reservation.getId_user());

            ReservationDto reservationDto = webClient.get()
                    .uri("http://localhost:8080/api/voiture/" + voitureId)
                    .retrieve()
                    .bodyToMono(ReservationDto.class)
                    .block();
            ReservationDto reservationDto1  = webClient.get()
                    .uri("http://localhost:8080/api/user/" + userId)
                    .retrieve()
                    .bodyToMono(ReservationDto.class)
                    .block();
            reservationDto.setId(reservation.getId());
            reservationDto.setId_user(reservation.getId_user());
            reservationDto.setId_voiture(reservation.getId_voiture());
            reservationDto.setDatefin(reservation.getDatefin());
            reservationDto.setDatedebut(reservation.getDatedebut());
            reservationDto.setDatereservation(reservation.getDatereservation());
            reservationDto.setCin(reservationDto1.getCin());
            reservationDto.setAdresse(reservationDto1.getAdresse());
            reservationDto.setEmail(reservationDto1.getEmail());
            reservationDto.setNom(reservationDto1.getNom());
            reservationDto.setPrenom(reservationDto1.getPrenom());
            reservationDto.setTelephone(reservationDto1.getTelephone());
            reservationDto.setAge(reservationDto1.getAge());
            reservationDtos.add(reservationDto);
        }
        System.out.println(reservationDtos);

        return reservationDtos;
    }


    @Override
    public ReservationDto getReservationById(Long id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        Reservation reservation = optionalReservation.orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + id));
        System.out.println(reservation);

        Long voitureId = Long.valueOf(reservation.getId_voiture());
        Long userId = Long.valueOf(reservation.getId_user());


        ReservationDto reservationDto  = webClient.get()
                .uri("http://localhost:8080/api/voiture/" + voitureId)
                .retrieve()
                .bodyToMono(ReservationDto.class)
                .block();
        ReservationDto reservationDto1  = webClient.get()
                .uri("http://localhost:8080/api/user/" + userId)
                .retrieve()
                .bodyToMono(ReservationDto.class)
                .block();
        reservationDto.setId(reservation.getId());
        reservationDto.setId_user(reservation.getId_user());
        reservationDto.setId_voiture(reservation.getId_voiture());
        reservationDto.setDatefin(reservation.getDatefin());
        reservationDto.setDatedebut(reservation.getDatedebut());
        reservationDto.setDatereservation(reservation.getDatereservation());
        reservationDto.setCin(reservationDto1.getCin());
        reservationDto.setAdresse(reservationDto1.getAdresse());
        reservationDto.setEmail(reservationDto1.getEmail());
        reservationDto.setNom(reservationDto1.getNom());
        reservationDto.setPrenom(reservationDto1.getPrenom());
        reservationDto.setTelephone(reservationDto1.getTelephone());
        reservationDto.setAge(reservationDto1.getAge());


        return reservationDto;
    }

    @Override
    public Optional<Reservation> updateReservation(ReservationDto reservationDto, Long id) {


        Reservation reservation= modelMapper.map(reservationDto, Reservation.class);

        Optional<Reservation> reservation1=reservationRepository.findById(id).map(r ->{

            r.setDatereservation(reservation.getDatereservation());
            r.setDatefin(reservation.getDatefin());
            r.setDatedebut(reservation.getDatedebut());
            return reservationRepository.save(r);
        } );
        return reservation1;
    }
    @Override
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
