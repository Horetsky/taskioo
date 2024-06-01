"use client";

import { Form } from "@/components/ui/form";
import { type ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { AddNewItemButton } from "@/components/buttons";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useNewProjectForm } from "./useNewProjectForm";

type Props = {
    triger?: ReactNode
}

export const NewProjectModal = ({ triger }: Props) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const {
        form,
        loading,
        handleSubmit
    } = useNewProjectForm(handleClose);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {
                triger ?
                    <div onClick={handleOpen} className={"w-fit h-fit"}>
                        { triger }
                    </div> :
                    <AddNewItemButton onClick={handleOpen}>
                        New Project
                    </AddNewItemButton>
            }
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New project</DialogTitle>
                    <DialogDescription>
                        Create a new project here. Click Create when you fill out all the fields.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-y-6"
                        onSubmit={handleSubmit}
                    >
                        <FormInput
                            name={"title"}
                            label={"Title"}
                            control={form.control}
                            placeholder={"Enter project title"}
                        />
                        <FormInput
                            name={"subtitle"}
                            label={"Subtitle"}
                            control={form.control}
                            placeholder={"Enter project subtitle"}
                        />
                        <Button
                            size={"lg"}
                            className={"w-full"}
                            type={"submit"}
                            loading={loading}
                        >
                            Create project
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};