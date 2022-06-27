interface BotaoProps {
  className: any;
  texto: string | number;
  onClick?: () => void;
  uppercase?: boolean;
}

export default function Botao(props: BotaoProps) {
  return (
    <div
      className={props.className}
      onClick={props.onClick ? props.onClick : undefined}
    >
      <p className={`${props.uppercase ? "uppercase" : ""} inline-flex`}>
        {props.texto}
      </p>
    </div>
  );
}
