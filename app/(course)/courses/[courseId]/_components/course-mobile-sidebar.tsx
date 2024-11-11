import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import{
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"

import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps{
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

export const CourseMobileSidebar =({
    course,
    progressCount,
}:CourseMobileSidebarProps) => {
    return(

    <Sheet>
        <SheetTrigger className="md:hidden  pr-4 hover:opacity-65 transition">
            <Menu/>
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 bg-neutral-900 w-73">
            <CourseSidebar
                course={course}
                progressCount={progressCount}
            />
        </SheetContent>
    </Sheet>
      )
}