import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { formatDuration, formatPercentage, formatDate } from '@/lib/utils/format'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ExternalLink, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function HistoryPage() {
  const supabase = await createClient()

  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .order('started_at', { ascending: false })

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Test History</h2>
          <p className="text-muted-foreground">All your past practice and mock sessions</p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Subject / Subtopic</th>
                  <th className="px-6 py-4 font-bold">Mode</th>
                  <th className="px-6 py-4 font-bold">Score</th>
                  <th className="px-6 py-4 font-bold">Accuracy</th>
                  <th className="px-6 py-4 font-bold">Duration</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sessions && sessions.length > 0 ? sessions.map((session) => (
                  <tr key={session.id} className="bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatDate(session.started_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{session.subject || 'Mixed'}</div>
                      <div className="text-xs text-muted-foreground">{session.subtopic || 'Multiple Topics'}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={cn(
                         "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                         session.mode === 'mock' ? "bg-pink-100 text-pink-700" : "bg-sky-100 text-sky-700"
                       )}>
                         {session.mode}
                       </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {session.status === 'completed' ? `${session.score}/${session.total_questions}` : '---'}
                    </td>
                    <td className="px-6 py-4">
                      {session.accuracy ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${session.accuracy}%` }} />
                          </div>
                          <span className="font-medium">{formatPercentage(session.accuracy)}</span>
                        </div>
                      ) : '---'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {session.time_taken_seconds ? formatDuration(session.time_taken_seconds) : '---'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {session.status === 'completed' ? (
                        <Link href={`/results/${session.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/test/${session.id}`}>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Resume
                          </Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                      No test history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
