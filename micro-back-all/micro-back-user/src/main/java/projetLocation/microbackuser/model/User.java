package projetLocation.microbackuser.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long Ncompte;
    private String nom;
    private String prenom;
    private String email;
    private Long age;
    private String password;
    private String adresse;
    private String Cin;
    private String Ville;
    private Long telephone;




}
