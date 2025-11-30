"use client";
import React, { useState } from "react";
import { DeleteVenues } from "../../lib/api/venues";

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
};

export function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="button-primary"
    >
      Edit
    </button>
  );
}