"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

type FormValues = {
    fullName: string;
    email: string;
    shortBio: string;
};

export type WritersFormModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const DEFAULT_AVATAR =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80";

const fieldClass =
    "flex w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20";

const AVATAR_INPUT_ID = "writers-avatar-upload";

export default function WritersFormModal({
    open,
    onOpenChange,
}: WritersFormModalProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const previewForUnmountRef = useRef<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            shortBio: "",
        },
    });

    useEffect(() => {
        previewForUnmountRef.current = previewUrl;
    }, [previewUrl]);

    useEffect(() => {
        return () => {
            const url = previewForUnmountRef.current;
            if (url) URL.revokeObjectURL(url);
        };
    }, []);

    const clearAvatar = () => {
        setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        setSelectedFile(null);
        setFileInputKey((k) => k + 1);
    };

    const handleOpenChange = (next: boolean) => {
        if (!next) {
            reset();
            clearAvatar();
        }
        onOpenChange(next);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file);
        });
        setSelectedFile(file);
    };

    const onSubmit = (data: FormValues) => {
        // Hook up to your API when ready (e.g. FormData with selectedFile)
        void data;
        void selectedFile;
        handleOpenChange(false);
        toast.success("Writer profile submitted", {
            description: "We'll review your details and follow up by email.",
        });
    };

    const onInvalid = () => {
        toast.error("Please fix the form errors", {
            description: "Check the highlighted fields and try again.",
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className="max-h-[min(90vh,720px)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-md"
                showCloseButton
            >
                <div className="px-6 pt-6 pb-2">
                    <DialogHeader className="gap-2 text-center sm:text-center">
                        <DialogTitle className="text-xl font-bold text-zinc-900 sm:text-2xl">
                            KP Writer Form
                        </DialogTitle>
                        <DialogDescription className="text-sm text-zinc-500">
                            Fill in your details to create a complete and engaging writer
                            profile.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    className="flex flex-col gap-5 px-6 pb-6"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-zinc-700">
                            Profile Image
                        </span>
                        <div className="relative">
                            <div
                                className={cn(
                                    "relative size-28 overflow-hidden rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-white sm:size-32"
                                )}
                            >
                                {previewUrl ? (
                                    <div
                                        className="size-full bg-cover bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url(${previewUrl})` }}
                                        role="img"
                                        aria-label="Profile preview"
                                    />
                                ) : (
                                    <Image
                                        src={DEFAULT_AVATAR}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        sizes="128px"
                                    />
                                )}
                            </div>
                            <Input
                                key={fileInputKey}
                                id={AVATAR_INPUT_ID}
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                aria-label="Upload profile image"
                                onChange={onFileChange}
                            />
                            <Label
                                htmlFor={AVATAR_INPUT_ID}
                                className="absolute -bottom-0.5 -right-0.5 flex size-9 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2"
                            >
                                <Camera className="size-4 pointer-events-none" aria-hidden />
                                <span className="sr-only">Choose profile photo</span>
                            </Label>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="writers-full-name"
                            className="text-sm font-medium text-zinc-800"
                        >
                            Full Name
                        </label>
                        <input
                            id="writers-full-name"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter name"
                            className={fieldClass}
                            aria-invalid={errors.fullName ? true : undefined}
                            {...register("fullName", {
                                required: "Full name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters",
                                },
                            })}
                        />
                        {errors.fullName && (
                            <p className="text-xs text-red-600" role="alert">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="writers-email"
                            className="text-sm font-medium text-zinc-800"
                        >
                            Email
                        </label>
                        <input
                            id="writers-email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter email"
                            className={fieldClass}
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

                    <div className="space-y-1.5">
                        <label
                            htmlFor="writers-bio"
                            className="text-sm font-medium text-zinc-800"
                        >
                            Short Bio
                        </label>
                        <Textarea
                            id="writers-bio"
                            rows={4}
                            placeholder="Enter your bio"
                            className={cn(fieldClass, "min-h-[100px] resize-y")}
                            aria-invalid={errors.shortBio ? true : undefined}
                            {...register("shortBio", {
                                required: "Short bio is required",
                                minLength: {
                                    value: 10,
                                    message: "Bio must be at least 10 characters",
                                },
                                maxLength: {
                                    value: 500,
                                    message: "Bio must be at most 500 characters",
                                },
                            })}
                        />
                        {errors.shortBio && (
                            <p className="text-xs text-red-600" role="alert">
                                {errors.shortBio.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-end gap-3 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-xl border-red-300 bg-zinc-50 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "rounded-xl border-0 px-6 font-semibold text-white shadow-sm",
                                "bg-linear-to-r from-blue-600 to-violet-600",
                                "hover:from-blue-500 hover:to-violet-500",
                                "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2"
                            )}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
