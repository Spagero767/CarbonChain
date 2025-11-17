"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

const issueCreditFormSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  projectType: z.string({
    required_error: "Please select a project type.",
  }),
  methodology: z.string().min(10, {
    message: "Methodology must be at least 10 characters.",
  }).max(500, {
    message: "Methodology must not be longer than 500 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  vintageYear: z.coerce.number().min(2000).max(new Date().getFullYear()),
})

type IssueCreditFormValues = z.infer<typeof issueCreditFormSchema>

export default function IssueCreditPage() {
  const form = useForm<IssueCreditFormValues>({
    resolver: zodResolver(issueCreditFormSchema),
    defaultValues: {
      projectName: "",
      methodology: "",
      location: "",
      amount: 0,
      vintageYear: new Date().getFullYear(),
    },
  })

  function onSubmit(data: IssueCreditFormValues) {
    console.log(data);
    toast({
      title: "Credit Issuance Submitted",
      description: "The new carbon credit has been submitted for verification.",
    })
    form.reset();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Issue New Carbon Credit</h1>
        <p className="text-muted-foreground">Record a new carbon credit on the blockchain after successful verification.</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Amazon Rainforest Conservation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Forestry">Forestry</SelectItem>
                          <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                          <SelectItem value="Methane Capture">Methane Capture</SelectItem>
                          <SelectItem value="Peatland Restoration">Peatland Restoration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="methodology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantification Methodology</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the methodology used for quantification..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details on how the carbon sequestration or emissions reduction was measured and verified.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Brazil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carbon Amount (tCO₂e)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vintageYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vintage Year</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Issue Credit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
