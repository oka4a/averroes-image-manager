"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseFormSetValue,
} from "react-hook-form";

interface IFileUploadProps<TField extends FieldValues> {
  control: Control<TField>;
  name: Path<TField>;
  label?: React.ReactNode;
  setValue?: UseFormSetValue<TField>;
}

function ImageUploadField<TField extends FieldValues>({
  label,
  ...props
}: IFileUploadProps<TField>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(props);

  console.log(error);

  const [preview, setPreview] = useState<string | null>(value || null);

  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(`/uploads/${file.name}`); // Simulated server response
        }, 1000);
      });
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      uploadFileMutation.mutate(file, {
        onSuccess: (uploadedPath) => {
          onChange(uploadedPath);
        },
      });
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(undefined);
  };

  return (
    <Stack spacing={1}>
      <Typography>{label}</Typography>
      {preview ? (
        <Stack
          direction="row"
          alignSelf={"center"}
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: "999px" }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: "999px",
              border: "1px solid #ccc",
              opacity: uploadFileMutation.isPending ? 0.5 : 1,
            }}
          />
          <Button
            sx={{
              minWidth: "auto",
              borderRadius: "999px",
              padding: "0",
              width: "18px",
              height: "18px",
              fontSize: "10px",
              alignSelf: "flex-start",
            }}
            size="small"
            variant="outlined"
            color="error"
            onClick={handleRemove}
          >
            X
          </Button>
        </Stack>
      ) : (
        <Button
          variant="contained"
          component="label"
          color="info"
          sx={{
            width: 100,
            height: 100,
            alignSelf: "center",
            borderRadius: "999px",
            marginInline: "auto",
            textTransform: "initial",
          }}
          disabled={uploadFileMutation.isPending}
        >
          {uploadFileMutation.isPending ? "Uploading..." : "Upload"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      )}

      <Typography
        fontSize="12px"
        color="error"
        textAlign="center"
        minHeight="16px"
      >
        {error ? error.message : " "}
      </Typography>
    </Stack>
  );
}

export default ImageUploadField;
