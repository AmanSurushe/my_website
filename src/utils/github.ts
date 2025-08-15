export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
  private: boolean;
}

export interface GitHubApiResponse {
  repositories: GitHubRepository[];
  error?: string;
}

export async function fetchGitHubRepositories(
  username: string,
  options: {
    includeForks?: boolean;
    includePrivate?: boolean;
    sortBy?: 'updated' | 'created' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    perPage?: number;
  } = {}
): Promise<GitHubApiResponse> {
  const {
    includeForks = false,
    includePrivate = false,
    sortBy = 'updated',
    direction = 'desc',
    perPage = 30
  } = options;

  try {
    const url = new URL(`https://api.github.com/users/${username}/repos`);
    url.searchParams.set('sort', sortBy);
    url.searchParams.set('direction', direction);
    url.searchParams.set('per_page', perPage.toString());
    url.searchParams.set('type', includePrivate ? 'all' : 'public');

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repositories: GitHubRepository[] = await response.json();

    // Filter repositories based on preferences
    const filteredRepos = repositories.filter(repo => {
      if (!includeForks && repo.fork) return false;
      if (!includePrivate && repo.private) return false;
      return true;
    });

    return {
      repositories: filteredRepos
    };
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return {
      repositories: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export function getRepositoryLanguageColor(language: string | null): string {
  const colors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#239120',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#fa7343',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#1572B6',
    SCSS: '#c6538c',
    Vue: '#4FC08D',
    React: '#61DAFB',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    Jupyter: '#DA5B0B',
  };

  return colors[language || ''] || '#858585';
}