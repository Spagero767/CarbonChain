import { VerificationForm } from './verification-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function VerificationPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Automated Verification</h1>
            <p className="text-muted-foreground">Audit IoT and on-site data to detect anomalies and fraudulent claims using AI.</p>
        </div>
        <VerificationForm />
    </div>
  );
}
