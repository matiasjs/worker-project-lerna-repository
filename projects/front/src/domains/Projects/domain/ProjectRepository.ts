import { Project } from "./Project";

export abstract class ProjectRepository {
  abstract getMyOwnProjects(accessToken: string): Promise<Project[]>;
}
