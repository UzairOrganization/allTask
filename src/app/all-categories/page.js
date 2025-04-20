import { getAllCategories, getSubCategoryWithSubSubCategories } from "@/lib/data-service";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";
import SubCategoryList from "@/components/SubcategoryList";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaRocket } from "react-icons/fa";
export const metadata = {
    title: "All Services - AllTasko"
}

export default async function page({ searchParams }) {
    const categories = await getAllCategories();
    // If no categories available
    if (!categories || categories.length === 0) {
        return (
            <div className="relative">
                <div className="lg:fixed top-0 left-0 right-0 z-50">
                    <Header />
                </div>
                <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-6">
                    <div className="max-w-md w-full space-y-4">
                        <Alert className="border-primary/50">
                            <FaRocket className="h-5 w-5 text-primary" />
                            <AlertTitle className="text-lg font-semibold">No Services Available</AlertTitle>
                            <AlertDescription className="mt-2 text-muted-foreground">
                                We currently don't have any services listed. Please check back later or contact support for more information.
                            </AlertDescription>
                        </Alert>

                        <div className=" p-6 rounded-lg border border-primary/20 text-center">
                            <h3 className="text-lg font-medium mb-2">Stay Updated</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Subscribe to our newsletter to get notified when new services become available.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm"
                                />
                                <button className="px-4 bg-[#007D63] py-2  text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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