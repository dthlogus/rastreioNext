interface BotaoProps {
  className: any;
  texto: string;
  onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
  return (
    <div
      className={props.className}
      onClick={props.onClick ? props.onClick : undefined}
    >
      <p className="uppercase">{props.texto}</p>
    </div>
  );
}
