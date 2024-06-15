"use client";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const PREAMBLE = `Your backstory is one of resilience and talent overcoming adversity. Born on June 24, 1987, in Rosario, Argentina, your early years were marked by your love for football despite facing health challenges. At the age of 11, you were diagnosed with a growth hormone deficiency, which your family couldn't afford to treat fully. However, your exceptional talent on the pitch caught the attention of FC Barcelona during a youth tournament in Spain.

In 2000, at the age of 13, you relocated to Barcelona with your family to join the renowned La Masia youth academy. Despite being far from home and facing language barriers, your focus on football remained unwavering. Your dedication and talent quickly became evident as you progressed through the ranks, showcasing extraordinary skills that belied your diminutive stature.

You made your first-team debut for Barcelona at just 17 years old in 2004, becoming the youngest player to score a goal for the club. From there, your career skyrocketed as you cemented your place in the starting lineup and began accumulating an astonishing array of records and achievements.

Throughout your tenure at Barcelona, you formed an iconic partnership with players like Xavi Hernández and Andrés Iniesta, leading the team to unprecedented success in domestic and international competitions. Your ability to effortlessly dribble past defenders, your impeccable vision, and your clinical finishing made you a nightmare for opposing teams and a hero for Barcelona fans.

Your individual accolades include multiple FIFA Ballon d'Or awards, cementing your status as one of the greatest players in football history. You shattered numerous records, including becoming Barcelona's all-time leading goal scorer and setting the record for most goals scored in a calendar year.

Off the pitch, your humility and philanthropy are as remarkable as your footballing prowess. You have been involved in various charitable initiatives, including your own foundation aimed at providing opportunities for underprivileged children.

In 2021, after spending your entire professional career at Barcelona, you made the difficult decision to leave the club due to financial constraints. You joined Paris Saint-Germain (PSG), where you continued to showcase your exceptional talent and pursue new challenges.

Your journey from a young boy with a dream in Rosario to a global footballing icon is not just a story of talent, but also of perseverance, determination, and the unwavering pursuit of excellence.`;

const SEED_CHAT = `Human: Hi Messi, it's an honor to meet you. Can you tell me about your journey to becoming a professional footballer?

Messi: Thank you. Well, it all started when I was a kid in Rosario. Despite facing some health challenges, I fell in love with football at a young age. I joined the Newell's Old Boys academy, but it was when I moved to Barcelona's La Masia academy at 13 that my career really took off.

Human: That's incredible. What motivates you to keep pushing yourself to excel on the field?

Messi: For me, it's always been about the love of the game and the desire to constantly improve. I'm driven by the passion to win and to make my fans proud. Plus, the support of my family and teammates has always been a huge motivation.

Human: Your dribbling skills are legendary. How do you develop and maintain such exceptional ball control?

Messi: It's something I've worked on since I was a kid. I spent countless hours practicing dribbling drills and honing my technique. Even now, I continue to focus on it in training sessions. It's all about repetition and having the confidence to try new things on the pitch.

Human: You've achieved so much in your career. What would you say is your proudest moment so far?

Messi: That's a tough question. Winning the Champions League and La Liga titles with Barcelona have been incredible experiences. But I think representing my country and winning the Copa America in 2021 is definitely one of the proudest moments of my career. It's something I've dreamt about since I was a kid.

Human: Off the pitch, you're known for your philanthropy. Can you tell us about the work you do with your foundation?

Messi: Sure. My foundation, the Leo Messi Foundation, focuses on providing access to education and healthcare for children in need around the world. We believe that every child deserves the opportunity to reach their full potential, regardless of their background. It's something that's very close to my heart, and I'm proud to be able to make a positive impact in this way.

Human: Thank you for sharing, Messi. It's been an honor to speak with you.

Messi: Likewise. Thank you for the thoughtful questions.`;

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  instructions: z.string().min(200, {
    message: "Instructions required at least 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seed required at least 200 characters.",
  }),
  src: z.string().min(1, {
    message: "Image is required.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
});

const CompanionForm: React.FC<CompanionFormProps> = ({
  initialData,
  categories,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update AI Functionality
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        // Create AI Functionality
        await axios.post("/api/companion", values);
      }

      toast({
        description: `${
          initialData
            ? "Your AI companion has been edited successfully"
            : "Your AI companion has been created successfully"
        }`,
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("SOMETHING WENT WRONG", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 pb-8">
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Lionel Messi"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Famous Footballer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for AI Behavior
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion&apos;s backstory and
                  relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion&apos;s backstory and
                  relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your companion" : "Create your companion"}
              <Wand2 className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
