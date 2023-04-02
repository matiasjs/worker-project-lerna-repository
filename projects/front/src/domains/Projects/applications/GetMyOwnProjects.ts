import { ProjectsGetManyOutput } from "shared-workers";
import { ProjectRepository } from "../domain/ProjectRepository";

export class GetMyOwnProjects {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async invoke(accessToken: string): Promise<ProjectsGetManyOutput[]> {
    if (!accessToken) {
      throw new Error("Missing access token");
    }

    const projects = await this.projectRepository.getMyOwnProjects(accessToken);

    return projects.map((project) => project.toPrimitives());
  }
}
