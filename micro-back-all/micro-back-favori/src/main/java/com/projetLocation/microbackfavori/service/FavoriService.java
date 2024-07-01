package com.projetLocation.microbackfavori.service;
import com.projetLocation.microbackfavori.dto.voiturefavoriDto;
import com.projetLocation.microbackfavori.model.Favori;
import com.projetLocation.microbackfavori.repository.FavoriRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriService implements IFavoriService{

    @Autowired
    private FavoriRepository favoriRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private WebClient webClient;
    @Override
    public Favori ajouterFavori(voiturefavoriDto voitureFavoriDto) {

        Favori favori = modelMapper.map(voitureFavoriDto, Favori.class);
        Favori savedFavori = favoriRepository.save(favori);

        return savedFavori;
    }

    @Override
    public voiturefavoriDto getFavori(Long id) {
        Optional<Favori> optionalFavori = favoriRepository.findById(id);
        Favori favori = optionalFavori.orElseThrow(() -> new RuntimeException("Favori not found with ID: " + id));
        System.out.println(favori);

        Long voitureId = Long.valueOf(favori.getVId());

        voiturefavoriDto voiturefavoriDto = webClient.get()
                .uri("http://localhost:8080/api/voiture/" + voitureId)
                .retrieve()
                .bodyToMono(voiturefavoriDto.class)
                .block();
         voiturefavoriDto.setUtiId(favori.getUtiId());
         voiturefavoriDto.setVId(favori.getVId());
        voiturefavoriDto.setId(favori.getId());
        return voiturefavoriDto;
    }

    @Override
    public List<voiturefavoriDto> getAllFavoris() {
        List<Favori> favoris = favoriRepository.findAll();
        List<voiturefavoriDto> voitureFavoriDtos = new ArrayList<>();

        for (Favori favori : favoris) {
            Long voitureId = Long.valueOf(favori.getVId());

            voiturefavoriDto voiturefavoriDto = webClient.get()
                    .uri("http://localhost:8080/api/voiture/" + voitureId)
                    .retrieve()
                    .bodyToMono(voiturefavoriDto.class)
                    .block();

            if (voiturefavoriDto != null) {
                voiturefavoriDto.setUtiId(favori.getUtiId());
                voiturefavoriDto.setVId(favori.getVId());
                voiturefavoriDto.setId(favori.getId());
                voitureFavoriDtos.add(voiturefavoriDto);
            }
        }

        return voitureFavoriDtos;
    }


    @Override
    public void deleteFavori(Long id) {
        favoriRepository.deleteById(id);
    }


}
