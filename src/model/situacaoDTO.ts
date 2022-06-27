export interface SituacaoDTO {
  id?: any;
  postado: boolean;
  transferencia?: boolean | null;
  tratamento?: boolean | null;
  rotaEntrega?: boolean | null;
  entregue?: boolean | null;
  dataPostado: any;
  dataTransferencia?: any;
  dataTratamento?: any;
  dataRotaEntrega?: any;
  dataEntregue?: any;
  pacote?: any;
}
