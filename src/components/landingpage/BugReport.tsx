"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Bug } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  title: string;
  description: string;
};

export type BugReportProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function BugReport({ open, onOpenChange }: BugReportProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "" },
  });

  const handleDialogChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onSubmit = (data: FormValues) => {
    void data;
    reset();
    handleDialogChange(false);
    toast.success("Bug report saved", {
      description: "Thanks for helping us improve KPnovel.",
    });
  };

  const onInvalid = () => {
    toast.error("Please fix the form", {
      description: "Add a title and describe the issue.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent
        className="max-h-[min(90vh,640px)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto sm:max-w-md"
        showCloseButton
      >
        <DialogHeader className="gap-2 pr-8 text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
              <Bug className="size-4" aria-hidden />
            </span>
            <DialogTitle className="text-xl font-bold text-zinc-900">
              Report a bug
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-zinc-500">
            Tell us what went wrong. Include steps to reproduce if you can.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="mt-4 flex flex-col gap-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="bug-title">Title</Label>
            <Input
              id="bug-title"
              placeholder="Short summary of the issue"
              aria-invalid={errors.title ? true : undefined}
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 120,
                  message: "Title must be at most 120 characters",
                },
              })}
            />
            {errors.title && (
              <p className="text-xs text-red-600" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bug-description">Description</Label>
            <Textarea
              id="bug-description"
              placeholder="What happened? What did you expect?"
              rows={5}
              className="min-h-[120px] resize-y"
              aria-invalid={errors.description ? true : undefined}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Please add at least 10 characters",
                },
                maxLength: {
                  value: 2000,
                  message: "Description is too long (max 2000 characters)",
                },
              })}
            />
            {errors.description && (
              <p className="text-xs text-red-600" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "border-0 font-semibold text-white shadow-sm",
                "bg-linear-to-r from-red-600 to-orange-600",
                "hover:from-red-500 hover:to-orange-500",
                "focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-2"
              )}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
