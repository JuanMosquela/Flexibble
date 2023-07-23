"use client";

import { SessionInterface } from "@/types";
import Image from "next/image";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
};

let form = {
  image: "",
  title: "",
};

const ProyectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {};

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleStateChange = (fieldname: string, value: string) => {};

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form-image-label">
          {!form.image && "Choose a psoter for your project"}
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
        state={form.title}
        placeholder="Showcase and discover remarkable projects"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Website URL"
        state={form.title}
        placeholder="https://yourwebsite.com"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Github URL"
        state={form.title}
        placeholder="https://github.com/yourwebsite"
        setState={(value) => handleStateChange("title", value)}
      />
    </form>
  );
};
export default ProyectForm;
