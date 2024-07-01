package com.projetLocation.microbackfavori.repository;

import com.projetLocation.microbackfavori.model.Favori;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriRepository extends JpaRepository<Favori,Long> {
}
