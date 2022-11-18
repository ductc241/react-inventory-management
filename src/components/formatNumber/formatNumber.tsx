type Props = {
  number: number;
};

const FormatNumber = ({ number }: Props) => {
  return <span>{new Intl.NumberFormat("de-DE").format(number)} VND</span>;
};

export default FormatNumber;
