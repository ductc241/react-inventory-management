type Props = {
  number: number;
};

const FormatNumber = ({ number }: Props) => {
  return <span>{new Intl.NumberFormat("de-DE").format(number)}</span>;
};

export default FormatNumber;
