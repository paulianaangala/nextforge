"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};


export const Actions = ({
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore(); //confetti store
    const[isLoading, setIsLoading] = useState(false); 

    //THIS IS THE FUNCTION FOR PUBLISH BUTTON

    const onClick = async () => {
        try{
            setIsLoading(true);
 
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            }else{
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen(); //2nd 
            }

            router.refresh(); // refreshing the page to see the updated status of the chapter
        }catch{
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }

    const onDelete = async () => { 
        try {
            setIsLoading(true);

            await  axios.delete(`/api/courses/${courseId}`);

            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`);
        }catch{
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }


    //THIS IS FOR PUBLISH BUTTON
    return(
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm">

                    {isPublished ? "Unpublished" : "Publish"}
                </Button>
                <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
                </ConfirmModal>
        </div>
    )
}