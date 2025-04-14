import { getAllCategories, getSubCategoryWithSubSubCategories } from "@/lib/data-service";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";
import SubCategoryList from "@/components/SubcategoryList";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";

export const metadata = {
    title: "All Services - AllTasko"
}

export default async function page({ searchParams }) {
    const categories = await getAllCategories()
    const selectedCategory = searchParams?.selectedCategory1 || categories[0]?.category;
    const subcategories = await getSubCategoryWithSubSubCategories(selectedCategory);

    return (
        <div className="relative">
            <div className="lg:fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>
            <div className="flex h-screen bg-background text-foreground">
                {/* Fixed Sidebar */}
                <div className=" md:flex flex-col lg:w-86 border-r bg-background lg:fixed top-20 h-full">
                    <Separator className="bg-primary/20" />
                    <ScrollArea className="h-full">
                        <Sidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                        />
                    </ScrollArea>
                </div>

                {/* Main content with offset for fixed sidebar */}
                <div className="flex-1 flex flex-col md:ml-86 lg:mt-20">
                    <SearchBar />

                    <ScrollArea className="flex-1 p-6">
                        <SubCategoryList subcategories={subcategories} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}