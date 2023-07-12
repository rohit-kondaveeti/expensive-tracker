import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const Form = () => {
  const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    age: z
      .number({ invalid_type_error: "Age field is required" })

      .min(18, { message: "Age must be greather or equal to 18" }),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-control">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="form-control"
            id="name"
            name="name"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-control">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            className="form-control"
            id="age"
            name="age"
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
