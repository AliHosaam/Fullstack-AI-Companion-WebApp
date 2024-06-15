import Categories from "@/components/categories";
import Companions from "@/components/companions";
import SearchInput from "@/components/search-input";
import prisma from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage: React.FC<RootPageProps> = async ({ searchParams }) => {
  const data = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: searchParams.name,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
  const categories = await prisma.category.findMany();

  return (
    <div className="h-screen p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
