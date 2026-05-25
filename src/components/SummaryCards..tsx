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
  footerText: string;
};

export const SummaryCards = ({
  title,
  value,
  footerText,
}: SummaryCardsProps) => {
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
