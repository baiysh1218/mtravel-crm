import { CreateAppealFormData } from "@/entities/application/module";

export const prepareFormData = (data: CreateAppealFormData) => {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key as keyof CreateAppealFormData];

    if (key === "images") {
      data?.images?.forEach((file) => formData.append(key, file));

      continue;
    }

    if (key === "appeals_detail") {
      formData.append(key, JSON.stringify(value));

      continue;
    }

    formData.append(key, String(value));
  }

  return formData;
};
