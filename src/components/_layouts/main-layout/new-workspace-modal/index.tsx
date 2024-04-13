"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWorkspaceForm } from "@/components/_layouts/main-layout/new-workspace-modal/useWorkspaceForm";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";

export const NewWorkspaceModal = () => {

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const {
        form,
        handleSubmit,
        loading
    } = useWorkspaceForm(handleClose);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className={"font-normal rounded-lg"}>
                    New Area
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New workspace</DialogTitle>
                    <DialogDescription>
                        Create a new workspace here. Click Create when you fill out all the fields.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit}
                        className={"flex flex-col gap-y-6"}
                    >
                        <FormInput
                            name={"title"}
                            label={"Title"}
                            control={form.control}
                            placeholder={"Workspace title"}
                        />
                        <Button
                            size={"lg"}
                            className={"w-full"}
                            type={"submit"}
                            loading={loading}
                        >
                            Create workspace
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};