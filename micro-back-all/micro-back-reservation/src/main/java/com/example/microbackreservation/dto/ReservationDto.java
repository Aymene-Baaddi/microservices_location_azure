package com.example.microbackreservation.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private Long id;
    private Long id_user;
    private Long id_voiture;
    private Date Datereservation;
    private Date Datedebut;
    private Date Datefin;
    private String nomv;
    private Double prix;
    private Integer annéeModel;
    private String image;
    private String nom;
    private  String prenom;
    private String adresse;
    private String cin;
    private String email;
    private Long age;
    private Long telephone;

}
