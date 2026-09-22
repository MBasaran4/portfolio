import * as React from "react";
import { getGitHubRepositories } from "@/lib/github";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Star, GitFork, ExternalLink, AlertCircle, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Dictionary } from "@/lib/i18n/types";

interface GitHubProjectsProps {
  dict?: Dictionary["github"];
}

export async function GitHubProjects({ dict }: GitHubProjectsProps) {
  const { status, repos, message, username } = await getGitHubRepositories();

  const sectionNum = dict?.sectionNum || "03";
  const sectionTitle = dict?.sectionTitle || "From GitHub";
  const sectionSubtitle =
    dict?.sectionSubtitle ||
    "Recent repositories and open source explorations directly from GitHub.";
  const viewProfileText = dict?.viewProfile || "View GitHub Profile ↗";
  const setupTitle = dict?.setupTitle || "GitHub Stream Ready";
  const setupMsg = dict?.setupMessage || message;
  const setupEnvHint = dict?.setupEnvHint || "// In .env.local";
  const unavailableText =
    dict?.unavailable || "GitHub projects are temporarily unavailable.";
  const exploreDirectlyText =
    dict?.exploreDirectly || "Explore directly on GitHub";
  const noReposText =
    dict?.noRepos || "No public repositories found for this account.";
  const noDescriptionText =
    dict?.noDescription || "No public description provided.";

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <SectionHeading
          number={sectionNum}
          title={sectionTitle}
          subtitle={sectionSubtitle}
          className="mb-0 md:mb-0"
        />

        {username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#06b6d4] hover:text-[#00f5d4] transition-colors py-2"
          >
            <GithubIcon className="w-4 h-4" />
            <span>{viewProfileText}</span>
          </a>
        )}
      </div>

      {/* State 1: Unconfigured (Clean, professional developer setup state - NO fake data) */}
      {status === "unconfigured" && (
        <div className="p-8 rounded-sm bg-[#131822]/70 border border-[rgba(6,182,212,0.15)] text-center max-w-xl mx-auto space-y-4">
          <div className="inline-flex p-3 rounded-full bg-[rgba(6,182,212,0.08)] text-[#06b6d4]">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#f8fafc]">{setupTitle}</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed font-mono">
            {setupMsg}
          </p>
          <div className="p-3 bg-[#090b10] rounded text-[11px] font-mono text-[#64748b] text-left border border-[rgba(255,255,255,0.05)]">
            <span className="text-[#06b6d4]">{setupEnvHint}</span>
            <br />
            GITHUB_USERNAME=your-username
          </div>
        </div>
      )}

      {/* State 2: Rate limited / API error */}
      {(status === "rate_limited" || status === "error") && (
        <div className="p-6 rounded-sm bg-[#131822] border border-[rgba(255,255,255,0.08)] text-center max-w-lg mx-auto space-y-3">
          <AlertCircle className="w-5 h-5 text-[#94a3b8] mx-auto opacity-70" />
          <p className="text-xs font-mono text-[#94a3b8]">{unavailableText}</p>
          {username && (
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06b6d4] hover:underline"
            >
              <span>{exploreDirectlyText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* State 3: Empty repositories */}
      {status === "empty" && (
        <div className="p-6 rounded-sm bg-[#131822] border border-[rgba(255,255,255,0.08)] text-center max-w-md mx-auto">
          <p className="text-xs font-mono text-[#94a3b8]">{noReposText}</p>
        </div>
      )}

      {/* State 4: Success - Render genuine repositories */}
      {status === "success" && repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-sm bg-[#131822]/80 border border-[rgba(6,182,212,0.12)] hover:border-[rgba(6,182,212,0.35)] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#06b6d4] font-semibold flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[180px]">{repo.name}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#00f5d4] transition-colors" />
                </div>

                <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed font-light">
                  {repo.description || noDescriptionText}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <Badge variant="neutral" className="text-[10px] px-1.5 py-0">
                      {repo.language}
                    </Badge>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-[#94a3b8]">
                      <Star className="w-3 h-3 text-[#06b6d4]" />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1 text-[#94a3b8]">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  )}
                </div>

                <span className="text-[10px]">
                  {formatDate(repo.updated_at)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
