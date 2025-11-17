'use server';

import { automatedVerification, type AutomatedVerificationInput, type AutomatedVerificationOutput } from '@/ai/flows/automated-verification';
import { z } from 'zod';

const formSchema = z.object({
    projectDetails: z.string().min(10, 'Project details must be at least 10 characters.'),
    iotData: z.string().min(10, 'IoT data must be at least 10 characters.'),
    auditData: z.string().min(10, 'Audit data must be at least 10 characters.'),
    externalDataSources: z.string().min(10, 'External data sources must be at least 10 characters.'),
});

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    data?: AutomatedVerificationOutput;
}

export async function runVerification(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        const { fieldErrors } = validatedFields.error.flatten();
        return {
            message: 'Error: Invalid form data.',
            fields: {
                projectDetails: fieldErrors.projectDetails?.[0],
                iotData: fieldErrors.iotData?.[0],
                auditData: fieldErrors.auditData?.[0],
                externalDataSources: fieldErrors.externalDataSources?.[0],
            },
        };
    }
    
    try {
        const result = await automatedVerification(validatedFields.data as AutomatedVerificationInput);
        if (!result) {
            return { message: "Verification failed: AI model did not return a result." };
        }
        return { message: 'Verification complete.', data: result };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        console.error("Verification Error:", errorMessage);
        return { message: `Verification failed: ${errorMessage}` };
    }
}
