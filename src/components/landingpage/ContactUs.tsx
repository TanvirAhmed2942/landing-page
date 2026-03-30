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
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactUsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ContactUs({ open, onOpenChange }: ContactUsProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const handleDialogChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onSubmit = (data: FormValues) => {
    void data;
    reset();
    handleDialogChange(false);
    toast.success("Message sent", {
      description: "We'll get back to you as soon as we can.",
    });
  };

  const onInvalid = () => {
    toast.error("Please fix the form", {
      description: "Check your name, email, and message.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent
        className="max-h-[min(90vh,720px)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto sm:max-w-md"
        showCloseButton
      >
        <DialogHeader className="gap-2 pr-8 text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-600">
              <Mail className="size-4" aria-hidden />
            </span>
            <DialogTitle className="text-xl font-bold text-zinc-900">
              Contact us
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-zinc-500">
            Send a message to the KPnovel team. We read every submission.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="mt-4 flex flex-col gap-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 80,
                  message: "Name must be at most 80 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="How can we help?"
              rows={5}
              className="min-h-[120px] resize-y"
              aria-invalid={errors.message ? true : undefined}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Please write at least 10 characters",
                },
                maxLength: {
                  value: 2000,
                  message: "Message is too long (max 2000 characters)",
                },
              })}
            />
            {errors.message && (
              <p className="text-xs text-red-600" role="alert">
                {errors.message.message}
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
                "bg-linear-to-t from-violet-600 to-blue-600",
                "hover:from-violet-500 hover:to-blue-500",
                "focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2"
              )}
            >
              Send message
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
