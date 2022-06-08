export interface PacoteDTO {
    id?: number;
    enderecoDestino:  string;
    enderecoOrigem: string;
    codigoRastreio: any;
    dataPostagem: any;
    dataEntrega?: any;
    cliente: string;
    cpf: string;
    situacao: string;
}