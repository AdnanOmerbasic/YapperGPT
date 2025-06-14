import { Card, CardContent, CardHeader } from '../../ui/card';

export const FeatureSection = () => {
  return (
    <section className="dark:bg-muted relative w-full bg-white px-4 py-28">
      <div className="container mx-auto pt-16">
        <div className="flex flex-1 flex-col items-center justify-center space-y-10 lg:flex-row lg:space-y-0 lg:space-x-32">
          <Card className="border-primary bg-muted/20 max-w-lg border-l-4 transition-all duration-300 ease-in-out hover:scale-105">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-semibold">
                Smooth and Smart Chat Experience
              </h3>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              <p className="text-lg">
                Engage with powerful AI in a simple, intuitive interface — no
                extra setup or complexity required.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary bg-muted/20 max-w-lg border-r-4 transition-all duration-300 ease-in-out hover:scale-105">
            <CardHeader className="text-center">
              <h3 className="text-foreground text-2xl font-semibold">
                Save Conversations Effortlessly
              </h3>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              <p className="text-lg">
                Access your previous chats anytime, stay organized, and keep
                your ideas flowing — all in one place.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
