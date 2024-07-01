package com.projetLocation.microbackvoiture.service;

import com.projetLocation.microbackvoiture.dto.VoitureDto;
import com.projetLocation.microbackvoiture.model.voiture;
import org.modelmapper.ModelMapper;
import com.projetLocation.microbackvoiture.repository.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VoitureService implements IVoitureService {

    @Autowired
    private VoitureRepository voitureRep;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public VoitureDto newVoiture(VoitureDto voitureDto) {
        voiture voiture = new voiture();
        voiture = modelMapper.map(voitureDto,voiture.class);
        voitureRep.save(voiture);
        return voitureDto;
    }

    @Override
    public List<VoitureDto> getVoiture() {
        List<VoitureDto> voitureDto = new ArrayList<>();
        List<voiture> voitures = voitureRep.findAll();
        for (voiture v : voitures ){
            VoitureDto vDto = modelMapper.map(v,VoitureDto.class);
            voitureDto.add(vDto);
        }
        return voitureDto;
    }

    @Override
    public VoitureDto getByIdVoiture(Long id) {
        Optional<voiture> voiture = voitureRep.findById(id);
        VoitureDto voitureDto = modelMapper.map(voiture,VoitureDto.class);
        System.out.println(voitureDto);
        return voitureDto;

    }

    @Override
    public VoitureDto updateVoiture(VoitureDto voitureDto, Long id) {
        voiture v = new voiture();
        v = modelMapper.map(voitureDto, voiture.class);
        voiture nvVoiture = v;
        voitureRep.findById(id).map(vo ->{
            vo.setNomv(nvVoiture.getNomv());
            vo.setPrix(nvVoiture.getPrix());
            vo.setDescription(nvVoiture.getDescription());
            vo.setAnnéeModel(nvVoiture.getAnnéeModel());
            vo.setEtat(nvVoiture.getEtat());
            vo.setDisponibilité(nvVoiture.getDisponibilité());

            return voitureRep.save(vo);
        } );
        return voitureDto;
    }

    @Override
    public void deleteVoiture(Long id) {
        voitureRep.deleteById(id);
    }
}
