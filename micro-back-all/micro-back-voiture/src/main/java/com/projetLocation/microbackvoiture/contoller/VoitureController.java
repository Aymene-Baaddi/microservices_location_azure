package com.projetLocation.microbackvoiture.contoller;

import com.projetLocation.microbackvoiture.dto.VoitureDto;
import com.projetLocation.microbackvoiture.service.IVoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/voiture")
public class VoitureController {
    @Autowired
    public IVoitureService iVoitureService;

    @PostMapping
    public VoitureDto newVoiture(@RequestBody VoitureDto voitureDto){return iVoitureService.newVoiture(voitureDto);}

    @GetMapping
    public List<VoitureDto> getVoiture(){return iVoitureService.getVoiture();}

    @GetMapping("{id}")
    public VoitureDto getByIdVoiture(@PathVariable Long id){return iVoitureService.getByIdVoiture(id);}

    @PutMapping("{id}")
    public VoitureDto updateVoiture(@RequestBody VoitureDto voitureDto, @PathVariable Long id){return iVoitureService.updateVoiture(voitureDto,id);}


    @DeleteMapping("{id}")
    public void deleteVoiture(@PathVariable Long id){iVoitureService.deleteVoiture(id);}


}
