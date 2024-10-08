package projetLocation.microbackadmin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDto {

    private Long id;
    private String email;
    private String name;
    private String password;

}
