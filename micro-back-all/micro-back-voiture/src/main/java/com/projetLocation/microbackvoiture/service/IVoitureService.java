package com.projetLocation.microbackvoiture.service;

import com.projetLocation.microbackvoiture.dto.VoitureDto;

import java.util.List;

public interface IVoitureService {

    VoitureDto newVoiture (VoitureDto voitureDto);

    List<VoitureDto> getVoiture();

    VoitureDto getByIdVoiture (Long id);

    VoitureDto updateVoiture (VoitureDto voitureDto, Long id);

    void deleteVoiture (Long id);
}
