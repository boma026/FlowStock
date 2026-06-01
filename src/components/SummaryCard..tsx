import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type SummaryCardProps = {
  title: string;
  value: number;
  footerText: string;
};

export const SummaryCard = ({ title, value, footerText }: SummaryCardProps) => {
  return (
    <Card className="w-full lg:flex-1">
      <CardHeader>
        <CardTitle className="subtitle">{title}</CardTitle>
        <CardAction className="title">$</CardAction>
      </CardHeader>
      <CardContent>
        <p className="title">R${value.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <p className="text">{footerText}</p>
      </CardFooter>
    </Card>
  );
};
