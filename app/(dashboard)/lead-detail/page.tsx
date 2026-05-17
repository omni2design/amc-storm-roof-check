import { LeadPanel } from "@/components/product/contractor/LeadPanel";
import { Button } from "@/components/foundation/Button";
import { StatusBadge } from "@/components/foundation/StatusBadge";

export default function LeadDetailPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <LeadPanel
          title="Jordan M. — Roof Check"
          subtitle="Submitted via homeowner intake · Dallas, TX"
          status="high"
          statusLabel="High priority"
          actions={
            <>
              <Button intent="primary" size="md">
                Schedule inspection
              </Button>
              <Button intent="outline" size="md">
                Call homeowner
              </Button>
            </>
          }
          sections={[
            {
              id: "summary",
              title: "Lead summary",
              children: (
                <dl className="grid gap-3 text-sm-leading sm:grid-cols-2">
                  <div>
                    <dt className="text-foreground-muted">Issue</dt>
                    <dd className="font-medium text-foreground-primary">Active leak</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">Urgency</dt>
                    <dd>
                      <StatusBadge status="critical">Critical</StatusBadge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">Insurance</dt>
                    <dd className="font-medium text-foreground-primary">Planning to file</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">Photos</dt>
                    <dd className="font-medium text-foreground-primary">3 uploaded</dd>
                  </div>
                </dl>
              ),
            },
            {
              id: "pipeline",
              title: "Pipeline",
              children: (
                <p className="text-body text-foreground-secondary">
                  New lead → Contacted → Inspection scheduled → Estimate sent → Won/Lost
                </p>
              ),
            },
            {
              id: "sidebar",
              title: "Next actions",
              children: (
                <ul className="space-y-2 text-sm-leading text-foreground-secondary">
                  <li>Confirm inspection window</li>
                  <li>Review uploaded photos</li>
                  <li>Add internal note</li>
                </ul>
              ),
            },
          ]}
        />
      </div>
    </main>
  );
}
