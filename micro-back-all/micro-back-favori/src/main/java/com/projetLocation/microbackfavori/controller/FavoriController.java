package com.projetLocation.microbackfavori.controller;

import com.projetLocation.microbackfavori.dto.voiturefavoriDto;
import com.projetLocation.microbackfavori.model.Favori;
import com.projetLocation.microbackfavori.service.IFavoriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/favori")
public class FavoriController {

    @Autowired
    private IFavoriService iFavoriService;

    @PostMapping
    public Favori ajouterFavori(@RequestBody voiturefavoriDto voiturefavoriDto){
        return iFavoriService.ajouterFavori(voiturefavoriDto);
    }

    @GetMapping("/{id}")
    public voiturefavoriDto getFavori(@PathVariable Long id){return iFavoriService.getFavori(id);}

    @GetMapping
    public List<voiturefavoriDto> getAllFavoris(){return iFavoriService.getAllFavoris();}

    @DeleteMapping("/{id}")
    public void deleteFavori(@PathVariable Long id){iFavoriService.deleteFavori(id);}
}
