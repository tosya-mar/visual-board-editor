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
    <main className="flex flex-col pt-15 items-center text-start gap-10">
      <button className="flex items-center gap-2 text-xl font-semibold cursor-pointer">
        <img src="/logo.png" alt="" className="size-8 rounded-md" />
        Board Editor
      </button>
      <Card className="w-full max-w-[400px] p-5 ">
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
