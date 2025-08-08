import { ContainerTextFlip } from "../compoments/ui/container-text-flip";
import { useEffect, useState } from "react";
import dogsApi from "@/api/dogs"; // Assume you have a dogs API for Waggle
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../compoments/ui/card";
import { Button } from "../compoments/ui/button";
import { Calendar, PawPrint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { testimonials } from "../lib/mockData"; // Should be dog owner reviews!
import { InfiniteMovingCards } from "../compoments/ui/infinite-moving-cards";

// Dog event/profile type for featured section
type DogProfile = {
  id: string;
  name: string;
  description?: string;
  photoURL?: string;
  birthDate?: string;
  breed?: string;
  gender?: "male" | "female";
  // Add other relevant dog fields!
};

const formatDate = (date: string) => {
  const d = new Date(date);
  // Example date format: "Jan 4, 2024"
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

export default function Home() {
  const [dogs, setDogs] = useState<DogProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await dogsApi.getFeaturedDogs();
        setDogs(response.data.dogs || []);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    fetchDogs();
  }, []);

  const featuredDogs = dogs.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                Find the perfect match for your dog with{" "}
                <ContainerTextFlip
                  words={["Verified Owners", "Safe Matches", "Happy Pups"]}
                  className="text-3xl md:text-4xl lg:text-5xl"
                  icon={<PawPrint className="inline-block h-7 w-7 text-accent" />}
                />
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl">
                Waggle is your trusted community for responsible dog mating, lovely litters, and new furry friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Dogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDogs.map((dog) => (
              <Card key={dog.id}>
                <CardHeader>
                  <CardTitle>{dog.name}</CardTitle>
                  <CardDescription>
                    {dog.breed ? `${dog.breed}, ` : ""}
                    {dog.gender ? (dog.gender === "male" ? "♂" : "♀") : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {dog.photoURL && (
                    <img
                      src={dog.photoURL}
                      alt={dog.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}
                  <div className="pt-2 text-sm">
                    {dog.birthDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Born: {formatDate(dog.birthDate)}</span>
                      </div>
                    )}
                    {dog.description && (
                      <p className="mt-2 text-muted-foreground">{dog.description}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-2 cursor-pointer"
                    onClick={() => navigate(`/dogs/${dog.id}`)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Happy Matches</h2>
          <p className="text-muted-foreground mb-8">
            See what happy owners are barking about!
          </p>
          <InfiniteMovingCards
            items={testimonials.map(t => ({
              ...t,
              title: t.title ?? "Dog Owner"
            }))}
            speed="slow"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Ready to connect your pup?
          </h2>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/auth/login")}
              className="cursor-pointer"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/auth/signup")}
              className="cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}