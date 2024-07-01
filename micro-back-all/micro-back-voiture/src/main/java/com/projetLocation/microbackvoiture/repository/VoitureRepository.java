package com.projetLocation.microbackvoiture.repository;

import com.projetLocation.microbackvoiture.model.voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoitureRepository extends JpaRepository<voiture,Long> {
}
