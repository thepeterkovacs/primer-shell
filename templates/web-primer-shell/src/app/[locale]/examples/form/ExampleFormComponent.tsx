"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/lib/hooks/useToast"

import { Button } from "@/components/layout/Button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/layout/Form"
import { Input } from "@/components/layout/Input"

export const formSchema = z.object({
	field: z
		.string()
		.min(2, {
			message: "Field length must exceed 2.",
		})
		.max(5, {
			message: "Field length must not exceed 5.",
		}),
})

export type FormSchema = z.infer<typeof formSchema>

export default function ExampleFormComponent() {
	const { toast } = useToast()

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			field: "",
		},
	})

	function onSubmit(values: FormSchema) {
		console.log(values)

		toast({
			title: "Submitted values",
			description: JSON.stringify(values),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="field"
					render={({ field }) => (
						<FormItem className="pb-2">
							<FormLabel>Field name</FormLabel>
							<FormControl>
								<Input placeholder="Field placeholder..." {...field} />
							</FormControl>
							<FormDescription>Field description.</FormDescription>
							<FormMessage className="absolute" />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
