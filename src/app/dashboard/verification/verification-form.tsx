'use client';

import { useFormState, useFormStatus } from "react-dom";
import { runVerification, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertTriangle, ShieldCheck, ChevronsRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialState: FormState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
        </>
      ) : (
        <>
        <ChevronsRight className="mr-2 h-4 w-4" />
        Run Verification
        </>
      )}
    </Button>
  );
}

const exampleData = {
    projectDetails: `Project Name: Amazon Rainforest Conservation
Methodology: Avoided Unplanned Deforestation (AUD)
Location: Pará, Brazil
Description: This project protects a large area of pristine rainforest from illegal logging and agricultural expansion.`,
    iotData: `Timestamp,SensorID,Value,Unit
2023-10-01T12:00:00Z,Tree-001,30.5,CanopyDensity
2023-10-01T12:05:00Z,Tree-002,31.2,CanopyDensity
...`,
    auditData: `Audit Date: 2023-09-15
Auditor: EcoCert
Findings: On-site inspection confirms forest boundary integrity. Minor discrepancies in satellite imagery vs. ground truth noted in Sector-B.`,
    externalDataSources: `Global Forest Watch: https://www.globalforestwatch.org/
NASA Fire Information for Resource Management System (FIRMS): https://firms.modaps.eosdis.nasa.gov/`
}

export function VerificationForm() {
  const [state, formAction] = useFormState(runVerification, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message.startsWith('Error:') || state.message.startsWith('Verification failed:')) {
      toast({
        variant: "destructive",
        title: "Verification Error",
        description: state.message,
      })
    } else if (state.message === 'Verification complete.') {
      toast({
        title: "Verification Complete",
        description: "AI analysis finished successfully.",
      })
      formRef.current?.reset();
    }
  }, [state, toast]);

  const getSeverityBadge = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-400/80 text-yellow-900 border-yellow-500 hover:bg-yellow-400/90">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getFraudScoreColor = (score: number) => {
    if (score > 0.7) return 'bg-red-500';
    if (score > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Verification Data Input</CardTitle>
          <CardDescription>Provide all relevant data for a comprehensive audit.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="projectDetails">Project Details</Label>
              <Textarea id="projectDetails" name="projectDetails" placeholder={exampleData.projectDetails} rows={4} required className="mt-1" />
              {state.fields?.projectDetails && <p className="text-destructive text-sm mt-1">{state.fields.projectDetails}</p>}
            </div>
            <div>
              <Label htmlFor="iotData">IoT Data</Label>
              <Textarea id="iotData" name="iotData" placeholder={exampleData.iotData} rows={4} required className="mt-1 font-code" />
              {state.fields?.iotData && <p className="text-destructive text-sm mt-1">{state.fields.iotData}</p>}
            </div>
            <div>
              <Label htmlFor="auditData">On-site Audit Data</Label>
              <Textarea id="auditData" name="auditData" placeholder={exampleData.auditData} rows={4} required className="mt-1" />
              {state.fields?.auditData && <p className="text-destructive text-sm mt-1">{state.fields.auditData}</p>}
            </div>
            <div>
              <Label htmlFor="externalDataSources">External Data Sources</Label>
              <Textarea id="externalDataSources" name="externalDataSources" placeholder={exampleData.externalDataSources} rows={4} required className="mt-1" />
              {state.fields?.externalDataSources && <p className="text-destructive text-sm mt-1">{state.fields.externalDataSources}</p>}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Verification Results</CardTitle>
            <CardDescription>AI-powered analysis of the provided data.</CardDescription>
          </CardHeader>
          <CardContent>
            {!state.data ? (
              <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                <ShieldCheck className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Awaiting Verification</h3>
                <p className="mt-1 text-sm text-muted-foreground">Submit data to see the AI analysis results here.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <Alert variant={state.data.fraudScore > 0.5 ? 'destructive' : 'default'} className={cn(state.data.fraudScore <= 0.5 && "bg-primary/10 border-primary/50 text-primary")}>
                  <AlertTriangle className={cn(state.data.fraudScore <= 0.5 && "text-primary")} />
                  <AlertTitle>Overall Result: {state.data.verificationResult}</AlertTitle>
                  <AlertDescription>{state.data.recommendations}</AlertDescription>
                </Alert>
                
                <div>
                  <Label>Fraud Likelihood Score</Label>
                  <div className="flex items-center gap-4 mt-1">
                    <Progress value={state.data.fraudScore * 100} indicatorClassName={getFraudScoreColor(state.data.fraudScore)} />
                    <span className="font-bold text-lg">{(state.data.fraudScore * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Identified Anomalies</h4>
                  {state.data.anomalies.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                    {state.data.anomalies.map((anomaly, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-4">
                            {getSeverityBadge(anomaly.severity)}
                            <span>{anomaly.description}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="font-semibold mb-2">Relevant Data Points:</p>
                          <ul className="list-disc pl-5 space-y-1 font-code text-sm">
                            {anomaly.dataPoints.map((point, i) => <li key={i}><code>{point}</code></li>)}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    </Accordion>
                  ) : (
                    <p className="text-sm text-muted-foreground">No anomalies were identified.</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
