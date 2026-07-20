import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/kit/card";

export default function AuthLayout({
  title,
  description,
  form,
  footer,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  form: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="flex flex-col pt-[200px] items-center text-start">
      <Card className="w-full max-w-[400px] p-5">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>{form}</CardContent>
        <CardFooter className="bg-accent-foreground">
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            {footer}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
