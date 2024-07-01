package com.projetLocation.microbackfavori.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class voiturefavoriDto {
    private Long id;
    private Integer vId;
    private Integer utiId;
    private String nomv;
    private Double prix;
    private Integer annéeModel;
    private String image;
}
