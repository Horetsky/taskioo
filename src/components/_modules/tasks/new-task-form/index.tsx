"use client";

import { Form } from "@/components/ui/form";
import { type ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AddNewItemButton } from "@/components/buttons";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useNewTaskForm } from "./useNewTaskForm";
import { FormSelect } from "@/components/form/form-select";
import { useTaskFromData } from "./useTaskFromData";

type Props = {
    triger?: ReactNode;
}

export const NewTaskModal = ({ triger }: Props) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const {
        form,
        loading,
        handleSubmit
    } = useNewTaskForm(handleClose);

    const {
        taskPriorityOptions,
        taskListOptions,
        teamMemberOptions,
    } = useTaskFromData();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {
                triger ?
                    <div onClick={handleOpen}>
                        { triger }
                    </div> :
                    <AddNewItemButton onClick={handleOpen}>
                        New Task
                    </AddNewItemButton>
            }
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New task</DialogTitle>
                    <DialogDescription>
                        Create a new task here. Click Create when you fill out all the fields.
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
                            placeholder={"Enter task title"}
                        />
                        <FormInput
                            name={"description"}
                            label={"Subtitle"}
                            control={form.control}
                            placeholder={"Enter project subtitle"}
                        />
                        <FormSelect
                            name={"priority"}
                            label={"Priority"}
                            placeholder={"Select task priority"}
                            options={taskPriorityOptions}
                        />
                        <FormSelect
                            name={"assignee_id"}
                            label={"Assignee"}
                            placeholder={"Select task assignee"}
                            options={teamMemberOptions}
                        />
                        <FormSelect
                            name={"list_id"}
                            label={"List"}
                            placeholder={"Select task list"}
                            options={taskListOptions}
                        />
                        <Button
                            size={"lg"}
                            className={"w-full"}
                            type={"submit"}
                            loading={loading}
                        >
                            Create Task
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};