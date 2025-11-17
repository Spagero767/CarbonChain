// src/ai/flows/automated-verification.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for automated verification of carbon offset projects.
 *
 * - automatedVerification - A function that initiates the automated verification process.
 * - AutomatedVerificationInput - The input type for the automatedVerification function.
 * - AutomatedVerificationOutput - The return type for the automatedVerification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedVerificationInputSchema = z.object({
  iotData: z.string().describe('Data from IoT devices at the carbon offset project.'),
  auditData: z.string().describe('Data from on-site audits of the carbon offset project.'),
  externalDataSources: z.string().describe('Links to external data sources for comparison.'),
  projectDetails: z.string().describe('Details about the carbon offset project, including methodology.'),
});
export type AutomatedVerificationInput = z.infer<typeof AutomatedVerificationInputSchema>;

const AnomalySchema = z.object({
  description: z.string().describe('Description of the anomaly.'),
  severity: z.enum(['high', 'medium', 'low']).describe('Severity of the anomaly.'),
  dataPoints: z.array(z.string()).describe('Specific data points related to the anomaly.'),
});

const AutomatedVerificationOutputSchema = z.object({
  verificationResult: z.string().describe('Overall verification result (e.g., verified, potential fraud, requires further review).'),
  anomalies: z.array(AnomalySchema).describe('List of identified anomalies and their severity.'),
  fraudScore: z.number().describe('A score indicating the likelihood of fraudulent claims (0-1).'),
  recommendations: z.string().describe('Recommendations for further action or investigation.'),
});
export type AutomatedVerificationOutput = z.infer<typeof AutomatedVerificationOutputSchema>;

export async function automatedVerification(input: AutomatedVerificationInput): Promise<AutomatedVerificationOutput> {
  return automatedVerificationFlow(input);
}

const automatedVerificationPrompt = ai.definePrompt({
  name: 'automatedVerificationPrompt',
  input: {schema: AutomatedVerificationInputSchema},
  output: {schema: AutomatedVerificationOutputSchema},
  prompt: `You are an expert carbon credit auditor. Analyze the provided data from a carbon offset project to identify anomalies and potential fraud.

Here's the data:

Project Details: {{{projectDetails}}}
IoT Data: {{{iotData}}}
Audit Data: {{{auditData}}}
External Data Sources: {{{externalDataSources}}}

Identify any anomalies between the IoT data, audit data, and external data sources. Determine the severity of each anomaly (high, medium, low). Provide a fraud score (0-1) indicating the likelihood of fraudulent claims.

Output a verification result, a list of anomalies, a fraud score, and recommendations for further action.

Ensure the output is properly formatted according to the provided JSON schema.`, // Make sure to use triple curly braces for the data
});

const automatedVerificationFlow = ai.defineFlow(
  {
    name: 'automatedVerificationFlow',
    inputSchema: AutomatedVerificationInputSchema,
    outputSchema: AutomatedVerificationOutputSchema,
  },
  async input => {
    const {output} = await automatedVerificationPrompt(input);
    return output!;
  }
);
