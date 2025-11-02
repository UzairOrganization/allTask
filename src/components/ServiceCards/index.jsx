"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ServiceCard = ({ category }) => {
    const navigation = useRouter()
    return (
        <Card className="hover:shadow-lg transition-shadow relative h-full">
            <CardHeader>
                <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
                    <img
                        src={category.servicePicture || '/placeholder-service.jpg'}
                        alt={category.name}
                        className="object-cover w-full h-full"
                    />
                </div>
                <CardDescription className="pb-4">{category.description.slice(0, 200)}...</CardDescription>
            </CardContent>
            <CardFooter>

                <Button onClick={()=>navigation.push(`/service/${category.name}`)} className="w-[90%] cursor-pointer bg-[#008b6e] hover:bg-green-900 absolute bottom-4">
                    <Link href={`/service/${category.name}`}>
                        Book Now
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ServiceCard;