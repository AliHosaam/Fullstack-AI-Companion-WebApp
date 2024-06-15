import prisma from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage: React.FC<CompanionIdPageProps> = async ({ params }) => {
  // TODO: Check Subscription

  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const companion = await prisma.companion.findUnique({
    where: {
      userId: userId,
      id: params.companionId,
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div>
      <CompanionForm initialData={companion} categories={categories} />
    </div>
  );
};

export default CompanionIdPage;
