package com.projetLocation.microbackvoiture.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoitureDto {
    private Long id;
    private String nomv;
    private String image;
    private Double prix;
    private String description;
    private Integer annéeModel;
    private String etat;
    private Boolean disponibilité;
}
