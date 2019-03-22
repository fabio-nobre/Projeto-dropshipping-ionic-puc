export interface ClienteDTO {
    id : string;
    nome : string;
    email : string;
    cpfOuCnpj : string;
    imageUrl? : string; //? = campo opcional
}