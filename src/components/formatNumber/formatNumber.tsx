type Props = {
  number: number;
};

const FormatNumber = ({ number }: Props) => {
  return (
    <span>{new Intl.NumberFormat("de-DE").format(Number(number))} VND</span>
  );
};

export default FormatNumber;
