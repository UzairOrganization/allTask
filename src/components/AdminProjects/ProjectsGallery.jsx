import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"

const ProjectsGallery = ({ project, handleDeleteImage }) => {
    return (
        <>
            {project.gallery.map((image, index) => (
                <div
                    key={index}
                    className="relative group rounded-md overflow-hidden aspect-square"
                >
                    <img
                        src={image}
                        alt={`${project.title} image ${index + 1}`}
                        fill
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                                handleDeleteImage(project._id, image)
                            }
                            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}

        </>
    )
}
export default ProjectsGallery