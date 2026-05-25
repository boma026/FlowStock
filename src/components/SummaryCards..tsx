import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type SummaryCardsProps = {
  title: string;
  value: number;
};

export const SummaryCards = ({ title, value }: SummaryCardsProps) => {
  return (
    <Card className="w-full lg:flex-1">
      <CardHeader>
        <CardTitle className="subtitle">{title}</CardTitle>
        <CardAction className="title">$</CardAction>
      </CardHeader>
      <CardContent>
        <p className="title">R${value}</p>
      </CardContent>
      <CardFooter>
        <p className="text">Valor total atual</p>
      </CardFooter>
    </Card>
  );
};
