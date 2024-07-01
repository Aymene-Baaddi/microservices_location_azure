package projetLocation.microbackuser.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
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
