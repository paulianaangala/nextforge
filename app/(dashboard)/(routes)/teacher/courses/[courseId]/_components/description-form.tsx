"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver  } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";    

import{

    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,

}from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import React from "react";


interface DescriptionFormProps {

    initialData: Course;

    courseId: string;

}; 
 
const formSchema = z.object({

    description: z.string().min(1, {

    message: "Description is required",

    }),

});


export const DescriptionForm = ({

    initialData,
    courseId

}:DescriptionFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

        const form = useForm<z.infer<typeof formSchema>>({

            resolver: zodResolver(formSchema),
            defaultValues: {

                description: initialData?.description || ""

            },

        });


        const {isSubmitting, isValid} = form.formState;

        const onSubmit = async (values: z.infer<typeof formSchema>) => {

                try {

                    await axios.patch(`/api/courses/${courseId}`, values);
                    toast.success("Course Updated");
                    toggleEdit();
                    router.refresh();
                }catch {

                   toast.error("Something went wrong")     

                }

        }

    return(

        <div className="mt-6 border bg-purple-900 rounded-md p-4">
            
            <div className="font-semibold flex items-center justify-between">

                Course description

                <Button className='bg-neutral-900' onClick={toggleEdit} variant="ghost">
                        {isEditing && (
                            <>Cancel</>
                        )}
                        {!isEditing && (

                            <>
                          <Pencil className="h-4 w-4 mr-2"/>
                             Edit description
                            </>
                        )}
                </Button>

            </div>
                        
                {!isEditing && (

                    <p className={cn(

                        "text-sm mt-2", 
                        !initialData.description && "text-slate-500 italic"

                    )}>
                        {initialData.description || "No description"}
                    </p>


                )}
                {isEditing &&(
                        <Form {...form}>
                            <form
                               onSubmit={form.handleSubmit(onSubmit)} 
                               className="space-y-4 mt-4">
                               <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (

                                            <FormItem>

                                                <FormControl>

                                                    <Textarea 
                                                    
                                                        disabled={isSubmitting}
                                                        placeholder="e.g 'This course is about?'"
                                                        {...field}

                                                    />

                                                </FormControl>

                                                    <FormMessage/>

                                            </FormItem>

                                    )}
                                 />         

                                    <div className="flex items-center gap-x-2">
                                        
                                        <Button className='bg-neutral-900'
                                            disabled={!isValid || isSubmitting}
                                            type="submit"
                                        >

                                            Save

                                        </Button>

                                    </div>

                            </form>

                        </Form>

                )}
        </div>

)

}