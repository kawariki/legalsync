import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timeline } from './Timeline';
import { KeyFacts } from './KeyFacts';
import { EvidenceList } from './EvidenceList';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import type { CasePackage as CasePackageType } from '@/db/schema';

export function CasePackageViewer({ casePackage }: { casePackage: CasePackageType }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Case Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#334155] leading-relaxed">{casePackage.summary}</p>
          <div className="mt-4 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide mb-1">Case Strength Assessment</p>
            <p className="text-sm text-[#334155]">{casePackage.caseStrengthNote}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="facts">Key Facts</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="prepare">Prepare</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Event Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline items={casePackage.timeline} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facts">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <KeyFacts facts={casePackage.keyFacts} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Evidence Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <EvidenceList items={casePackage.evidenceList} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prepare">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#0D9488]" />
                  Questions to Ask Your Lawyer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {casePackage.suggestedQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <span className="text-[#0D9488] font-bold mt-0.5">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {casePackage.redFlags.length > 0 && (
              <Card className="border-[#EF4444]/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-[#EF4444]">
                    <AlertTriangle className="w-5 h-5" />
                    Red Flags & Legal Risks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {casePackage.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                        <span className="text-[#EF4444] mt-0.5">⚠</span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
