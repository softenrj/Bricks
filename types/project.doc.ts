export interface CodeLense {
  lan: string;
  per: number;
}
export interface DependencyInfo {
    name: string;
    version: string;
    description: string;
    npmUrl: string;
    homepage: string;
}

export interface ProjectDocMetadata {
    readme?: string;
    license?: string;
    contributing?: string;
    security?: string;
    changelog?: string;
    dockerfile?: string;
    "docker-compose"?: string;
    code_of_conduct?: string;
}