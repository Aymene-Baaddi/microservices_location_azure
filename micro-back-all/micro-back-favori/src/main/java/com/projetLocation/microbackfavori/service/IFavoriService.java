package com.projetLocation.microbackfavori.service;


import com.projetLocation.microbackfavori.dto.voiturefavoriDto;
import com.projetLocation.microbackfavori.model.Favori;

import java.util.List;

public interface IFavoriService {

     Favori ajouterFavori(voiturefavoriDto voiturefavoriDto);

     voiturefavoriDto getFavori(Long id);

     List<voiturefavoriDto> getAllFavoris();

     void deleteFavori(Long id);

}
