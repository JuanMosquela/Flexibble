"use client";

import { FormState, ProjectInterface, SessionInterface } from "@/types";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import { useState } from "react";
import Button from "./Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProyectForm = ({ type, session, project }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }

      if (type === "edit") {
        console.log("edito");
        await updateProject(form, project?.id as string, token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldname: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldname]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose an image for your project"}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            alt="project image"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable projects"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://yourwebsite.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/yourwebsite"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          submitting={isSubmitting}
        />
      </div>
    </form>
  );
};
export default ProyectForm;
