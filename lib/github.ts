import { GitHubRepo } from "@/types";

export interface GitHubFetchResult {
  status: "success" | "unconfigured" | "rate_limited" | "error" | "empty";
  repos: GitHubRepo[];
  message?: string;
  username?: string;
}

interface GitHubApiRepoItem {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  archived?: boolean;
  private?: boolean;
  disabled?: boolean;
}

export async function getGitHubRepositories(): Promise<GitHubFetchResult> {
  const username = process.env.GITHUB_USERNAME?.trim();

  // If GITHUB_USERNAME is not configured, do not call API or display fake data
  if (!username) {
    return {
      status: "unconfigured",
      repos: [],
      message: "GitHub repository stream ready. Configure GITHUB_USERNAME to stream live repos.",
    };
  }

  const token = process.env.GITHUB_TOKEN?.trim();
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "MBasaran-Portfolio-NextJS",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`,
      {
        headers,
        next: { revalidate: 3600 }, // Cached for 1 hour
      }
    );

    if (response.status === 403 || response.status === 429) {
      return {
        status: "rate_limited",
        repos: [],
        username,
        message: "GitHub API rate limit reached. Repositories will reload shortly.",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        repos: [],
        username,
        message: `GitHub service unavailable (${response.status}).`,
      };
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return {
        status: "error",
        repos: [],
        username,
        message: "Unexpected data format received from GitHub API.",
      };
    }

    // Filter to ensure only public, non-archived, and active repositories are displayed
    // Criteria: repository.private === false AND repository.archived === false AND repository.disabled !== true
    const activePublicRepos = (data as GitHubApiRepoItem[]).filter(
      (repo) => repo.private === false && repo.archived === false && repo.disabled !== true
    );

    if (activePublicRepos.length === 0) {
      return {
        status: "empty",
        repos: [],
        username,
        message: "No public repositories found for this account.",
      };
    }

    // Map and sanitize repos with typed items (limit to top 6 active public repositories)
    const repos: GitHubRepo[] = activePublicRepos.slice(0, 6).map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      language: repo.language || "Plain Text",
      updated_at: repo.updated_at,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
    }));

    return {
      status: "success",
      repos,
      username,
    };
  } catch {
    return {
      status: "error",
      repos: [],
      username,
      message: "Unable to connect to GitHub API at this time.",
    };
  }
}
