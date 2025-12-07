"use client";
import { useState } from "react";
import { DeleteVenues } from "../../lib/api/venues";

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
}

interface EditButtonProps {
  onClick?: () => void;
}

export function DeleteButton({
  venueId,
  onDeleted,
}: {
  venueId: string;
  onDeleted?: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!venueId) return;

    setIsDeleting(true);

    try {
      await DeleteVenues(venueId);
      if (onDeleted) setTimeout(onDeleted, 1000);
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  };

  return (
    <div className="">
      <button
        className="button-primary"
        onClick={handleDelete}
        disabled={!venueId || isDeleting}
      >
        <p>{isDeleting ? "Deleting..." : "Delete"}</p>
      </button>
    </div>
  );
}

export function EditButton({ onClick }: EditButtonProps) {
  return (
    <button onClick={onClick} className="button-primary">
     <p>Edit</p> 
    </button>
  );
}

interface DefaultButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  onClick?: () => void;
}

export function DefaultButton({
  type = "button",
  text = "",
  onClick,
}: DefaultButtonProps) {
  return (
    <button className="button-primary" type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export function CloseButton({ onClick, className = "" }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-white hover:text-[#DE0236] text-4xl cursor-pointer ${className}`}
      aria-label="Close"
    >
      ×
    </button>
  );
}
